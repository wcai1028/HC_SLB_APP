import { dataMap } from './dataSourceMap'

export const config = {
  dashboards: [
    {
      name: 'dashboard1',
      tops: {
        gridLayout: 'tops',
        rows: [
          {
            cols: [
              {
                widthUnits: 2,
                viz: [{ vizName: 'Selector' }],
              },
              {
                widthUnits: 10,
                viz: [
                  {
                    vizName: 'Indicators',
                    items: [
                      {
                        vizType: 'string',
                        name: 'System Status',
                        data: dataMap[
                          'RPT.ADC.L4SLB.INDICATOR.SYSTEM_STATUS'
                        ](),
                      },
                      {
                        vizType: 'number',
                        name: 'App Services',
                        prefix: 'Up',
                        range: [200, 500],
                        inverse: true,
                        divider: '/',
                        data: dataMap['RPT.ADC.L4SLB.INDICATOR.APP_SERVICE'](),
                      },
                      {
                        vizType: 'number',
                        name: 'Servers',
                        prefix: 'Up',
                        range: [200, 500],
                        inverse: true,
                        divider: '/',
                        data: dataMap['RPT.ADC.L4SLB.INDICATOR.SERVERS'](),
                      },
                      {
                        vizType: 'number',
                        name: 'Throughput',
                        unit: 'bps',
                        range: [200, 500],
                        inverse: true,
                        data: dataMap['RPT.ADC.L4SLB.INDICATOR.THROUGHPUT'](),
                      },
                      {
                        vizType: 'bytes',
                        name: 'Connection/Sec',
                        range: [200, 500],
                        inverse: true,
                        data: dataMap['RPT.ADC.L4SLB.INDICATOR.CONN_SEC'](),
                      },
                      {
                        vizType: 'bytes',
                        name: 'Current Connections',
                        range: [200, 500],
                        inverse: true,
                        data: dataMap['RPT.ADC.L4SLB.INDICATOR.CORR_CONN'](),
                      },
                      {
                        vizType: 'number',
                        name: 'Errors',
                        range: [0, 10],
                        data: dataMap['RPT.ADC.L4SLB.INDICATOR.ERRORS'](),
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            viz: [
              {
                vizName: 'Timeline',
              },
            ],
          },
        ],
      },
      charts: {
        gridLayout: 'charts',
        isDraggable: true,
        isResizable: true,
        withChartCanvasStyle: true,
        rows: [
          {
            cols: [
              {
                widthUnits: 8,
                viz: [
                  {
                    vizName: 'MultiChart',
                    name: 'CPU & MEMORY',
                    data: dataMap['RPT.ADC.L4SLB.CPU_MEMORY'](),
                    charts: [
                      [
                        {
                          name: 'Data CPU',
                          dataKey: 'data_cpu',
                          range: [60, 80],
                          inverse: true,
                          unit: '%',
                        },
                        {
                          name: 'Control CPU',
                          dataKey: 'control_cpu',
                          range: [60, 80],
                          inverse: true,
                          unit: '%',
                        },
                      ],
                      [
                        {
                          name: 'Total Memory',
                          dataKey: 'total_memory',
                          range: [60, 80],
                          inverse: true,
                          unit: '%',
                        },
                        {
                          name: 'SSL Memory',
                          data: dataMap[
                            'RPT.ADC.L4SLB.CPU_MEMORY_SSL_MEMORY'
                          ](),
                          range: [60, 80],
                          inverse: true,
                          unit: '%',
                        },
                      ],
                    ],
                  },
                ],
              },
              {
                widthUnits: 4,
                viz: [
                  {
                    vizName: 'PieChart',
                    name: 'ERRORS',
                    data: dataMap['RPT.ADC.L4SLB.ERRORS'](),
                  },
                ],
              },
            ],
          },
          {
            cols: [
              {
                viz: [
                  {
                    vizName: 'MainChart',
                    name: 'THROUGHPUT',
                    data: dataMap['RPT.ADC.L4SLB.THROUGHPUT'](),
                  },
                ],
              },
              {
                viz: [
                  {
                    vizName: 'MainChart',
                    name: 'CONNECTION RATE',
                    data: dataMap['RPT.ADC.L4SLB.CONNECTION_RATE'](),
                  },
                ],
              },
            ],
          },
          {
            cols: [
              {
                viz: [
                  {
                    vizName: 'MainChart',
                    vizType: ['line', 'bar', 'scatter', 'pie', 'map', 'table'],
                    name: 'SERVER - THROUGHPUT',
                    data: dataMap['RPT.ADC.SERVER_THROUGHPUT'](),
                  },
                ],
              },
              {
                viz: [
                  {
                    vizName: 'MainChart',
                    vizType: ['line', 'bar', 'scatter', 'pie', 'map', 'table'],
                    name: 'SERVER - CONNECTION RATE',
                    data: dataMap['RPT.ADC.SERVER_CONNECTION_RATE'](),
                  },
                ],
              },
            ],
          },
        ],
      },
      logs: {},
      drillDowns: {},
    },
  ],
}
