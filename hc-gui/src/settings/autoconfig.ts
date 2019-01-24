import { setUpAutoConfig } from 'a10-gui-common'

const pathPrefix = 'config/form'

setUpAutoConfig({
  uiSchemaPublicPath: `${process.env.PUBLIC_URL || ''}/ui-schemas`,
  defaultProps: {
    hccEnv: true,
  },
  ENV_CONSTS: {
    CLOCK: {
      time: '',
      offset: '',
      date: '',
      timezone: '',
      'source-type': 0,
      day: '',
    },
  },
  mapping: {
  },
})
