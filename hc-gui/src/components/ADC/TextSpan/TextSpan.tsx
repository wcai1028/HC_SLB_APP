import * as React from 'react'
import { A10Component } from 'a10-gui-framework'

export interface ITextSpanProps {
  text: string
  width?: number
}

class TextSpan extends A10Component<ITextSpanProps> {
  render() {
    const { text, width = 180 } = this.props
    return (
      <div
        style={{
          width: `${width}px`,
          display: 'inline-block',
          verticalAlign: 'middle',
        }}
      >
        <div
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            width: '180px',
          }}
          title={text}
        >
          {text}
        </div>
      </div>
    )
  }
}

export default TextSpan
