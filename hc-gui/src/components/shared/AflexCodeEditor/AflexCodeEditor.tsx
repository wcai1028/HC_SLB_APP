import * as React from 'react'
import { _, A10Component } from 'a10-gui-framework'

// tslint:disable:no-var-requires
const CodeMirror = require('react-codemirror')
require('./mode/aflex/aflex')
import 'codemirror/lib/codemirror.css'
import './theme/a10.css'
const styles = require('./styles/index.module.less')

export interface IAflexCodeEditorProps {
  onAFlexChange: (value: string) => void
  value: string
  options?: IObject
  version?: string
  diff?: any[]
  id: string
}

class AflexCodeEditor extends A10Component<IAflexCodeEditorProps> {
  constructor(props: IAflexCodeEditorProps) {
    super(props)
    this.myRef = React.createRef()
  }

  componentDidMount() {
    this.renderDiffStyle(this.props.diff)
  }

  componentDidUpdate(preProps: any) {
    if (preProps.value !== this.props.value && this.props.options.readOnly) {
      if (this.myRef.current) {
        const cm = this.myRef.current.getCodeMirror()
        cm.setValue(this.props.value)
      }
    }
  }
  renderDiffStyle = (diff: any[]) => {
    if (this.myRef.current) {
      const cm = this.myRef.current.getCodeMirror()
      if (diff) {
        for (const ch of this.props.diff) {
          if (ch[0] === 'replace') {
            if (this.props.version === 'before') {
              _.range(ch[1], ch[2]).forEach((num: number) => {
                cm.addLineClass(num, 'wrap', styles.diffReplace)
              })
            } else {
              _.range(ch[3], ch[4]).forEach((num: number) => {
                cm.addLineClass(num, 'wrap', styles.diffReplace)
              })
            }
          } else if (ch[0] === 'insert') {
            if (this.props.version === 'after') {
              _.range(ch[3], ch[4]).forEach((num: number) => {
                cm.addLineClass(num, 'wrap', styles.diffInsert)
              })
            }
          } else if (ch[0] === 'delete') {
            if (this.props.version === 'before') {
              _.range(ch[1], ch[2]).forEach((num: number) => {
                cm.addLineClass(num, 'wrap', styles.diffDelete)
              })
            }
          }
        }
      }
    }
  }

  updateCode = (value: string) => {
    this.props.onAFlexChange(value)
  }

  render() {
    const editorStyle = {
      paddingTop: '10px',
      paddingBottom: '10px',
      border: 'solid 2px #e7ecf1',
    }
    const tag = this.props.version + '_' + this.props.id
    return (
      <div style={editorStyle} id={tag}>
        <CodeMirror
          value={this.props.value}
          onChange={this.updateCode}
          options={this.props.options}
          ref={this.myRef}
        />
      </div>
    )
  }
}

export default AflexCodeEditor
