import * as React from 'react'
import { A10Component } from 'a10-gui-framework'
import * as Highcharts from 'highcharts'

import './styles/taskprocesschart.scss'

export interface ITaskInfo {
  name: string
  startTime: number
  endTime: number
  status: string
  retryCount: number
}

export interface IStatusInfo {
  stroke?: string
  color: string
  stripe?: string
}

export interface IChartPadding {
  'padding-top': number
  'padding-right': number
  'padding-bottom': number
  'padding-left': number
}

export interface IChartInfor {
  X: number
  Y: number
  width: number
  height: number
  labelSpan: number
  endSpan: number
  lineHeight: number
  timeAxis: ITimeAxisInfor
  taskItems: ITaskProcessInfo[]
}

export interface ITimeAxisInfor {
  scales: string[]
  axisStart: number
  axisEnd: number
}

export interface ITaskProcessInfo {
  axisStart: number
  axisEnd: number
  label: string
  taskStart: number
  taskEnd: number
  status: string
  stroke: string
  color: string
  stripe: string
  count: number
}

export interface IItemRect {
  X: number
  Y: number
  width: number
  height: number
  labelSpan?: number
  endSpan?: number
}

export interface ITasksProcessChartProps {
  taskList: ITaskInfo[]
  statusList?: { [key: string]: IStatusInfo }
  labelSpan?: number
  endSpan?: number
  lineHeight?: number
  padding?: IChartPadding
}

export interface ITasksProcessChartState {
  width: number
  chartRenderer: any
  elementGroup: any
  tooltipGroup: any
}

class TasksProcessChart extends A10Component<
  ITasksProcessChartProps,
  ITasksProcessChartState
