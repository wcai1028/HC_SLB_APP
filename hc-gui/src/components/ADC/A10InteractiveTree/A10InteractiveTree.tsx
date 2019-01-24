import * as React from 'react'
import * as d3 from 'd3'
import { A10Component } from 'a10-gui-framework'

export interface IDatum {
  label: string
  showChildrenAsStraightLine?: boolean
  iconSymbol?: 'triangle' | 'circle'
  children?: IDatum[]
  _children?: IDatum[]
}

export interface IHierarchyPointNode<Datum>
  extends d3.HierarchyPointNode<Datum> {
  x0?: number
  y0?: number
  _children?: Array<d3.HierarchyPointNode<Datum>>
  isPassNormalize?: boolean
}

export interface IMargin {
  top: number
  right: number
  bottom: number
  left: number
}

export interface IA10InteractiveTreeProps {
  data: IDatum
  width: number
  height: number
}

export interface IA10InteractiveTreeState {
  margin: IMargin
  drawableHeight: number
  drawableWidth: number
  duration: number

  canvas?: d3.Selection<SVGGElement, IObject, null, undefined>
  treeData?: IDatum
  treeLayout?: d3.TreeLayout<IDatum> | d3.HierarchyPointNode<IDatum>
  source?: IHierarchyPointNode<IDatum>
}

class A10InteractiveTree extends A10Component<
  IA10InteractiveTreeProps,
  IA10InteractiveTreeState
