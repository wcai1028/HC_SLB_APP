import * as React from 'react'
import { A10Container } from 'a10-gui-framework'
import HealthStatus from 'src/components/shared/HealthStatus'
// import httpClient from 'src/libraries/httpClient'
// import { getItem } from 'src/libraries/storage'

export interface IAppSvcDetailProps {
  deploySpec: IObject
}

export interface IAppSvcDetailState {
  hidden: boolean
}

class AppSvcDetail extends A10Container<
  IAppSvcDetailProps,
  IAppSvcDetailState
> {
  constructor(props: IAppSvcDetailProps) {
    super(props)
    this.state = {
      hidden: false,
    }
    this.onClickButton = this.onClickButton.bind(this)
  }

  // renderPartitionList = (obj: IObject = {}) => {
  //     return (
  //         <React.Fragment>
  //             <HealthStatus type="ongoing" text="p" />
  //             {`${obj['device-name']}: ${obj.partition}`}
  //         </React.Fragment>
  //     )
  // }

  onClickButton = (e: React.MouseEvent<any>) => {
    this.setState(state => ({ hidden: !this.state.hidden }))
  }

  render() {
    const { deploySpec } = this.props
    // const MoreIcon = ({ ...props }) => {
    //     return (
    //         <span className="a10-icon" style={{ cursor: 'pointer' }} >
    //             <img {...props} style={{ height: '15px' }} src={More} />
    //         </span>
    //     )
    // }
    let appSvcLogicalClusterPairs = null
    if (deploySpec && deploySpec['app-svc-association-list']) {
      appSvcLogicalClusterPairs = deploySpec['app-svc-association-list'].map(
        (item: IObject) => {
          const cluster = item['logical-cluster-list'][0]['logical-cluster']
          const deviceList =
            item['logical-cluster-list'][0]['physical-cluster-list']
          const clusterPartitionPairs = deviceList
            ? deviceList.map((pair: IObject, index: number) => {
                // // TOFIXME:   wait for Rishi's api change
                // const deviceURL = `/hpcapi/v3/provider/${getItem('PROVIDER')}/device/${pair['device-name']}`
                // const { data: Res } = await httpClient.get(deviceURL)
                // console.log(Res)
                // const PCName = Res.device.cluster
                return (
                  <span
                    className="app-svc-detail-name"
                    key={`${item['app-svc']}-${index}`}
                  >
                    {/* <span style={{ marginLeft: '10px' }}><HealthStatus type="ongoing" tooltip="Physical Cluster" text="PC" /><span style={{ marginLeft: '5px' }}>{PCName}</span></span> */}
                    <span style={{ marginLeft: '10px' }}>
                      <HealthStatus type="ongoing" tooltip="Device" text="D" />
                      <span style={{ marginLeft: '5px' }}>
                        {pair['device-name']}
                      </span>
                    </span>
                    <span style={{ marginLeft: '10px' }}>
                      <HealthStatus
                        type="ongoing"
                        tooltip="Partition"
                        text="P"
                      />
                      <span style={{ marginLeft: '5px' }}>
                        {pair.partition}
                      </span>
                    </span>
                  </span>
                )
              })
            : null
          return (
            <div className="app-svc-text" key={item['app-svc']}>
              <span className="app-svc-detail-name">
                <HealthStatus type="info" tooltip="App Service" text="AS" />
                <span style={{ marginLeft: '10px' }}>{item['app-svc']}</span>
              </span>
              <span className="app-svc-detail-name">
                <HealthStatus type="info" tooltip="Logical Cluster" text="LC" />
                <span style={{ marginLeft: '10px' }}>{cluster}</span>
              </span>
              {clusterPartitionPairs}
              {/* <span style={{ marginLeft: '10px', verticalAlign: 'top' }} >
                            <InfoTooltip
                                objList={deviceList}
                                componentDisplay={<MoreIcon />}
                                renderText={this.renderPartitionList}
                            />
                        </span> */}
            </div>
          )
        },
      )
    }
    return (
      <div className="app-svc-detail">
        <div className="show-hide-button" onClick={this.onClickButton}>
          {this.state.hidden ? 'Show ' : 'Hide '}
          App Service(s)
        </div>
        {this.state.hidden ? null : appSvcLogicalClusterPairs}
      </div>
    )
  }
}

export default AppSvcDetail
