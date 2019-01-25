import { _ } from 'a10-gui-framework'

export class L4SLBUtilitis {

   prepopulateAppName = (virtualServer: IObject,  prefix: any) => {
    try {
      const ipAdd = virtualServer.ip.replace(/[.]/g, '_')

      if (!_.isUndefined(ipAdd) && !_.isEmpty(ipAdd)) {
        const defaultAppName = prefix + '_' + ipAdd
        let appName = virtualServer.name

        appName = _.isUndefined(appName) ? '' : appName

        if (_.isEmpty(appName.trim())) {
          virtualServer.name = defaultAppName
        }
      }
    } catch (err) {
      //$log.debug("prepopulate appname error.");
    }
  }


}


export default L4SLBUtilitis