> {
  static defaultProps = {
    statusList: {
      Completed: {
        color: '#7ed321',
      },
      'In Progress': {
        stroke: '#bbbbbb',
        color: '#dedede',
        stripe: '#acacac',
      },
      Scheduled: {
        color: '#afd7ff',
      },
      Failed: {
        color: '#ff2e48',
      },
      Cancelled: {
        color: '#a80115',
      },
    },
    labelSpan: 300,
    endSpan: 50,
    lineHeight: 30,
    padding: {
      'padding-top': 20,
      'padding-right': 20,
      'padding-bottom': 20,
      'padding-left': 20,
    },
  }

  chartContainer: any

  constructor(props: ITasksProcessChartProps) {
    super(props)
    this.chartContainer = null
    this.state = {
      width: null,
      chartRenderer: null,
      elementGroup: null,
      tooltipGroup: null,
    }
  }

  componentDidMount() {
    const chartContainer = this.chartContainer
    const { chartRenderer } = this.state
    if (chartContainer !== null && chartRenderer === null) {
      const width = chartContainer.clientWidth
      const height = this.getChartHeight()
      chartContainer.style.height = height + 'px'
      const renderer = new Highcharts.Renderer(chartContainer, width, height)
      this.setState({ chartRenderer: renderer, width }, () => {
        this.initChart()
        window.onresize = this.onResize.bind(this)
      })
    }
  }

  onResize = () => {
    const chartContainer = this.chartContainer
    const { chartRenderer } = this.state

    if (chartContainer.clientWidth) {
      this.setState({ width: chartContainer.clientWidth }, () => {
        chartRenderer.setSize(chartContainer.clientWidth, this.getChartHeight())
        this.initChart()
      })
    } else {
      // draw a refresh icon for user to refresh by clicking it
    }
  }

  initChart = () => {
    const { chartRenderer, elementGroup, tooltipGroup } = this.state

    if (elementGroup) {
      elementGroup.destroy()
    }
    if (tooltipGroup) {
      tooltipGroup.destroy()
    }

    const elements = chartRenderer.g('elementGroup').add()
    const tooltips = chartRenderer.g('tooltipGroup').add()
    this.setState({ elementGroup: elements, tooltipGroup: tooltips }, () => {
      this.drawChart(
        chartRenderer,
        elements,
        this.getChartInfor(this.props, this.state),
      )
    })
  }

  drawChart = (renderer: any, group: any, infor: IChartInfor) => {
    const {
      X,
      Y,
      width,
      height,
      labelSpan,
      endSpan,
      lineHeight,
      timeAxis,
      taskItems,
    } = infor
    if (infor.taskItems && infor.taskItems.length === 0) {
      renderer
        .label(
          'No Data',
          width / 2 - 35,
          height / 2 + 10,
          'rect',
          0,
          0,
          false,
          false,
        )
        .attr({
          zIndex: 2,
        })
        .css({
          fontFamily: 'Roboto',
          fontSize: '16px',
          color: '#00000073',
        })
        .add(group)
    } else {
      // renderer.rect(X, Y, width, height)
      //   .attr({
      //     stroke: '#000000',
      //     'stroke-width': 1,
      //     fill: 'red'
      //   }).add(group)
      // renderer.rect(X + 2, Y + height - lineHeight + 1, width - 4, lineHeight - 3)
      //   .attr({
      //     fill: 'green'
      //   }).add(group)

      this.drawTimeAxisItem(
        renderer,
        group,
        {
          X: X + 2,
          Y: Y + height - lineHeight + 1,
          width: width - 4,
          height: lineHeight - 3,
          labelSpan,
          endSpan,
        },
        timeAxis,
      )
      taskItems.forEach((item: ITaskProcessInfo, index: number) => {
        // renderer.rect(X + 2, Y + height - lineHeight * (index + 2) + 1, width - 4, lineHeight - 2)
        //   .attr({
        //     fill: 'blue'
        //   }).add(group)

        this.drawTaskProcessItem(
          renderer,
          group,
          {
            X: X + 2,
            Y: Y + height - lineHeight * (index + 2) + 1,
            width: width - 4,
            height: lineHeight - 2,
            labelSpan,
            endSpan,
          },
          item,
        )
      })
    }
    return
  }

  drawTimeAxisItem = (
    renderer: any,
    group: any,
    rect: IItemRect,
    itemInfor: ITimeAxisInfor,
  ) => {
    const { X, Y, width, height, labelSpan, endSpan } = rect
    const startX = X + labelSpan
    const startY = Y + (height - 16) / 2
    const scaleWidth =
      (width - labelSpan - endSpan) / (itemInfor.scales.length - 1)
    itemInfor.scales.forEach((scale: string, index: number) => {
      // renderer.rect(startX + scaleWidth * index, startY, scaleWidth, 16)
      //   .attr({
      //     fill: 'yellow'
      //   }).add(group)

      renderer
        .label(scale, startX + scaleWidth * index, startY - 3)
        .css({
          fontFamily: 'Roboto',
          fontSize: '16px',
          lineHeight: '16px',
          color: '#2c2c2c',
        })
        .add(group)
    })
  }

  drawTaskProcessItem = (
    renderer: any,
    group: any,
    rect: IItemRect,
    itemInfor: ITaskProcessInfo,
  ) => {
    const { X, Y, width, height, labelSpan, endSpan } = rect

    const labelX = X
    const labelY = Y + (height - 16) / 2
    const labelWidth = labelSpan
    const labelHeight = 16

    const processBarX = X + labelWidth
    const processBarY = labelY
    const processBarWidth = width - labelSpan - endSpan
    const processBarHeight = 16

    this.drawLabel(
      renderer,
      group,
      {
        X: labelX,
        Y: labelY,
        width: labelWidth,
        height: labelHeight,
        labelSpan,
        endSpan,
      },
      itemInfor,
    )
    this.drawProcessBar(
      renderer,
      group,
      {
        X: processBarX,
        Y: processBarY,
        width: processBarWidth,
        height: processBarHeight,
        labelSpan,
        endSpan,
      },
      itemInfor,
    )
  }

  drawLabel = (
    renderer: any,
    group: any,
    rect: IItemRect,
    itemInfor: ITaskProcessInfo,
  ) => {
    const { X, Y, width, height } = rect

    // renderer.rect(X, Y, width, height)
    //   .attr({
    //     fill: 'orange'
    //   }).add(group)

    // Draw Label
    const text = renderer.text(itemInfor.label, X, Y + 13)
    text
      .css({
        fontFamily: 'Roboto',
        fontSize: '16px',
        lineHeight: '16px',
        color: '#2c2c2c',
      })
      .add(group)
      .attr({
        translateX: width - text.element.clientWidth + 16,
      })
    // Draw retry icon
    if (itemInfor.count) {
      renderer
        .image('../../../assets/images/retry@2x.png', X + width - 20, Y, 20, 20)
        .add(group)
      renderer
        .text(itemInfor.count, X + width - 19, Y + 15)
        .css({
          fontFamily: 'Roboto',
          fontSize: '12px',
          fontWeight: '700',
          lineHeight: '12px',
          color: '#999999',
        })
        .add(group)
        .attr({
          translateX: 6,
        })
    }
  }

  drawProcessBar = (
    renderer: any,
    group: any,
    rect: IItemRect,
    itemInfor: ITaskProcessInfo,
  ) => {
    const { X, Y, width, height } = rect
    const {
      axisStart,
      axisEnd,
      taskStart,
      taskEnd,
      stroke,
      color,
      stripe,
      count,
    } = itemInfor

    const retryX = X + (width * (taskStart - axisStart)) / (axisEnd - axisStart)
    const retrySpan = 3
    const taskX = retryX + count * (height + retrySpan)
    const taskWidth =
      (width * (taskEnd - taskStart)) / (axisEnd - axisStart) -
      count * (height + retrySpan)

    // Draw retry point
    for (let i = 0; i < count; i++) {
      renderer
        .rect(retryX + i * (height + retrySpan), Y, height, height, height / 2)
        .attr({
          fill: '#fc324d',
        })
        .add(group)
    }

    // Draw process bar
    renderer
      .rect(
        taskX,
        Y,
        taskWidth > height ? taskWidth : height,
        height,
        height / 2,
      )
      .attr({
        stroke,
        'stroke-width': 2,
        fill: color,
      })
      .on('mouseover', () => {
        this.drawTooltip(
          renderer,
          group,
          {
            X: taskX,
            Y,
            width: taskWidth > height ? taskWidth : height,
            height,
          },
          itemInfor,
        )
      })
      .on('mouseleave', () => {
        this.closeTooltips()
      })
      .add(group)

    // Draw stripe of process bar
    if (stripe) {
      for (let i = 0; i < Math.floor((taskWidth - height) / 12); i++) {
        renderer
          .path([
            'M',
            taskX + height / 2 + 12 * i,
            Y + height,
            'L',
            taskX + height / 2 + 12 * (i + 1),
            Y,
          ])
          .attr({
            'stroke-width': 2,
            stroke: stripe,
          })
          .add(group)
      }
    }
  }

  drawTooltip = (
    renderer: any,
    group: any,
    rect: IItemRect,
    itemInfor: ITaskProcessInfo,
  ) => {
    const { X, Y, width, height } = rect
    const { taskStart, taskEnd, label, status, color, count } = itemInfor
    const { tooltipGroup } = this.state

    const tooltipBoxX = X + width / 2
    const tooltipBoxY = Y + height + 20
    let tooltipBoxWidth = 200
    let tooltipBoxHeight = 80

    const durationText = `${this.getDurationText(
      taskStart,
    )} to ${this.getDurationText(taskEnd)}`
    const durationTextX = tooltipBoxX + 20
    const durationTextY = tooltipBoxY + 30

    const statusText = `${label} ${status}`
    const statusIconX = durationTextX
    const statusIconY = durationTextY + 15
    const statusTextX = statusIconX + 15
    const statusTextY = statusIconY + 12
    if (statusText.length > 45) {
      tooltipBoxWidth += 150
    } else if (statusText.length > 35) {
      tooltipBoxWidth += 100
    } else if (statusText.length > 25) {
      tooltipBoxWidth += 50
    }

    const retryText = `Retried ${count} times`
    const retryTextX = statusTextX
    const retryTextY = statusTextY + 25
    if (count > 0) {
      tooltipBoxHeight += 20
    }

    // Draw tooltip box and arrow
    renderer
      .rect(tooltipBoxX, tooltipBoxY, tooltipBoxWidth, tooltipBoxHeight, 5)
      .attr({
        fill: '#404040',
      })
      .add(group)
      .add(tooltipGroup)
    renderer
      .path([
        'M',
        tooltipBoxX + (tooltipBoxWidth - 20) / 2,
        tooltipBoxY,
        'L',
        tooltipBoxX + (tooltipBoxWidth - 20) / 2 + 20,
        tooltipBoxY,
        'L',
        tooltipBoxX + (tooltipBoxWidth - 20) / 2 + 10,
        tooltipBoxY - 10,
        'Z',
      ])
      .attr({
        fill: '#404040',
        translateY: 1,
      })
      .add(group)
      .add(tooltipGroup)

    // Draw duration text
    renderer
      .text(durationText, durationTextX, durationTextY)
      .css({
        fontFamily: 'Roboto',
        fontSize: '16px',
        fontWeight: '400',
        lineHeight: '16px',
        color: '#ffffff',
      })
      .add(group)
      .add(tooltipGroup)

    // Draw status icon and text
    renderer
      .rect(statusIconX, statusIconY, 12, 12, 6)
      .attr({
        fill: color,
      })
      .add(group)
      .add(tooltipGroup)
    renderer
      .text(statusText, statusTextX, statusTextY)
      .css({
        fontFamily: 'Roboto',
        fontSize: '14px',
        fontWeight: '400',
        lineHeight: '14px',
        color: '#ffffff',
      })
      .add(group)
      .add(tooltipGroup)

    // Draw retry text
    if (count > 0) {
      renderer
        .text(retryText, retryTextX, retryTextY)
        .css({
          fontFamily: 'Roboto',
          fontSize: '14px',
          fontWeight: '400',
          lineHeight: '14px',
          color: '#ffffff',
        })
        .add(group)
        .add(tooltipGroup)
    }

    tooltipGroup.attr({
      translateX: -tooltipBoxWidth / 2,
    })
  }

  closeTooltips = () => {
    const { chartRenderer, tooltipGroup } = this.state
    if (tooltipGroup) {
      tooltipGroup.destroy()
    }

    const tooltips = chartRenderer.g('tooltipGroup').add()
    this.setState({ tooltipGroup: tooltips })
  }

  getChartInfor = (
    props: ITasksProcessChartProps,
    state: ITasksProcessChartState,
  ) => {
    const {
      taskList,
      statusList,
      labelSpan,
      endSpan,
      lineHeight,
      padding,
    } = props
    const { width } = state

    const timeAxis = {
      start: NaN,
      end: NaN,
    }
    taskList.forEach((task: ITaskInfo) => {
      if (isNaN(timeAxis.start)) {
        timeAxis.start = task.startTime
      }
      if (isNaN(timeAxis.end)) {
        timeAxis.end = task.endTime
      }
      if (task.startTime < timeAxis.start) {
        timeAxis.start = task.startTime
      }
      if (task.endTime > timeAxis.end) {
        timeAxis.end = task.endTime
      }
    })

    timeAxis.start = Math.floor(timeAxis.start / 3600000) * 3600000
    timeAxis.end = Math.floor(timeAxis.end / 3600000) * 3600000
    const scales = []
    for (
      let scale = timeAxis.start;
      scale <= timeAxis.end;
      scale = scale + 3600000
    ) {
      scales.push(this.getScaleText(scale))
    }

    return {
      X: padding['padding-left'],
      Y: padding['padding-top'],
      width: width - padding['padding-left'] - padding['padding-right'],
      height: (taskList && (taskList.length + 1) * lineHeight) || 0,
      labelSpan,
      endSpan,
      lineHeight,
      timeAxis: {
        scales,
        axisStart: timeAxis.start,
        axisEnd: timeAxis.end,
      },
      taskItems: taskList.map((task: ITaskInfo) => {
        return {
          axisStart: timeAxis.start,
          axisEnd: timeAxis.end,
          label: task.name,
          taskStart: task.startTime,
          taskEnd: task.endTime,
          status: task.status,
          stroke: statusList[task.status].stroke,
          color: statusList[task.status].color,
          stripe: statusList[task.status].stripe,
          count: task.retryCount,
        }
      }),
    }
  }

  getScaleText = (scale: number): string => {
    const time = new Date(scale)
    const hour = time.getHours()
    if (hour > 0 && hour < 13) {
      return hour + 'AM'
    } else if (hour === 0) {
      return '12PM'
    } else {
      return hour - 12 + 'PM'
    }
  }

  getDurationText = (scale: number): string => {
    const time = new Date(scale)
    const hour = time.getHours()
    const minute = time.getMinutes()
    if (hour > 0 && hour < 13) {
      return `${hour}:${minute} AM`
    } else if (hour === 0) {
      return `${12}:${minute} PM`
    } else {
      return `${hour - 12}:${minute} PM`
    }
  }

  getChartHeight = () => {
    const { taskList, lineHeight, padding } = this.props
    return (
      ((taskList && (taskList.length + 1) * lineHeight) || 0) +
      padding['padding-top'] +
      padding['padding-bottom']
    )
  }

  render() {
    return (
      <div
        className="process-chart-container"
        ref={(e: any) => (this.chartContainer = e)}
      />
    )
  }
}
export default TasksProcessChart
