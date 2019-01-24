import parameters from 'parameters'

export class Configs {
  EVENTS = [
    {
      name: 'System Operations',
      key: 'Sys_operations',

      columns: [
        {
          title: 'System Operations',
          main: true,
          dataIndex: 'defintion_name',
          logo: 'global',
          key: 'System_Operations',
        },
        {
          title: 'Action name',
          dataIndex: 'action_name',
          main: false,
          key: 'Action_Name',
        },
        {
          title: 'Occured',
          dataIndex: 'occured',
          main: false,
          subText: 'Last 6 hours',
          key: 'occured',
        },
      ],
      contents: [
        {
          name: 'System',
          items: [
            {
              name: 'info',
              contents: [
                {
                  name: 'info',
                  type: 'switch',
                },
                {
                  name: '',
                  type: 'dropDown',
                  options: [
                    {
                      name: 'Default',
                      value: 'default',
                    },
                    {
                      name: 'Send Email to Support',
                      value: 'email',
                    },
                  ],
                },
                {
                  name: '',
                  type: 'histogram',
                },
              ],
            },
            {
              name: 'notice',
              contents: [
                {
                  name: 'notice',
                  type: 'switch',
                },
                {
                  name: '',
                  type: 'dropDown',
                  options: [
                    {
                      name: 'Default',
                      value: 'default',
                    },
                    {
                      name: 'Send Email to Support',
                      value: 'email',
                    },
                  ],
                },
                {
                  name: '',
                  type: 'histogram',
                },
              ],
            },
            {
              name: 'warning',
              contents: [
                {
                  name: 'warning',
                  type: 'switch',
                },
                {
                  name: '',
                  type: 'dropDown',
                  options: [
                    {
                      name: 'Default',
                      value: 'default',
                    },
                    {
                      name: 'Send Email to Support',
                      value: 'email',
                    },
                  ],
                },
                {
                  name: '',
                  type: 'histogram',
                },
              ],
            },
            {
              name: 'error',
              contents: [
                {
                  name: 'error',
                  type: 'switch',
                },
                {
                  name: '',
                  type: 'dropDown',
                  options: [
                    {
                      name: 'Default',
                      value: 'default',
                    },
                    {
                      name: 'Send Email to Support',
                      value: 'email',
                    },
                  ],
                },
                {
                  name: '',
                  type: 'histogram',
                },
              ],
            },
          ],
        },
        {
          name: 'Thunder ACOS',
          items: [
            {
              name: 'info',
              contents: [
                {
                  name: 'info',
                  type: 'switch',
                },
                {
                  name: '',
                  type: 'dropDown',
                  options: [
                    {
                      name: 'Default',
                      value: 'default',
                    },
                    {
                      name: 'Send Email to Support',
                      value: 'email',
                    },
                  ],
                },
                {
                  name: '',
                  type: 'histogram',
                },
              ],
            },
            {
              name: 'notice',
              contents: [
                {
                  name: 'notice',
                  type: 'switch',
                },
                {
                  name: '',
                  type: 'dropDown',
                  options: [
                    {
                      name: 'Default',
                      value: 'default',
                    },
                    {
                      name: 'Send Email to Support',
                      value: 'email',
                    },
                  ],
                },
                {
                  name: '',
                  type: 'histogram',
                },
              ],
            },
            {
              name: 'warning',
              contents: [
                {
                  name: 'warning',
                  type: 'switch',
                },
                {
                  name: '',
                  type: 'dropDown',
                  options: [
                    {
                      name: 'Default',
                      value: 'default',
                    },
                    {
                      name: 'Send Email to Support',
                      value: 'email',
                    },
                  ],
                },
                {
                  name: '',
                  type: 'histogram',
                },
              ],
            },
            {
              name: 'error',
              contents: [
                {
                  name: 'error',
                  type: 'switch',
                },
                {
                  name: '',
                  type: 'dropDown',
                  options: [
                    {
                      name: 'Default',
                      value: 'default',
                    },
                    {
                      name: 'Send Email to Support',
                      value: 'email',
                    },
                  ],
                },
                {
                  name: '',
                  type: 'histogram',
                },
              ],
            },
          ],
        },
        {
          name: 'VCS Controller',
          items: [
            {
              name: 'info',
              contents: [
                {
                  name: 'info',
                  type: 'switch',
                },
                {
                  name: '',
                  type: 'dropDown',
                  options: [
                    {
                      name: 'Default',
                      value: 'default',
                    },
                    {
                      name: 'Send Email to Support',
                      value: 'email',
                    },
                  ],
                },
                {
                  name: '',
                  type: 'histogram',
                },
              ],
            },
            {
              name: 'notice',
              contents: [
                {
                  name: 'notice',
                  type: 'switch',
                },
                {
                  name: '',
                  type: 'dropDown',
                  options: [
                    {
                      name: 'Default',
                      value: 'default',
                    },
                    {
                      name: 'Send Email to Support',
                      value: 'email',
                    },
                  ],
                },
                {
                  name: '',
                  type: 'histogram',
                },
              ],
            },
            {
              name: 'warning',
              contents: [
                {
                  name: 'warning',
                  type: 'switch',
                },
                {
                  name: '',
                  type: 'dropDown',
                  options: [
                    {
                      name: 'Default',
                      value: 'default',
                    },
                    {
                      name: 'Send Email to Support',
                      value: 'email',
                    },
                  ],
                },
                {
                  name: '',
                  type: 'histogram',
                },
              ],
            },
            {
              name: 'error',
              contents: [
                {
                  name: 'error',
                  type: 'switch',
                },
                {
                  name: '',
                  type: 'dropDown',
                  options: [
                    {
                      name: 'Default',
                      value: 'default',
                    },
                    {
                      name: 'Send Email to Support',
                      value: 'email',
                    },
                  ],
                },
                {
                  name: '',
                  type: 'histogram',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'App Services',
      key: 'app_services',
      columns: [
        {
          title: 'App Services',
          main: true,
          dataIndex: 'defintion_name',
          logo: 'global',
          key: 'app_services',
        },
        {
          title: 'Action name',
          dataIndex: 'action_name',
          main: false,
          key: 'Action_Name',
        },
        {
          title: 'Occured',
          dataIndex: 'occured',
          main: false,
          subText: 'Last 6 hours',
          key: 'occured',
        },
      ],
      contents: [
        {
          name: 'Configuration Manager',
          items: [
            {
              name: 'info',
              contents: [
                {
                  name: 'info',
                  type: 'switch',
                },
                {
                  name: '',
                  type: 'dropDown',
                  options: [
                    {
                      name: 'Default',
                      value: 'default',
                    },
                    {
                      name: 'Send Email to Support',
                      value: 'email',
                    },
                  ],
                },
                {
                  name: '',
                  type: 'histogram',
                },
              ],
            },
            {
              name: 'notice',
              contents: [
                {
                  name: 'notice',
                  type: 'switch',
                },
                {
                  name: '',
                  type: 'dropDown',
                  options: [
                    {
                      name: 'Default',
                      value: 'default',
                    },
                    {
                      name: 'Send Email to Support',
                      value: 'email',
                    },
                  ],
                },
                {
                  name: '',
                  type: 'histogram',
                },
              ],
            },
            {
              name: 'warning',
              contents: [
                {
                  name: 'warning',
                  type: 'switch',
                },
                {
                  name: '',
                  type: 'dropDown',
                  options: [
                    {
                      name: 'Default',
                      value: 'default',
                    },
                    {
                      name: 'Send Email to Support',
                      value: 'email',
                    },
                  ],
                },
                {
                  name: '',
                  type: 'histogram',
                },
              ],
            },
            {
              name: 'error',
              contents: [
                {
                  name: 'error',
                  type: 'switch',
                },
                {
                  name: '',
                  type: 'dropDown',
                  options: [
                    {
                      name: 'Default',
                      value: 'default',
                    },
                    {
                      name: 'Send Email to Support',
                      value: 'email',
                    },
                  ],
                },
                {
                  name: '',
                  type: 'histogram',
                },
              ],
            },
          ],
        },
        {
          name: 'Compression',
          items: [
            {
              name: 'info',
              contents: [
                {
                  name: 'info',
                  type: 'switch',
                },
                {
                  name: '',
                  type: 'dropDown',
                  options: [
                    {
                      name: 'Default',
                      value: 'default',
                    },
                    {
                      name: 'Send Email to Support',
                      value: 'email',
                    },
                  ],
                },
                {
                  name: '',
                  type: 'histogram',
                },
              ],
            },
            {
              name: 'notice',
              contents: [
                {
                  name: 'notice',
                  type: 'switch',
                },
                {
                  name: '',
                  type: 'dropDown',
                  options: [
                    {
                      name: 'Default',
                      value: 'default',
                    },
                    {
                      name: 'Send Email to Support',
                      value: 'email',
                    },
                  ],
                },
                {
                  name: '',
                  type: 'histogram',
                },
              ],
            },
            {
              name: 'warning',
              contents: [
                {
                  name: 'warning',
                  type: 'switch',
                },
                {
                  name: '',
                  type: 'dropDown',
                  options: [
                    {
                      name: 'Default',
                      value: 'default',
                    },
                    {
                      name: 'Send Email to Support',
                      value: 'email',
                    },
                  ],
                },
                {
                  name: '',
                  type: 'histogram',
                },
              ],
            },
            {
              name: 'error',
              contents: [
                {
                  name: 'error',
                  type: 'switch',
                },
                {
                  name: '',
                  type: 'dropDown',
                  options: [
                    {
                      name: 'Default',
                      value: 'default',
                    },
                    {
                      name: 'Send Email to Support',
                      value: 'email',
                    },
                  ],
                },
                {
                  name: '',
                  type: 'histogram',
                },
              ],
            },
          ],
        },
        {
          name: 'GSLB Service',
          items: [
            {
              name: 'info',
              contents: [
                {
                  name: 'info',
                  type: 'switch',
                },
                {
                  name: '',
                  type: 'dropDown',
                  options: [
                    {
                      name: 'Default',
                      value: 'default',
                    },
                    {
                      name: 'Send Email to Support',
                      value: 'email',
                    },
                  ],
                },
                {
                  name: '',
                  type: 'histogram',
                },
              ],
            },
            {
              name: 'notice',
              contents: [
                {
                  name: 'notice',
                  type: 'switch',
                },
                {
                  name: '',
                  type: 'dropDown',
                  options: [
                    {
                      name: 'Default',
                      value: 'default',
                    },
                    {
                      name: 'Send Email to Support',
                      value: 'email',
                    },
                  ],
                },
                {
                  name: '',
                  type: 'histogram',
                },
              ],
            },
            {
              name: 'warning',
              contents: [
                {
                  name: 'warning',
                  type: 'switch',
                },
                {
                  name: '',
                  type: 'dropDown',
                  options: [
                    {
                      name: 'Default',
                      value: 'default',
                    },
                    {
                      name: 'Send Email to Support',
                      value: 'email',
                    },
                  ],
                },
                {
                  name: '',
                  type: 'histogram',
                },
              ],
            },
            {
              name: 'error',
              contents: [
                {
                  name: 'error',
                  type: 'switch',
                },
                {
                  name: '',
                  type: 'dropDown',
                  options: [
                    {
                      name: 'Default',
                      value: 'default',
                    },
                    {
                      name: 'Send Email to Support',
                      value: 'email',
                    },
                  ],
                },
                {
                  name: '',
                  type: 'histogram',
                },
              ],
            },
          ],
        },
        {
          name: 'WAF Service',
          items: [
            {
              name: 'info',
              contents: [
                {
                  name: 'info',
                  type: 'switch',
                },
                {
                  name: '',
                  type: 'dropDown',
                  options: [
                    {
                      name: 'Default',
                      value: 'default',
                    },
                    {
                      name: 'Send Email to Support',
                      value: 'email',
                    },
                  ],
                },
                {
                  name: '',
                  type: 'histogram',
                },
              ],
            },
            {
              name: 'notice',
              contents: [
                {
                  name: 'notice',
                  type: 'switch',
                },
                {
                  name: '',
                  type: 'dropDown',
                  options: [
                    {
                      name: 'Default',
                      value: 'default',
                    },
                    {
                      name: 'Send Email to Support',
                      value: 'email',
                    },
                  ],
                },
                {
                  name: '',
                  type: 'histogram',
                },
              ],
            },
            {
              name: 'warning',
              contents: [
                {
                  name: 'warning',
                  type: 'switch',
                },
                {
                  name: '',
                  type: 'dropDown',
                  options: [
                    {
                      name: 'Default',
                      value: 'default',
                    },
                    {
                      name: 'Send Email to Support',
                      value: 'email',
                    },
                  ],
                },
                {
                  name: '',
                  type: 'histogram',
                },
              ],
            },
            {
              name: 'error',
              contents: [
                {
                  name: 'error',
                  type: 'switch',
                },
                {
                  name: '',
                  type: 'dropDown',
                  options: [
                    {
                      name: 'Default',
                      value: 'default',
                    },
                    {
                      name: 'Send Email to Support',
                      value: 'email',
                    },
                  ],
                },
                {
                  name: '',
                  type: 'histogram',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'Health Monitor',
      key: 'health_monitor',
      columns: [
        {
          title: 'Health Monitor',
          main: true,
          dataIndex: 'defintion_name',
          logo: 'global',
          key: 'health_monitor',
        },
        {
          title: 'Action name',
          dataIndex: 'action_name',
          main: false,
          key: 'Action_Name',
        },
        {
          title: 'Occured',
          dataIndex: 'occured',
          main: false,
          subText: 'Last 6 hours',
          key: 'occured',
        },
      ],
      contents: [
        {
          name: 'Monitoring Service',
          items: [
            {
              name: 'info',
              contents: [
                {
                  name: 'info',
                  type: 'switch',
                },
                {
                  name: '',
                  type: 'dropDown',
                  options: [
                    {
                      name: 'Default',
                      value: 'default',
                    },
                    {
                      name: 'Send Email to Support',
                      value: 'email',
                    },
                  ],
                },
                {
                  name: '',
                  type: 'histogram',
                },
              ],
            },
            {
              name: 'notice',
              contents: [
                {
                  name: 'notice',
                  type: 'switch',
                },
                {
                  name: '',
                  type: 'dropDown',
                  options: [
                    {
                      name: 'Default',
                      value: 'default',
                    },
                    {
                      name: 'Send Email to Support',
                      value: 'email',
                    },
                  ],
                },
                {
                  name: '',
                  type: 'histogram',
                },
              ],
            },
            {
              name: 'warning',
              contents: [
                {
                  name: 'warning',
                  type: 'switch',
                },
                {
                  name: '',
                  type: 'dropDown',
                  options: [
                    {
                      name: 'Default',
                      value: 'default',
                    },
                    {
                      name: 'Send Email to Support',
                      value: 'email',
                    },
                  ],
                },
                {
                  name: '',
                  type: 'histogram',
                },
              ],
            },
            {
              name: 'error',
              contents: [
                {
                  name: 'error',
                  type: 'switch',
                },
                {
                  name: '',
                  type: 'dropDown',
                  options: [
                    {
                      name: 'Default',
                      value: 'default',
                    },
                    {
                      name: 'Send Email to Support',
                      value: 'email',
                    },
                  ],
                },
                {
                  name: '',
                  type: 'histogram',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'Networking',
      key: 'networking',
      columns: [
        {
          title: 'Networking',
          main: true,
          dataIndex: 'defintion_name',
          logo: 'global',
          key: 'networking',
        },
        {
          title: 'Action name',
          dataIndex: 'action_name',
          main: false,
          key: 'Action_Name',
        },
        {
          title: 'Occured',
          dataIndex: 'occured',
          main: false,
          subText: 'Last 6 hours',
          key: 'occured',
        },
      ],
      contents: [
        {
          name: 'IPV6 Service',
          items: [
            {
              name: 'info',
              contents: [
                {
                  name: 'info',
                  type: 'switch',
                },
                {
                  name: '',
                  type: 'dropDown',
                  options: [
                    {
                      name: 'Default',
                      value: 'default',
                    },
                    {
                      name: 'Send Email to Support',
                      value: 'email',
                    },
                  ],
                },
                {
                  name: '',
                  type: 'histogram',
                },
              ],
            },
            {
              name: 'notice',
              contents: [
                {
                  name: 'notice',
                  type: 'switch',
                },
                {
                  name: '',
                  type: 'dropDown',
                  options: [
                    {
                      name: 'Default',
                      value: 'default',
                    },
                    {
                      name: 'Send Email to Support',
                      value: 'email',
                    },
                  ],
                },
                {
                  name: '',
                  type: 'histogram',
                },
              ],
            },
            {
              name: 'warning',
              contents: [
                {
                  name: 'warning',
                  type: 'switch',
                },
                {
                  name: '',
                  type: 'dropDown',
                  options: [
                    {
                      name: 'Default',
                      value: 'default',
                    },
                    {
                      name: 'Send Email to Support',
                      value: 'email',
                    },
                  ],
                },
                {
                  name: '',
                  type: 'histogram',
                },
              ],
            },
            {
              name: 'error',
              contents: [
                {
                  name: 'error',
                  type: 'switch',
                },
                {
                  name: '',
                  type: 'dropDown',
                  options: [
                    {
                      name: 'Default',
                      value: 'default',
                    },
                    {
                      name: 'Send Email to Support',
                      value: 'email',
                    },
                  ],
                },
                {
                  name: '',
                  type: 'histogram',
                },
              ],
            },
          ],
        },
        {
          name: 'L3 Service',
          items: [
            {
              name: 'info',
              contents: [
                {
                  name: 'info',
                  type: 'switch',
                },
                {
                  name: '',
                  type: 'dropDown',
                  options: [
                    {
                      name: 'Default',
                      value: 'default',
                    },
                    {
                      name: 'Send Email to Support',
                      value: 'email',
                    },
                  ],
                },
                {
                  name: '',
                  type: 'histogram',
                },
              ],
            },
            {
              name: 'notice',
              contents: [
                {
                  name: 'notice',
                  type: 'switch',
                },
                {
                  name: '',
                  type: 'dropDown',
                  options: [
                    {
                      name: 'Default',
                      value: 'default',
                    },
                    {
                      name: 'Send Email to Support',
                      value: 'email',
                    },
                  ],
                },
                {
                  name: '',
                  type: 'histogram',
                },
              ],
            },
            {
              name: 'warning',
              contents: [
                {
                  name: 'warning',
                  type: 'switch',
                },
                {
                  name: '',
                  type: 'dropDown',
                  options: [
                    {
                      name: 'Default',
                      value: 'default',
                    },
                    {
                      name: 'Send Email to Support',
                      value: 'email',
                    },
                  ],
                },
                {
                  name: '',
                  type: 'histogram',
                },
              ],
            },
            {
              name: 'error',
              contents: [
                {
                  name: 'error',
                  type: 'switch',
                },
                {
                  name: '',
                  type: 'dropDown',
                  options: [
                    {
                      name: 'Default',
                      value: 'default',
                    },
                    {
                      name: 'Send Email to Support',
                      value: 'email',
                    },
                  ],
                },
                {
                  name: '',
                  type: 'histogram',
                },
              ],
            },
          ],
        },
        {
          name: 'Router',
          items: [
            {
              name: 'info',
              contents: [
                {
                  name: 'info',
                  type: 'switch',
                },
                {
                  name: '',
                  type: 'dropDown',
                  options: [
                    {
                      name: 'Default',
                      value: 'default',
                    },
                    {
                      name: 'Send Email to Support',
                      value: 'email',
                    },
                  ],
                },
                {
                  name: '',
                  type: 'histogram',
                },
              ],
            },
            {
              name: 'notice',
              contents: [
                {
                  name: 'notice',
                  type: 'switch',
                },
                {
                  name: '',
                  type: 'dropDown',
                  options: [
                    {
                      name: 'Default',
                      value: 'default',
                    },
                    {
                      name: 'Send Email to Support',
                      value: 'email',
                    },
                  ],
                },
                {
                  name: '',
                  type: 'histogram',
                },
              ],
            },
            {
              name: 'warning',
              contents: [
                {
                  name: 'warning',
                  type: 'switch',
                },
                {
                  name: '',
                  type: 'dropDown',
                  options: [
                    {
                      name: 'Default',
                      value: 'default',
                    },
                    {
                      name: 'Send Email to Support',
                      value: 'email',
                    },
                  ],
                },
                {
                  name: '',
                  type: 'histogram',
                },
              ],
            },
            {
              name: 'error',
              contents: [
                {
                  name: 'error',
                  type: 'switch',
                },
                {
                  name: '',
                  type: 'dropDown',
                  options: [
                    {
                      name: 'Default',
                      value: 'default',
                    },
                    {
                      name: 'Send Email to Support',
                      value: 'email',
                    },
                  ],
                },
                {
                  name: '',
                  type: 'histogram',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'Others',
      key: 'others',
      columns: [
        {
          title: 'Others',
          main: true,
          dataIndex: 'defintion_name',
          logo: 'global',
          key: 'others',
        },
        {
          title: 'Action name',
          dataIndex: 'action_name',
          main: false,
          key: 'Action_Name',
        },
        {
          title: 'Occured',
          dataIndex: 'occured',
          main: false,
          subText: 'Last 6 hours',
          key: 'occured',
        },
      ],
      contents: [
        {
          name: 'Auth Manager',
          items: [
            {
              name: 'info',
              contents: [
                {
                  name: 'info',
                  type: 'switch',
                },
                {
                  name: '',
                  type: 'dropDown',
                  options: [
                    {
                      name: 'Default',
                      value: 'default',
                    },
                    {
                      name: 'Send Email to Support',
                      value: 'email',
                    },
                  ],
                },
                {
                  name: '',
                  type: 'histogram',
                },
              ],
            },
            {
              name: 'notice',
              contents: [
                {
                  name: 'notice',
                  type: 'switch',
                },
                {
                  name: '',
                  type: 'dropDown',
                  options: [
                    {
                      name: 'Default',
                      value: 'default',
                    },
                    {
                      name: 'Send Email to Support',
                      value: 'email',
                    },
                  ],
                },
                {
                  name: '',
                  type: 'histogram',
                },
              ],
            },
            {
              name: 'warning',
              contents: [
                {
                  name: 'warning',
                  type: 'switch',
                },
                {
                  name: '',
                  type: 'dropDown',
                  options: [
                    {
                      name: 'Default',
                      value: 'default',
                    },
                    {
                      name: 'Send Email to Support',
                      value: 'email',
                    },
                  ],
                },
                {
                  name: '',
                  type: 'histogram',
                },
              ],
            },
            {
              name: 'error',
              contents: [
                {
                  name: 'error',
                  type: 'switch',
                },
                {
                  name: '',
                  type: 'dropDown',
                  options: [
                    {
                      name: 'Default',
                      value: 'default',
                    },
                    {
                      name: 'Send Email to Support',
                      value: 'email',
                    },
                  ],
                },
                {
                  name: '',
                  type: 'histogram',
                },
              ],
            },
          ],
        },
        {
          name: 'Failsafe Service',
          items: [
            {
              name: 'info',
              contents: [
                {
                  name: 'info',
                  type: 'switch',
                },
                {
                  name: '',
                  type: 'dropDown',
                  options: [
                    {
                      name: 'Default',
                      value: 'default',
                    },
                    {
                      name: 'Send Email to Support',
                      value: 'email',
                    },
                  ],
                },
                {
                  name: '',
                  type: 'histogram',
                },
              ],
            },
            {
              name: 'notice',
              contents: [
                {
                  name: 'notice',
                  type: 'switch',
                },
                {
                  name: '',
                  type: 'dropDown',
                  options: [
                    {
                      name: 'Default',
                      value: 'default',
                    },
                    {
                      name: 'Send Email to Support',
                      value: 'email',
                    },
                  ],
                },
                {
                  name: '',
                  type: 'histogram',
                },
              ],
            },
            {
              name: 'warning',
              contents: [
                {
                  name: 'warning',
                  type: 'switch',
                },
                {
                  name: '',
                  type: 'dropDown',
                  options: [
                    {
                      name: 'Default',
                      value: 'default',
                    },
                    {
                      name: 'Send Email to Support',
                      value: 'email',
                    },
                  ],
                },
                {
                  name: '',
                  type: 'histogram',
                },
              ],
            },
            {
              name: 'error',
              contents: [
                {
                  name: 'error',
                  type: 'switch',
                },
                {
                  name: '',
                  type: 'dropDown',
                  options: [
                    {
                      name: 'Default',
                      value: 'default',
                    },
                    {
                      name: 'Send Email to Support',
                      value: 'email',
                    },
                  ],
                },
                {
                  name: '',
                  type: 'histogram',
                },
              ],
            },
          ],
        },
      ],
    },
  ]
  HELPSUPPORT = [
    {
      name: 'Product Documentation',
      logo: 'book',
      func: 'prdDocumentation',
      helpUrl:
        'http://docs.hc.a10networks.com/' + parameters.VERSION_NUMBER,
    },
    {
      name: 'Product Demos',
      logo: 'desktop',
      func: 'prdDemo',
      helpUrl:
        'https://www.a10networks.com/resources?content_type=Product%20Demos',
    },
    {
      name: 'Technical Articles',
      logo: 'file-text',
      func: 'techArticles',
      helpUrl: 'https://www.a10networks.com/resources/articles',
    },
    {
      name: 'Video Tutorials',
      logo: 'video-camera',
      func: 'vidTutorial',
      helpUrl: 'https://www.youtube.com/channel/UCZLvVjyfoRGgoWfZL49eWEw',
    },
    {
      name: 'White Papers',
      logo: 'copy',
      func: 'whitePaper',
      helpUrl:
        'https://www.a10networks.com/resources?content_type=White%20Papers',
    },
    {
      name: 'Create Ticket',
      logo: 'file-add',
      func: 'createTicket',
      helpUrl:
        'http://portal.cloud-support.a10networks.com/support/tickets/new',
    },
    {
      name: 'Chat Support',
      logo: 'message',
      func: 'chatSupport',
      helpUrl:
        'http://portal.cloud-support.a10networks.com/support/tickets/new',
    },
    {
      name: 'About',
      logo: 'info-circle-o',
      func: 'about',
    },
  ]
}
export default Configs