> {
  svg = React.createRef<SVGSVGElement>()

  constructor(props: any) {
    super(props)
    this.state = {
      margin: {
        top: 20,
        right: 20,
        bottom: 20,
        left: 20,
      },
      drawableHeight: 0,
      drawableWidth: 0,
      duration: 750,
    }
  }

  componentDidMount() {
    this._init()
  }

  componentDidUpdate() {
    this._paint()
  }

  _init() {
    const { height, width, data } = this.props
    const { margin } = this.state
    const drawableHeight = height - margin.top - margin.bottom
    const drawableWidth = width - margin.left - margin.right
    const treeLayout = d3.tree<IDatum>().size([drawableWidth, drawableHeight])

    const treeData = { ...data }

    const root = treeLayout(d3.hierarchy<IDatum>(treeData))
    const nodes = root.descendants() as Array<IHierarchyPointNode<IDatum>>
    nodes[0].x0 = width / 2
    nodes[0].y0 = 0
    const source = root

    const canvas = d3
      .select<SVGSVGElement, IDatum>(this.svg.current as SVGSVGElement)
      .attr('width', width + margin.right + margin.left)
      .attr('height', height + margin.top + margin.bottom)
      .append<SVGGElement>('g')
      .attr('id', 'canvas')
      .attr('transform', `translate(0, ${margin.top})`)

    this.setState({
      ...this.state,
      ...{
        drawableHeight,
        drawableWidth,
        canvas,
        treeData,
        treeLayout,
        source,
      },
    })
  }

  _paint() {
    const { canvas, treeLayout, treeData } = this.state
    // Compute the new tree layout.
    const root = (treeLayout as any)(d3.hierarchy<IDatum>(treeData as IDatum))
    const links = root.links()
    const nodes = root.descendants() as Array<IHierarchyPointNode<IDatum>>

    // Normalize for fixed-depth.
    nodes.forEach((d: IHierarchyPointNode<IDatum>) => {
      if (d.data.showChildrenAsStraightLine && d.children) {
        d.children.forEach((child: IHierarchyPointNode<IDatum>, index) => {
          child.x = d.x
          child.y = (child.depth + index) * 100
          child.isPassNormalize = true
        })
      }

      if (!d.isPassNormalize) {
        d.y = d.depth * 100
      }
    })

    const node = canvas.selectAll<SVGGElement, IDatum>('g.node').data(nodes)
    const link = canvas
      .selectAll<SVGPathElement, IDatum>('path.link')
      .data(links)

    this._paintNode(node)
    this._paintLink(link as any)

    // Store the old positions for transition.
    nodes.forEach(pointNode => {
      pointNode.x0 = pointNode.x
      pointNode.y0 = pointNode.y
    })
  }

  _paintNode(
    node: d3.Selection<
      SVGGElement,
      IHierarchyPointNode<IDatum>,
      SVGGElement,
      IObject
    >,
  ) {
    const { source, duration } = this.state
    const onNodeClick = this._onNodeClick.bind(this)
    const nodeEnter = node
      .enter()
      .append<SVGGElement>('g')
      .attr('class', 'node')
      .attr('transform', () => `translate(${source.x0}, ${source.y0})`)
      .attr('cursor', 'pointer')
      .on('click', onNodeClick)

    this._paintNodeEnterSection(nodeEnter)

    const nodeUpdate = nodeEnter.merge(node)

    this._paintNodeUpdateSection(nodeUpdate)

    const nodeExit = node
      .exit()
      .transition()
      .duration(duration)
      .attr('transform', () => `translate(${source.x}, ${source.y})`)
      .remove()

    nodeExit.select('circle.circle').attr('r', 0)
    nodeExit.select('text.label').style('fill-opacity', 0)
  }

  _paintNodeEnterSection(
    nodeEnter: d3.Selection<
      SVGGElement,
      IHierarchyPointNode<IDatum>,
      SVGGElement,
      IObject
    >,
  ) {
    const iconEnter = nodeEnter.append<SVGGElement>('g').attr('class', 'icon')

    iconEnter
      .append<SVGCircleElement>('circle')
      .attr('class', 'node')
      .attr('r', 0)
      .style('fill', '#f8f7f7')
      .style('fill-opacity', 0)

    iconEnter
      .append<SVGPathElement>('path')
      .attr('class', 'triangle')
      .attr(
        'transform',
        datum => (datum.children ? 'rotate(180)' : 'rotate(90)'),
      )
      .attr('d', dd => {
        let symbol
        switch (dd.data.iconSymbol) {
          case 'circle':
            symbol = d3.symbolCircle
            break
          default:
            symbol = d3.symbolTriangle
            break
        }
        return d3.symbol().type(symbol)()
      })
      .style('fill', datum => (datum.children ? '#4a90e2' : '#d8d8d8'))
      .style('fill-opacity', 0)

    nodeEnter
      .append<SVGTextElement>('text')
      .attr('x', 13)
      .attr('class', 'label')
      .text((d: any) => d.data.label)
      .style('fill-opacity', 0)
  }

  _paintNodeUpdateSection(
    nodeUpdate: d3.Selection<
      SVGGElement,
      IHierarchyPointNode<IDatum>,
      SVGGElement,
      IObject
    >,
  ) {
    const { source, duration } = this.state
    // Transition to the proper position for the nodes
    nodeUpdate
      .transition()
      .duration(duration)
      .attr('transform', datum => {
        if (source.data.label === datum.data.label) {
          source.x = datum.x
          source.y = datum.y
        }
        return `translate(${datum.x}, ${datum.y})`
      })

    nodeUpdate
      .select('circle.node')
      .attr('r', 10)
      .style('fill-opacity', 1)

    nodeUpdate
      .select('path.triangle')
      .transition()
      .duration(duration)
      .attr(
        'transform',
        datum => (datum.children ? 'rotate(180)' : 'rotate(90)'),
      )
      .style('fill', datum => (datum.children ? '#4a90e2' : '#d8d8d8'))
      .style('fill-opacity', 1)

    nodeUpdate
      .select('text.label')
      .attr('r', 10)
      .style('fill-opacity', 1)
  }

  _paintLink(
    link: d3.Selection<
      SVGPathElement,
      d3.HierarchyPointLink<IDatum>,
      SVGGElement,
      IObject
    >,
  ) {
    const { source, duration } = this.state
    const linkEnter = link
      .enter()
      .insert<SVGPathElement>('path', 'g')
      .attr('class', 'link')
      .attr('d', () => {
        const o: any = { x: source.x0, y: source.y0 }
        return this._diagonal()({ source: o, target: o })
      })
      .style('fill', 'none')
      .style('stroke', '#d8d8d8')
      .style('stroke-width', '2px')

    // Transition back to the parent element position
    linkEnter
      .merge(link)
      .transition()
      .duration(duration)
      .attr('d', (d: any) => {
        return this._diagonal()({ source: d.source, target: d.target })
      })

    // Transition exiting nodes to the parent's new position.
    link
      .exit()
      .transition()
      .duration(duration)
      .attr('d', () => {
        const o: any = { x: source.x, y: source.y }
        return this._diagonal()({ source: o, target: o })
      })
      .remove()
  }

  _onNodeClick(source: IHierarchyPointNode<IDatum>) {
    if (source.data.children) {
      source.data._children = source.data.children
      source.data.children = null
    } else {
      source.data.children = source.data._children
      source.data._children = null
    }

    this.setState({ ...this.state, ...{ source } })
  }

  _diagonal() {
    return d3
      .linkVertical()
      .x((d: any) => d.x)
      .y((d: any) => d.y)
  }

  render() {
    return <svg ref={this.svg} />
  }
}

export default A10InteractiveTree
