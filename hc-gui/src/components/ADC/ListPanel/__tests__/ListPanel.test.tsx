import * as React from 'react'
import * as ReactTestRenderer from 'react-test-renderer'

const renderTestComponent = (props: IObject, children: any) => {
  const ListPanel = require('../index').default
  return ReactTestRenderer.create(<ListPanel {...props}>{children}</ListPanel>)
}

describe('should render ListPanel component', () => {
  it('should render component', (done: jest.DoneCallback) => {
    const testComponent = renderTestComponent(
      {
        title: 'APP Service',
        settingName: 'Name',
        settingMenu: <span>It's a setting menu!</span>,
        statusBars: <span>It's a statusBars!</span>,
        rightContent: <span>It's a rightContent</span>,
      },
      <span>It's a content</span>,
    )
    setImmediate(() => {
      expect(testComponent.toJSON()).toMatchSnapshot()
      done()
    })
  })
  it('should render component with EMPTY Props', (done: jest.DoneCallback) => {
    const testComponent = renderTestComponent({}, <span>It's a content</span>)
    setImmediate(() => {
      expect(testComponent.toJSON()).toMatchSnapshot('EMPTY props')
      done()
    })
  })
})
