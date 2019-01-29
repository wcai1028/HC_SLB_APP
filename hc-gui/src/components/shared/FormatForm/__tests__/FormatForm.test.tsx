import * as React from 'react'
import * as ReactTestRenderer from 'react-test-renderer'
import FormatForm from '../index'

describe('should FormatForm work', () => {
  it('should render properly', () => {
    const component = ReactTestRenderer.create(
      <FormatForm onRequestClose={jest.fn()}>
        <div>test</div>
      </FormatForm>,
    )
    const formatFormInstance = component.root.find(
      (node: any) => node.type.name === 'FormatForm',
    ).instance
    expect(component.toJSON()).toMatchSnapshot()
    formatFormInstance.closeSlidingPage()
    expect(formatFormInstance.props.onRequestClose).toHaveBeenCalled()
    expect(FormatForm.defaultProps.onRequestOk(true)).toBe(undefined)
  })

  it('should render properly with custom text for save button', () => {
    const component = ReactTestRenderer.create(
      <FormatForm
        showBack={true}
        saveText="Test"
        hideCancel={true}
        customizedButtons={<button>Test</button>}
      >
        <div>test</div>
      </FormatForm>,
    )
    expect(component.toJSON()).toMatchSnapshot()
  })

  it('should render properly with aliignSaveButtonToRight without custom text for save button', () => {
    const component = ReactTestRenderer.create(
      <FormatForm
        showBack={true}
        alignSaveButtonToRight={true}
        hideCancel={true}
        customizedButtons={<button>Test</button>}
      >
        <div>test</div>
      </FormatForm>,
    )
    expect(component.toJSON()).toMatchSnapshot()
  })

  it('should render properly with aliignSaveButtonToRight with custom text for save button', () => {
    const component = ReactTestRenderer.create(
      <FormatForm
        showBack={true}
        saveText="Test"
        alignSaveButtonToRight={true}
        hideCancel={true}
        customizedButtons={<button>Test</button>}
      >
        <div>test</div>
      </FormatForm>,
    )
    expect(component.toJSON()).toMatchSnapshot()
  })
})
