import { _ } from 'a10-gui-framework'
// import { hcKeys } from 'a10-gui-widgets/dist/Chart/maps/hcKeys'

// "data source id" => data
export const dataMap = {
  'RPT.ADC.L4SLB.INDICATOR.SYSTEM_STATUS': () => 'Good',
  'RPT.ADC.L4SLB.INDICATOR.APP_SERVICE': () => [
    _.random(0, 1000),
    _.random(0, 1000),
  ],
  'RPT.ADC.L4SLB.INDICATOR.SERVERS': () => [
    _.random(0, 1000),
    _.random(0, 1000),
  ],
  'RPT.ADC.L4SLB.INDICATOR.THROUGHPUT': () => _.random(0, 1000),
  'RPT.ADC.L4SLB.CPU_MEMORY': () => {
    return ['DATA CPU', 'Control CPU', 'Total Memory'].reduce(
      (data, name) => {
        const key = _.snakeCase(_.lowerCase(name))
        data[key] = {
          series: [
            {
              name,
              data: Array.from(Array(20), (v, i) => [
                _.now() - i * 100000,
                _.random(10, 100),
              ]).reverse(),
            },
          ],
          total: _.random(0, 100),
        }
        return data
      },
      {} as any,
    )
  },
  'RPT.ADC.L4SLB.CPU_MEMORY_SSL_MEMORY': () => {
    const series = [
      {
        name: 'SSL Memory',
        data: Array.from(Array(20), (v, i) => [
          _.now() - i * 100000,
          _.random(10, 100),
        ]).reverse(),
      },
    ]
    return {
      series,
      total: _.random(0, 100),
    }
  },
  'RPT.ADC.L4SLB.ERRORS': () => {
    const data = [
      'Dropped',
      'Client conn failed',
      'Server conn failed',
      'SNAT fails',
      'L4 server error',
      'Anomalies',
    ].map(name => {
      return {
        name,
        y: _.random(10, 100),
      }
    })
    return {
      series: [
        {
          name: 'ERRORS',
          data,
        },
      ],
      // total: 2000,
    }
  },
  'RPT.ADC.L4SLB.THROUGHPUT': () => {
    const series = [
      {
        name: 'Throughput',
        data: Array.from(Array(50), (v, i) => [
          _.now() - i * 100000,
          _.random(10, 100),
        ]).reverse(),
      },
    ]
    return {
      series,
    }
  },
  'RPT.ADC.L4SLB.INDICATOR.CONN_SEC': () => _.random(0, 1000),
  'RPT.ADC.L4SLB.INDICATOR.CORR_CONN': () => _.random(0, 1000),
  'RPT.ADC.L4SLB.INDICATOR.ERRORS': () => _.random(0, 100),
  'RPT.ADC.L4SLB.CONNECTION_RATE': () => {
    const series = [
      {
        name: 'Conn.Rate',
        data: Array.from(Array(50), (v, i) => [
          _.now() - i * 100000,
          _.random(10, 100),
        ]).reverse(),
      },
    ]
    return {
      series,
    }
  },
  'RPT.ADC.SERVER_THROUGHPUT': genServers,
  'RPT.ADC.SERVER_CONNECTION_RATE': genServers,
  'RPT.ADC.L4SLB.COLUMN': () => {
    const categories = ['0-10 Mbps', '10-20 Mbps', '>20 Mbps']
    const series = [
      {
        name: 'Upstream',
        data: Array.from(Array(categories.length), () => _.random(0, 100)),
      },
      {
        name: 'Downstream',
        data: Array.from(Array(categories.length), () => _.random(0, 100)),
      },
    ]
    return {
      categories,
      series,
      total: _.random(20, 100),
    }
  },
  // 'TEST.MAP'() {
  //   const randoms: number[] = []
  //   while (randoms.length < 10) {
  //     const index = _.random(0, hcKeys.length - 1)
  //     if (!randoms.includes(index)) {
  //       randoms.push(index)
  //     }
  //   }
  //   const randomValues = randoms
  //     .map(() => _.random(0, 1000))
  //     .sort()
  //     .reverse()
  //   const mapsData = randoms.map((hcIndex, index) => {
  //     const { key } = hcKeys[hcIndex]
  //     return {
  //       code: key,
  //       value: randomValues[index],
  //     }
  //   })
  //   return {
  //     series: [
  //       {
  //         name: 'Top Geolocations',
  //         data: mapsData,
  //       },
  //     ],
  //   }
  // },
  TABS: [
    'SLB',
    'SSL',
    'Caching',
    'Fast HTTP',
    'HTTP',
    'HTTP 2',
    'Connection Reset',
    'Persistence',
    'Compression',
  ],
  'LOAD.DISTRIBUTION': () => {
    const total = 2000
    const series = [
      {
        name: 'Server 1',
        data: _.random(0, total),
        units: 'k',
      },
      {
        name: 'Server 2',
        data: _.random(0, total),
        units: 'k',
      },
      {
        name: 'Server 3',
        data: _.random(0, total),
        units: 'k',
      },
    ]
    return {
      series,
      total,
    }
  },
  'LINE CHART': () => {
    const series = [
      {
        name: 'Response Times',
        data: Array.from(Array(50), (v, i) => [
          _.now() - i * 100000000,
          _.random(10, 100),
        ]).reverse(),
      },
    ]
    return {
      series,
    }
  },
}

function genServers() {
  const series = Array.from(Array(5), (v, i) => {
    return {
      name: `Server${i + 1}`,
      data: Array.from(Array(50), (value, index) => [
        _.now() - index * 100000,
        _.random(10, 100),
      ]).reverse(),
    }
  })
  return {
    series,
  }
}
