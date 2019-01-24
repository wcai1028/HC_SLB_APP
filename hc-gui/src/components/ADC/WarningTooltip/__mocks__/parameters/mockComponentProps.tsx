import * as React from 'react'

interface ITestDivProps {
  onClick: () => void,
}

class TestDiv extends React.Component<ITestDivProps> {

  handleClick = () => {
    const { onClick } = this.props
    if (onClick) {
      onClick()
    }
  }

  render() {
    return <div onClick={this.handleClick}>{this.props.children}</div>
  }
}

export const mockWarningTooltipProps =  (useDefault: boolean, onConfirm: any, onVisibleChange: any) => {
  if (useDefault) {
    return {
      title: '',
      description: [],
      action: '',
      onConfirm,
      content: null,
      arrowPointAtCenter: null,
      placement: null,
      trigger: null,
      visible: undefined,
      onVisibleChange: null,
    }
  } else {
    return {
      title: 'Test Title',
      description: ['Test description1', 'Test descriptions2'],
      action: 'Save',
      onConfirm,
      content: (
        title: string,
        description: string[],
        action: string,
        onConfirm: () => void,
      ) => {
        return <>
          <div>{title}</div>
          <div>
            {description.map((data: string, index: number) => {
              return <span key={index}>{data}</span>
            })}
          </div>
          <TestDiv onClick={onConfirm} >{action}</TestDiv>
        </>
      },
      arrowPointAtCenter: false,
      placement: 'bottomRight',
      trigger: 'click',
      visible: false,
      onVisibleChange,
    }
  }
}

export const mockInfoTooltipProps = (isEmpty: boolean, isDefault: boolean, isTest: boolean) => {
  if (isEmpty) {
    return {}
  } else if (isDefault) {
    return {
      objList: [
        { value: 'Test value1' },
        { value: 'Test value2' },
        { value: 'Test value3' },
      ],
    }
  } else {
    if (isTest === true) {
      return {
        objList: [
          { value: 'Test value1' },
          { value: 'Test value2' },
          { value: 'Test value3' },
        ],
        componentDisplay: null,
        textDisplay: 'Test text',
        renderText: (obj: IObject) => {
          return <div>{obj.value}</div>
        },
        actions: 'Test action',
      }
    } else if (isTest === false) {
      return {
        objList: [
          { value: 'Test value1' },
          { value: 'Test value2' },
          { value: 'Test value3' },
        ],
        componentDisplay: <div>Test component</div>,
        textDisplay: '',
        renderText: (obj: IObject) => {
          return <div>{obj.value}</div>
        },
        actions: 'Test action',
      }
    }
    return {}
  }
}
