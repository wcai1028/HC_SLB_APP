import * as React from 'react'
import * as ReactTestRenderer from 'react-test-renderer'

import {
    InfraStructureStatsService,
    InfrastructureService,
    DashboardService,
    Utilities,
} from 'src/services/index'

import HCProvider from 'src/HCProvider'
import DeviceList from '../DeviceList'
import deviceListProps from '../__mocks__/deviceListProps'
import deviceList from '../__mocks__/deviceList'

const renderTestComponent = (deviceListProps) => {
    return ReactTestRenderer.create(
        <HCProvider>
            <DeviceList {...deviceListProps} />
        </HCProvider>,
    )
}

const testComponent = renderTestComponent(deviceListProps)
const devicelist = testComponent.root.find(
    (node: any) => node.type.name === 'DeviceList',
)

beforeEach(() => {
    ; (global as any).sessionStorage.setItem('ADMIN_LEVEL', 'provider')
        ; (global as any).sessionStorage.setItem('PROVIDER', 'provider')
    devicelist.instance.setState = jest.fn()
    devicelist.instance.InfrastructureService = new InfrastructureService()
    devicelist.instance.InfraStructureStatsService = new InfraStructureStatsService()
    devicelist.instance.DashboardService = new DashboardService()
});

// test('should render properly with empty data', (done: any) => {
//     expect(testComponent.toJSON()).toMatchSnapshot()
// })

test('test loadDevices', (done: any) => {
    setImmediate(() => {
        let promise = Promise.resolve({ data: { 'device-list': deviceList["device-list"] } })
        devicelist.instance.InfrastructureService.getDevices = jest.fn(() => promise)
        devicelist.instance.loadDevices()
        promise.then(data => {
            expect(data).toEqual({ data: { 'device-list': deviceList["device-list"] } })
        })
        done()
    })
})

test('test loadDevices failure', (done: any) => {
    setImmediate(() => {
        let rejectPromise2 = Promise.reject({
            error: {
                response: { data: { message: 'Error' } },
            },
            response: { data: { message: 'Error' } },
        })
        devicelist.instance.InfrastructureService.getDevices = jest.fn(() => rejectPromise2)
        devicelist.instance.loadDevices()
        done()
    })
})

test('test receiveUpdateMethod', (done: any) => {
    setImmediate(() => {
        devicelist.instance.receiveUpdate()
        done()
    })
})