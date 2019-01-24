export default {
  'tenant-list': [
    {
      name: 'harmony.c2933756-d2ff-11e8-ac41-001fa001daf0',
      uuid: '158930e8-dd5d-11e8-9a98-62371b11a8cd',
      'logical-cluster-list': [
        {
          name: '45B8ABF84DF0223EDD5C0514AB1601305DA84B63.harmony',
          'physical-cluster-list': [
            {
              cluster: '45B8ABF84DF0223EDD5C0514AB1601305DA84B63',
              partition: 'harmony',
            },
          ],
          uuid: '15d23edc-dd5d-11e8-9a98-62371b11a8cd',
        },
      ],
      'app-svc-list': [
        {
          name: 'vs1',
          'app-svc-type': 'adc',
          'logical-cluster': '45B8ABF84DF0223EDD5C0514AB1601305DA84B63.harmony',
          vport: {
            'obj-references': [
              {
                'port-number': 80,
                protocol: 'http',
                uuid: '730155aa-862f-11e8-942d-001fa001daf0',
                'a10-url': '/hpcapi/v3/slb/virtual-server/vs1/port/80+http',
              },
            ],
            'obj-refcnt': 1,
            'obj-class': 'slb.virtual-server.port',
          },
          vip: {
            'obj-references': [
              {
                name: 'vs1',
                uuid: '717d8604-862f-11e8-942d-001fa001daf0',
                'a10-url': '/hpcapi/v3/slb/virtual-server/vs1',
              },
            ],
            'obj-refcnt': 1,
            'obj-class': 'slb.virtual-server',
          },
          uuid: '371632ec-dd5d-11e8-9a98-62371b11a8cd',
          'a10-url':
            '/hpcapi/v3/provider/root/tenant/harmony.c2933756-d2ff-11e8-ac41-001fa001daf0/app-svc/vs1',
        },
      ],
      'shared-object': {
        'aflex-list': [
          {
            name: 'test',
            type: 'text/plain',
            uuid: '33a96e76-dd5d-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/harmony.c2933756-d2ff-11e8-ac41-001fa001daf0/shared-object/aflex/test',
          },
          {
            name: 'raunak',
            type: 'text/plain',
            uuid: '33dbfe90-dd5d-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/harmony.c2933756-d2ff-11e8-ac41-001fa001daf0/shared-object/aflex/raunak',
          },
          {
            name: 'aFlexTeMp',
            type: 'text/plain',
            uuid: '3400f722-dd5d-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/harmony.c2933756-d2ff-11e8-ac41-001fa001daf0/shared-object/aflex/aFlexTeMp',
          },
        ],
        'ssl-cert-list': [
          {
            name: 'raunak',
            type: 'text/plain',
            uuid: '3562197a-dd5d-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/harmony.c2933756-d2ff-11e8-ac41-001fa001daf0/shared-object/ssl-cert/raunak',
          },
        ],
        'ssl-key-list': [
          {
            name: 'raunak',
            type: 'text/plain',
            uuid: '358d4d66-dd5d-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/harmony.c2933756-d2ff-11e8-ac41-001fa001daf0/shared-object/ssl-key/raunak',
          },
        ],
        'a10-url':
          '/hpcapi/v3/provider/root/tenant/harmony.c2933756-d2ff-11e8-ac41-001fa001daf0/shared-object',
      },
      'a10-url':
        '/hpcapi/v3/provider/root/tenant/harmony.c2933756-d2ff-11e8-ac41-001fa001daf0',
    },
    {
      name: 'Tenant1',
      description: 'Desc',
      uuid: 'b7b9e13c-d91b-11e8-9a98-62371b11a8cd',
      'logical-cluster-list': [
        {
          name: '45B8ABF84DF0223EDD5C0514AB1601305DA84B63.test',
          'physical-cluster-list': [
            {
              cluster: '45B8ABF84DF0223EDD5C0514AB1601305DA84B63',
              partition: 'test',
            },
          ],
          uuid: '7e25671a-de6c-11e8-9a98-62371b11a8cd',
        },
        {
          name: 'c1.test',
          'physical-cluster-list': [
            {
              cluster: 'c1',
              partition: 'test',
            },
          ],
          uuid: 'abd3e8f6-dcca-11e8-9a98-62371b11a8cd',
        },
      ],
      'a10-url': '/hpcapi/v3/provider/root/tenant/Tenant1',
    },
    {
      name: 'k1',
      description: '',
      uuid: '7ba05f42-e324-11e8-9a98-62371b11a8cd',
      'a10-url': '/hpcapi/v3/provider/root/tenant/k1',
    },
    {
      name: 'p1.22519f4e-e326-11e8-8cb3-fa163e8a9415',
      uuid: '98876e1c-e328-11e8-9a98-62371b11a8cd',
      'logical-cluster-list': [
        {
          name: '6DBCB4824EC1AD9C57A48D2269A6213FF3B4F5A5.p1',
          uuid: 'eceb2702-e344-11e8-9a98-62371b11a8cd',
        },
        {
          name: 'cluster2.p1',
          uuid: '98a10138-e328-11e8-9a98-62371b11a8cd',
        },
      ],
      'a10-url':
        '/hpcapi/v3/provider/root/tenant/p1.22519f4e-e326-11e8-8cb3-fa163e8a9415',
    },
    {
      name: 'p2.22b06510-e326-11e8-8cb3-fa163e8a9415',
      uuid: '9887720e-e328-11e8-9a98-62371b11a8cd',
      'logical-cluster-list': [
        {
          name: '6DBCB4824EC1AD9C57A48D2269A6213FF3B4F5A5.p2',
          uuid: 'eceb2b80-e344-11e8-9a98-62371b11a8cd',
        },
        {
          name: 'cluster2.p2',
          uuid: '98a10566-e328-11e8-9a98-62371b11a8cd',
        },
      ],
      'a10-url':
        '/hpcapi/v3/provider/root/tenant/p2.22b06510-e326-11e8-8cb3-fa163e8a9415',
    },
    {
      name: 'part1_25.45f29db6-683f-11e8-937c-001fa01072b4',
      uuid: 'efad283a-d897-11e8-9a98-62371b11a8cd',
      'logical-cluster-list': [
        {
          name: 'c1.part1_25',
          'physical-cluster-list': [
            {
              cluster: 'c1',
              partition: 'part1_25',
            },
          ],
          uuid: 'f0064a96-d897-11e8-9a98-62371b11a8cd',
        },
      ],
      'a10-url':
        '/hpcapi/v3/provider/root/tenant/part1_25.45f29db6-683f-11e8-937c-001fa01072b4',
    },
    {
      name: 'shared.45B8ABF84DF0223EDD5C0514AB1601305DA84B63',
      uuid: '159f19d0-dd5d-11e8-9a98-62371b11a8cd',
      'logical-cluster-list': [
        {
          name: '45B8ABF84DF0223EDD5C0514AB1601305DA84B63.shared',
          'physical-cluster-list': [
            {
              cluster: '45B8ABF84DF0223EDD5C0514AB1601305DA84B63',
              partition: 'shared',
            },
          ],
          uuid: '15d243dc-dd5d-11e8-9a98-62371b11a8cd',
        },
      ],
      'app-svc-list': [
        {
          name: 'alak',
          'app-svc-type': 'adc',
          'logical-cluster': '45B8ABF84DF0223EDD5C0514AB1601305DA84B63.shared',
          vport: {
            'obj-references': [
              {
                'port-number': 80,
                protocol: 'http',
                uuid: 'c335813c-d2ff-11e8-ac41-001fa001daf0',
                'a10-url': '/hpcapi/v3/slb/virtual-server/alak/port/80+http',
              },
            ],
            'obj-refcnt': 1,
            'obj-class': 'slb.virtual-server.port',
          },
          vip: {
            'obj-references': [
              {
                name: 'alak',
                uuid: 'c33423b4-d2ff-11e8-ac41-001fa001daf0',
                'a10-url': '/hpcapi/v3/slb/virtual-server/alak',
              },
            ],
            'obj-refcnt': 1,
            'obj-class': 'slb.virtual-server',
          },
          uuid: '37bdca5c-dd5d-11e8-9a98-62371b11a8cd',
          'a10-url':
            '/hpcapi/v3/provider/root/tenant/shared.45B8ABF84DF0223EDD5C0514AB1601305DA84B63/app-svc/alak',
        },
        {
          name: 'vs1',
          'app-svc-type': 'adc',
          'logical-cluster': '45B8ABF84DF0223EDD5C0514AB1601305DA84B63.shared',
          vport: {
            'obj-references': [
              {
                'port-number': 80,
                protocol: 'tcp',
                uuid: 'c3396298-d2ff-11e8-ac41-001fa001daf0',
                'a10-url': '/hpcapi/v3/slb/virtual-server/vs1/port/80+tcp',
              },
              {
                'port-number': 8080,
                protocol: 'http',
                uuid: 'c33a2aca-d2ff-11e8-ac41-001fa001daf0',
                'a10-url': '/hpcapi/v3/slb/virtual-server/vs1/port/8080+http',
              },
            ],
            'obj-refcnt': 2,
            'obj-class': 'slb.virtual-server.port',
          },
          vip: {
            'obj-references': [
              {
                name: 'vs1',
                uuid: 'c33926a2-d2ff-11e8-ac41-001fa001daf0',
                'a10-url': '/hpcapi/v3/slb/virtual-server/vs1',
              },
            ],
            'obj-refcnt': 1,
            'obj-class': 'slb.virtual-server',
          },
          uuid: '37be111a-dd5d-11e8-9a98-62371b11a8cd',
          'a10-url':
            '/hpcapi/v3/provider/root/tenant/shared.45B8ABF84DF0223EDD5C0514AB1601305DA84B63/app-svc/vs1',
        },
        {
          name: 'vs2',
          'app-svc-type': 'adc',
          'logical-cluster': '45B8ABF84DF0223EDD5C0514AB1601305DA84B63.shared',
          vport: {
            'obj-references': [
              {
                'port-number': 80,
                protocol: 'http',
                uuid: 'c344ca16-d2ff-11e8-ac41-001fa001daf0',
                'a10-url': '/hpcapi/v3/slb/virtual-server/vs2/port/80+http',
              },
              {
                'port-number': 443,
                protocol: 'https',
                uuid: 'c3454da6-d2ff-11e8-ac41-001fa001daf0',
                'a10-url': '/hpcapi/v3/slb/virtual-server/vs2/port/443+https',
              },
            ],
            'obj-refcnt': 2,
            'obj-class': 'slb.virtual-server.port',
          },
          vip: {
            'obj-references': [
              {
                name: 'vs2',
                uuid: 'c344a7ca-d2ff-11e8-ac41-001fa001daf0',
                'a10-url': '/hpcapi/v3/slb/virtual-server/vs2',
              },
            ],
            'obj-refcnt': 1,
            'obj-class': 'slb.virtual-server',
          },
          uuid: '37beb7dc-dd5d-11e8-9a98-62371b11a8cd',
          'a10-url':
            '/hpcapi/v3/provider/root/tenant/shared.45B8ABF84DF0223EDD5C0514AB1601305DA84B63/app-svc/vs2',
        },
      ],
      'shared-object': {
        'aflex-list': [
          {
            name: 'raunak-bgp-test',
            type: 'text/plain',
            uuid: '34f96c68-dd5d-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.45B8ABF84DF0223EDD5C0514AB1601305DA84B63/shared-object/aflex/raunak-bgp-test',
          },
          {
            name: 'redirect_rewrite',
            type: 'text/plain',
            uuid: '34fd6624-dd5d-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.45B8ABF84DF0223EDD5C0514AB1601305DA84B63/shared-object/aflex/redirect_rewrite',
          },
          {
            name: 'http_payload_replace',
            type: 'text/plain',
            uuid: '3501c6e2-dd5d-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.45B8ABF84DF0223EDD5C0514AB1601305DA84B63/shared-object/aflex/http_payload_replace',
          },
          {
            name: 'logging_clients',
            type: 'text/plain',
            uuid: '3506db50-dd5d-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.45B8ABF84DF0223EDD5C0514AB1601305DA84B63/shared-object/aflex/logging_clients',
          },
          {
            name: 'redirect3',
            type: 'text/plain',
            uuid: '350a2120-dd5d-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.45B8ABF84DF0223EDD5C0514AB1601305DA84B63/shared-object/aflex/redirect3',
          },
          {
            name: 'test_123',
            type: 'text/plain',
            uuid: '3514e150-dd5d-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.45B8ABF84DF0223EDD5C0514AB1601305DA84B63/shared-object/aflex/test_123',
          },
          {
            name: 'redirect2',
            type: 'text/plain',
            uuid: '35210c1e-dd5d-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.45B8ABF84DF0223EDD5C0514AB1601305DA84B63/shared-object/aflex/redirect2',
          },
          {
            name: 'host_switching',
            type: 'text/plain',
            uuid: '35268cc0-dd5d-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.45B8ABF84DF0223EDD5C0514AB1601305DA84B63/shared-object/aflex/host_switching',
          },
          {
            name: 'raunak',
            type: 'text/plain',
            uuid: '35302a8c-dd5d-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.45B8ABF84DF0223EDD5C0514AB1601305DA84B63/shared-object/aflex/raunak',
          },
          {
            name: 'redirect1',
            type: 'text/plain',
            uuid: '3534cb28-dd5d-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.45B8ABF84DF0223EDD5C0514AB1601305DA84B63/shared-object/aflex/redirect1',
          },
          {
            name: 'aFlexTeMp',
            type: 'text/plain',
            uuid: '3539e586-dd5d-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.45B8ABF84DF0223EDD5C0514AB1601305DA84B63/shared-object/aflex/aFlexTeMp',
          },
          {
            name: 'valid_aflex_script_1',
            type: 'text/plain',
            uuid: '35599278-dd5d-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.45B8ABF84DF0223EDD5C0514AB1601305DA84B63/shared-object/aflex/valid_aflex_script_1',
          },
          {
            name: 'cli_update_rename',
            type: 'text/plain',
            uuid: '355dd752-dd5d-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.45B8ABF84DF0223EDD5C0514AB1601305DA84B63/shared-object/aflex/cli_update_rename',
          },
        ],
        'ssl-cert-list': [
          {
            name: 'test_country',
            type: 'text/plain',
            uuid: '357322ba-dd5d-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.45B8ABF84DF0223EDD5C0514AB1601305DA84B63/shared-object/ssl-cert/test_country',
          },
          {
            name: 'final_cli',
            type: 'text/plain',
            uuid: '3576b074-dd5d-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.45B8ABF84DF0223EDD5C0514AB1601305DA84B63/shared-object/ssl-cert/final_cli',
          },
          {
            name: 'c2',
            type: 'text/plain',
            uuid: '3579aa5e-dd5d-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.45B8ABF84DF0223EDD5C0514AB1601305DA84B63/shared-object/ssl-cert/c2',
          },
          {
            name: 'test_required_2',
            type: 'text/plain',
            uuid: '357cbe56-dd5d-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.45B8ABF84DF0223EDD5C0514AB1601305DA84B63/shared-object/ssl-cert/test_required_2',
          },
          {
            name: 'test-222a',
            type: 'text/plain',
            uuid: '3580aa84-dd5d-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.45B8ABF84DF0223EDD5C0514AB1601305DA84B63/shared-object/ssl-cert/test-222a',
          },
          {
            name: 'test12',
            type: 'text/plain',
            uuid: '3583a93c-dd5d-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.45B8ABF84DF0223EDD5C0514AB1601305DA84B63/shared-object/ssl-cert/test12',
          },
          {
            name: 'test_csr',
            type: 'text/plain',
            uuid: '3586d5f8-dd5d-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.45B8ABF84DF0223EDD5C0514AB1601305DA84B63/shared-object/ssl-cert/test_csr',
          },
          {
            name: 'r1',
            type: 'text/plain',
            uuid: '3589c8c6-dd5d-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.45B8ABF84DF0223EDD5C0514AB1601305DA84B63/shared-object/ssl-cert/r1',
          },
        ],
        'ssl-ca-list': [
          {
            name: 'default_ca_bundle',
            type: 'text/plain',
            uuid: '35c671d6-dd5d-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.45B8ABF84DF0223EDD5C0514AB1601305DA84B63/shared-object/ssl-ca/default_ca_bundle',
          },
        ],
        'ssl-key-list': [
          {
            name: 'test.cer',
            type: 'text/plain',
            uuid: '3599fe08-dd5d-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.45B8ABF84DF0223EDD5C0514AB1601305DA84B63/shared-object/ssl-key/test.cer',
          },
          {
            name: 'test_cert_cli',
            type: 'text/plain',
            uuid: '359de4e6-dd5d-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.45B8ABF84DF0223EDD5C0514AB1601305DA84B63/shared-object/ssl-key/test_cert_cli',
          },
          {
            name: 'test_country',
            type: 'text/plain',
            uuid: '35a1cc1e-dd5d-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.45B8ABF84DF0223EDD5C0514AB1601305DA84B63/shared-object/ssl-key/test_country',
          },
          {
            name: 'final_cli',
            type: 'text/plain',
            uuid: '35a5dc28-dd5d-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.45B8ABF84DF0223EDD5C0514AB1601305DA84B63/shared-object/ssl-key/final_cli',
          },
          {
            name: 'test1',
            type: 'text/plain',
            uuid: '35a9796e-dd5d-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.45B8ABF84DF0223EDD5C0514AB1601305DA84B63/shared-object/ssl-key/test1',
          },
          {
            name: 'c2',
            type: 'text/plain',
            uuid: '35acce84-dd5d-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.45B8ABF84DF0223EDD5C0514AB1601305DA84B63/shared-object/ssl-key/c2',
          },
          {
            name: 'test_required_2',
            type: 'text/plain',
            uuid: '35b007ac-dd5d-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.45B8ABF84DF0223EDD5C0514AB1601305DA84B63/shared-object/ssl-key/test_required_2',
          },
          {
            name: 'test-222a',
            type: 'text/plain',
            uuid: '35b32450-dd5d-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.45B8ABF84DF0223EDD5C0514AB1601305DA84B63/shared-object/ssl-key/test-222a',
          },
          {
            name: 'test12',
            type: 'text/plain',
            uuid: '35b8a466-dd5d-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.45B8ABF84DF0223EDD5C0514AB1601305DA84B63/shared-object/ssl-key/test12',
          },
          {
            name: 'test_csr',
            type: 'text/plain',
            uuid: '35bc6420-dd5d-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.45B8ABF84DF0223EDD5C0514AB1601305DA84B63/shared-object/ssl-key/test_csr',
          },
          {
            name: 'r1',
            type: 'text/plain',
            uuid: '35c2160e-dd5d-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.45B8ABF84DF0223EDD5C0514AB1601305DA84B63/shared-object/ssl-key/r1',
          },
        ],
        'ssl-crl-list': [
          {
            name: 'ssl-crl-0011',
            type: 'text/plain',
            uuid: '35cd2e22-dd5d-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.45B8ABF84DF0223EDD5C0514AB1601305DA84B63/shared-object/ssl-crl/ssl-crl-0011',
          },
        ],
        'ssl-csr-list': [
          {
            name: 'test_csr',
            type: 'text/plain',
            uuid: '35c9b314-dd5d-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.45B8ABF84DF0223EDD5C0514AB1601305DA84B63/shared-object/ssl-csr/test_csr',
          },
        ],
        'a10-url':
          '/hpcapi/v3/provider/root/tenant/shared.45B8ABF84DF0223EDD5C0514AB1601305DA84B63/shared-object',
      },
      'a10-url':
        '/hpcapi/v3/provider/root/tenant/shared.45B8ABF84DF0223EDD5C0514AB1601305DA84B63',
    },
    {
      name: 'shared.6DBCB4824EC1AD9C57A48D2269A6213FF3B4F5A5',
      uuid: '988775c4-e328-11e8-9a98-62371b11a8cd',
      'logical-cluster-list': [
        {
          name: '6DBCB4824EC1AD9C57A48D2269A6213FF3B4F5A5.shared',
          uuid: 'eceb2fcc-e344-11e8-9a98-62371b11a8cd',
        },
        {
          name: 'cluster2.shared',
          uuid: '98a10976-e328-11e8-9a98-62371b11a8cd',
        },
      ],
      'shared-object': {
        'aflex-list': [
          {
            name: 'redirect2',
            type: 'text/plain',
            uuid: 'a0390ada-e328-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.6DBCB4824EC1AD9C57A48D2269A6213FF3B4F5A5/shared-object/aflex/redirect2',
          },
          {
            name: 'redirect_rewrite',
            type: 'text/plain',
            uuid: 'a03bdf6c-e328-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.6DBCB4824EC1AD9C57A48D2269A6213FF3B4F5A5/shared-object/aflex/redirect_rewrite',
          },
          {
            name: 'logging_clients',
            type: 'text/plain',
            uuid: 'a03e6fac-e328-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.6DBCB4824EC1AD9C57A48D2269A6213FF3B4F5A5/shared-object/aflex/logging_clients',
          },
          {
            name: 'host_switching',
            type: 'text/plain',
            uuid: 'a0418142-e328-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.6DBCB4824EC1AD9C57A48D2269A6213FF3B4F5A5/shared-object/aflex/host_switching',
          },
          {
            name: 'redirect1',
            type: 'text/plain',
            uuid: 'a0440ff2-e328-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.6DBCB4824EC1AD9C57A48D2269A6213FF3B4F5A5/shared-object/aflex/redirect1',
          },
          {
            name: 'http_payload_replace',
            type: 'text/plain',
            uuid: 'a046a532-e328-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.6DBCB4824EC1AD9C57A48D2269A6213FF3B4F5A5/shared-object/aflex/http_payload_replace',
          },
        ],
        'ssl-ca-list': [
          {
            name: 'default_ca_bundle',
            type: 'text/plain',
            uuid: 'a04a62c6-e328-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.6DBCB4824EC1AD9C57A48D2269A6213FF3B4F5A5/shared-object/ssl-ca/default_ca_bundle',
          },
        ],
        'a10-url':
          '/hpcapi/v3/provider/root/tenant/shared.6DBCB4824EC1AD9C57A48D2269A6213FF3B4F5A5/shared-object',
      },
      'a10-url':
        '/hpcapi/v3/provider/root/tenant/shared.6DBCB4824EC1AD9C57A48D2269A6213FF3B4F5A5',
    },
    {
      name: 'shared.725C667450C6672638780B36304C456202F427CA',
      uuid: 'efd6550c-d897-11e8-9a98-62371b11a8cd',
      'logical-cluster-list': [
        {
          name: 'c1.p2',
          'physical-cluster-list': [
            {
              cluster: 'c1',
              partition: 'p2',
            },
          ],
          uuid: 'eac8ff36-dcea-11e8-9a98-62371b11a8cd',
        },
        {
          name: 'c1.shared',
          'physical-cluster-list': [
            {
              cluster: 'c1',
              partition: 'shared',
            },
          ],
          uuid: 'f006531a-d897-11e8-9a98-62371b11a8cd',
        },
      ],
      'app-svc-list': [
        {
          name: 'cwy1',
          'app-svc-type': 'adc',
          'logical-cluster': 'c1.shared',
          vport: {
            'obj-references': [
              {
                'port-number': 80,
                protocol: 'http',
                uuid: 'b39b6364-d254-11e8-b3cb-001fa01072b4',
                'a10-url': '/hpcapi/v3/slb/virtual-server/cwy1/port/80+http',
              },
            ],
            'obj-refcnt': 1,
            'obj-class': 'slb.virtual-server.port',
          },
          vip: {
            'obj-references': [
              {
                name: 'cwy1',
                uuid: 'd7d14d82-ab32-11e8-8a35-e5f38a2cfeaf',
                'a10-url': '/hpcapi/v3/slb/virtual-server/cwy1',
              },
            ],
            'obj-refcnt': 1,
            'obj-class': 'slb.virtual-server',
          },
          uuid: '2a0e99fa-d898-11e8-9a98-62371b11a8cd',
          'a10-url':
            '/hpcapi/v3/provider/root/tenant/shared.725C667450C6672638780B36304C456202F427CA/app-svc/cwy1',
        },
        {
          name: 'vip124',
          'app-svc-type': 'adc',
          'logical-cluster': 'c1.shared',
          vport: {
            'obj-references': [
              {
                'port-number': 80,
                protocol: 'http',
                uuid: 'c3cc7ce0-087a-11e8-9f6a-e3b3ca20502d',
                'a10-url': '/hpcapi/v3/slb/virtual-server/vip124/port/80+http',
              },
            ],
            'obj-refcnt': 1,
            'obj-class': 'slb.virtual-server.port',
          },
          vip: {
            'obj-references': [
              {
                name: 'vip124',
                uuid: 'bf698990-087a-11e8-9f6a-e3b3ca20502d',
                'a10-url': '/hpcapi/v3/slb/virtual-server/vip124',
              },
            ],
            'obj-refcnt': 1,
            'obj-class': 'slb.virtual-server',
          },
          uuid: '2a0edeba-d898-11e8-9a98-62371b11a8cd',
          'a10-url':
            '/hpcapi/v3/provider/root/tenant/shared.725C667450C6672638780B36304C456202F427CA/app-svc/vip124',
        },
        {
          name: 'vip124_ipv6',
          'app-svc-type': 'adc',
          'logical-cluster': 'c1.shared',
          vport: {
            'obj-references': [
              {
                'port-number': 80,
                protocol: 'tcp',
                uuid: '6d63d4ee-6dc3-11e8-a0fa-35185186088e',
                'a10-url':
                  '/hpcapi/v3/slb/virtual-server/vip124_ipv6/port/80+tcp',
              },
            ],
            'obj-refcnt': 1,
            'obj-class': 'slb.virtual-server.port',
          },
          vip: {
            'obj-references': [
              {
                name: 'vip124_ipv6',
                uuid: '3360468a-1808-11e8-a4ed-001fa01072b4',
                'a10-url': '/hpcapi/v3/slb/virtual-server/vip124_ipv6',
              },
            ],
            'obj-refcnt': 1,
            'obj-class': 'slb.virtual-server',
          },
          uuid: '2a0f6b1e-d898-11e8-9a98-62371b11a8cd',
          'a10-url':
            '/hpcapi/v3/provider/root/tenant/shared.725C667450C6672638780B36304C456202F427CA/app-svc/vip124_ipv6',
        },
        {
          name: 'vip161',
          'app-svc-type': 'adc',
          'logical-cluster': 'c1.shared',
          vport: {
            'obj-references': [
              {
                'port-number': 80,
                protocol: 'http',
                uuid: '99256d0a-dc6d-11e7-bf8b-858203831d02',
                'a10-url': '/hpcapi/v3/slb/virtual-server/vip161/port/80+http',
              },
              {
                'port-number': 443,
                protocol: 'https',
                uuid: '0e77a04c-347e-11e8-b341-712a8ac6974c',
                'a10-url':
                  '/hpcapi/v3/slb/virtual-server/vip161/port/443+https',
              },
            ],
            'obj-refcnt': 2,
            'obj-class': 'slb.virtual-server.port',
          },
          vip: {
            'obj-references': [
              {
                name: 'vip161',
                uuid: '95383c68-dc6d-11e7-bf8b-858203831d02',
                'a10-url': '/hpcapi/v3/slb/virtual-server/vip161',
              },
            ],
            'obj-refcnt': 1,
            'obj-class': 'slb.virtual-server',
          },
          uuid: '2a0fb916-d898-11e8-9a98-62371b11a8cd',
          'a10-url':
            '/hpcapi/v3/provider/root/tenant/shared.725C667450C6672638780B36304C456202F427CA/app-svc/vip161',
        },
        {
          name: 'vip168',
          'app-svc-type': 'adc',
          'logical-cluster': 'c1.shared',
          vport: {
            'obj-references': [
              {
                'port-number': 80,
                protocol: 'tcp',
                uuid: 'bf03b4d2-6dc2-11e8-a0fa-35185186088e',
                'a10-url': '/hpcapi/v3/slb/virtual-server/vip168/port/80+tcp',
              },
              {
                'port-number': 443,
                protocol: 'tcp',
                uuid: 'c7c545b6-6f59-11e8-91cc-001fa01072b4',
                'a10-url': '/hpcapi/v3/slb/virtual-server/vip168/port/443+tcp',
              },
            ],
            'obj-refcnt': 2,
            'obj-class': 'slb.virtual-server.port',
          },
          vip: {
            'obj-references': [
              {
                name: 'vip168',
                uuid: '8eca6ca0-06b8-11e8-ac9e-0b74eca5e711',
                'a10-url': '/hpcapi/v3/slb/virtual-server/vip168',
              },
            ],
            'obj-refcnt': 1,
            'obj-class': 'slb.virtual-server',
          },
          uuid: '2a106f64-d898-11e8-9a98-62371b11a8cd',
          'a10-url':
            '/hpcapi/v3/provider/root/tenant/shared.725C667450C6672638780B36304C456202F427CA/app-svc/vip168',
        },
        {
          name: 'vip169',
          'app-svc-type': 'adc',
          'logical-cluster': 'c1.shared',
          vport: {
            'obj-references': [
              {
                'port-number': 80,
                protocol: 'tcp',
                uuid: 'd1d6a422-d7ba-11e8-a5a1-001fa01072b4',
                'a10-url': '/hpcapi/v3/slb/virtual-server/vip169/port/80+tcp',
              },
            ],
            'obj-refcnt': 1,
            'obj-class': 'slb.virtual-server.port',
          },
          vip: {
            'obj-references': [
              {
                name: 'vip169',
                uuid: '3e0194c2-d6d1-11e7-a8d0-d586d108c55f',
                'a10-url': '/hpcapi/v3/slb/virtual-server/vip169',
              },
            ],
            'obj-refcnt': 1,
            'obj-class': 'slb.virtual-server',
          },
          uuid: '2a10f150-d898-11e8-9a98-62371b11a8cd',
          'a10-url':
            '/hpcapi/v3/provider/root/tenant/shared.725C667450C6672638780B36304C456202F427CA/app-svc/vip169',
        },
        {
          name: 'vip225',
          'app-svc-type': 'adc',
          'logical-cluster': 'c1.shared',
          vport: {
            'obj-references': [
              {
                'port-number': 443,
                protocol: 'https',
                uuid: '26cdeaca-6abb-11e8-8ea7-001fa01072b4',
                'a10-url':
                  '/hpcapi/v3/slb/virtual-server/vip225/port/443+https',
              },
            ],
            'obj-refcnt': 1,
            'obj-class': 'slb.virtual-server.port',
          },
          vip: {
            'obj-references': [
              {
                name: 'vip225',
                uuid: '1b37d04a-6abb-11e8-8ea7-001fa01072b4',
                'a10-url': '/hpcapi/v3/slb/virtual-server/vip225',
              },
            ],
            'obj-refcnt': 1,
            'obj-class': 'slb.virtual-server',
          },
          uuid: '2a114e34-d898-11e8-9a98-62371b11a8cd',
          'a10-url':
            '/hpcapi/v3/provider/root/tenant/shared.725C667450C6672638780B36304C456202F427CA/app-svc/vip225',
        },
        {
          name: 'vip226',
          'app-svc-type': 'adc',
          'logical-cluster': 'c1.shared',
          vport: {
            'obj-references': [
              {
                'port-number': 443,
                protocol: 'tcp',
                uuid: 'cf39b738-734f-11e8-8fba-d98901865f48',
                'a10-url': '/hpcapi/v3/slb/virtual-server/vip226/port/443+tcp',
              },
            ],
            'obj-refcnt': 1,
            'obj-class': 'slb.virtual-server.port',
          },
          vip: {
            'obj-references': [
              {
                name: 'vip226',
                uuid: '4e214eae-734f-11e8-8fba-d98901865f48',
                'a10-url': '/hpcapi/v3/slb/virtual-server/vip226',
              },
            ],
            'obj-refcnt': 1,
            'obj-class': 'slb.virtual-server',
          },
          uuid: '2a11e862-d898-11e8-9a98-62371b11a8cd',
          'a10-url':
            '/hpcapi/v3/provider/root/tenant/shared.725C667450C6672638780B36304C456202F427CA/app-svc/vip226',
        },
        {
          name: 'vip25125',
          'app-svc-type': 'adc',
          'logical-cluster': 'c1.shared',
          vport: {
            'obj-references': [
              {
                'port-number': 80,
                protocol: 'tcp',
                uuid: 'f79b0534-7362-11e8-b43f-001fa01072b4',
                'a10-url': '/hpcapi/v3/slb/virtual-server/vip25125/port/80+tcp',
              },
              {
                'port-number': 443,
                protocol: 'tcp',
                uuid: 'f7ce4e1c-7362-11e8-b43f-001fa01072b4',
                'a10-url':
                  '/hpcapi/v3/slb/virtual-server/vip25125/port/443+tcp',
              },
            ],
            'obj-refcnt': 2,
            'obj-class': 'slb.virtual-server.port',
          },
          vip: {
            'obj-references': [
              {
                name: 'vip25125',
                uuid: 'f28012c4-7362-11e8-b43f-001fa01072b4',
                'a10-url': '/hpcapi/v3/slb/virtual-server/vip25125',
              },
            ],
            'obj-refcnt': 1,
            'obj-class': 'slb.virtual-server',
          },
          uuid: '2a1237c2-d898-11e8-9a98-62371b11a8cd',
          'a10-url':
            '/hpcapi/v3/provider/root/tenant/shared.725C667450C6672638780B36304C456202F427CA/app-svc/vip25125',
        },
      ],
      'app-svc-group-list': [
        {
          name: 'asg1',
          'svc-list': [
            {
              'app-svc': 'cwy1',
              'app-svc-type': 'adc',
            },
            {
              'app-svc': 'vip25125',
              'app-svc-type': 'adc',
            },
          ],
          vport: {
            'obj-references': [
              {
                'port-number': 80,
                protocol: 'http',
                uuid: 'b39b6364-d254-11e8-b3cb-001fa01072b4',
                'a10-url': '/hpcapi/v3/slb/virtual-server/cwy1/port/80+http',
              },
              {
                'port-number': 80,
                protocol: 'tcp',
                uuid: 'f79b0534-7362-11e8-b43f-001fa01072b4',
                'a10-url': '/hpcapi/v3/slb/virtual-server/vip25125/port/80+tcp',
              },
              {
                'port-number': 443,
                protocol: 'tcp',
                uuid: 'f7ce4e1c-7362-11e8-b43f-001fa01072b4',
                'a10-url':
                  '/hpcapi/v3/slb/virtual-server/vip25125/port/443+tcp',
              },
            ],
            'obj-refcnt': 3,
            'obj-class': 'slb.virtual-server.port',
          },
          vip: {
            'obj-references': [
              {
                name: 'cwy1',
                uuid: 'd7d14d82-ab32-11e8-8a35-e5f38a2cfeaf',
                'a10-url': '/hpcapi/v3/slb/virtual-server/cwy1',
              },
              {
                name: 'vip25125',
                uuid: 'f28012c4-7362-11e8-b43f-001fa01072b4',
                'a10-url': '/hpcapi/v3/slb/virtual-server/vip25125',
              },
            ],
            'obj-refcnt': 2,
            'obj-class': 'slb.virtual-server',
          },
          'logical-cluster': {
            'obj-refcnt': 0,
            'obj-class': 'provider.tenant.logical-cluster',
          },
          uuid: '80ef5c04-e159-11e8-9a98-62371b11a8cd',
          'a10-url':
            '/hpcapi/v3/provider/root/tenant/shared.725C667450C6672638780B36304C456202F427CA/app-svc-group/asg1',
        },
      ],
      'shared-object': {
        'aflex-list': [
          {
            name: 'redirect2',
            type: 'text/plain',
            uuid: '27827fee-d898-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.725C667450C6672638780B36304C456202F427CA/shared-object/aflex/redirect2',
          },
          {
            name: 'http-test1',
            type: 'text/plain',
            uuid: '2785828e-d898-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.725C667450C6672638780B36304C456202F427CA/shared-object/aflex/http-test1',
          },
          {
            name: 'aGalaxy50-Aflex-021',
            type: 'text/plain',
            uuid: '278d5630-d898-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.725C667450C6672638780B36304C456202F427CA/shared-object/aflex/aGalaxy50-Aflex-021',
          },
          {
            name: 'logging_clients',
            type: 'text/plain',
            uuid: '27912918-d898-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.725C667450C6672638780B36304C456202F427CA/shared-object/aflex/logging_clients',
          },
          {
            name: 'host_switching',
            type: 'text/plain',
            uuid: '27938442-d898-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.725C667450C6672638780B36304C456202F427CA/shared-object/aflex/host_switching',
          },
          {
            name: 'http_payload_replace',
            type: 'text/plain',
            uuid: '279777aa-d898-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.725C667450C6672638780B36304C456202F427CA/shared-object/aflex/http_payload_replace',
          },
          {
            name: 'redirect_rewrite',
            type: 'text/plain',
            uuid: '2799bfba-d898-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.725C667450C6672638780B36304C456202F427CA/shared-object/aflex/redirect_rewrite',
          },
          {
            name: 'aGalaxy50-Aflex-003',
            type: 'text/plain',
            uuid: '279bf780-d898-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.725C667450C6672638780B36304C456202F427CA/shared-object/aflex/aGalaxy50-Aflex-003',
          },
          {
            name: 'aflex_content_replace',
            type: 'text/plain',
            uuid: '279e368a-d898-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.725C667450C6672638780B36304C456202F427CA/shared-object/aflex/aflex_content_replace',
          },
          {
            name: 'aflex001',
            type: 'text/plain',
            uuid: '27a1041e-d898-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.725C667450C6672638780B36304C456202F427CA/shared-object/aflex/aflex001',
          },
          {
            name: 'script_drop',
            type: 'text/plain',
            uuid: '27a35a2a-d898-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.725C667450C6672638780B36304C456202F427CA/shared-object/aflex/script_drop',
          },
          {
            name: 'header_insert',
            type: 'text/plain',
            uuid: '27a99d9a-d898-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.725C667450C6672638780B36304C456202F427CA/shared-object/aflex/header_insert',
          },
          {
            name: 'aflex_template_20160118_03',
            type: 'text/plain',
            uuid: '27abf734-d898-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.725C667450C6672638780B36304C456202F427CA/shared-object/aflex/aflex_template_20160118_03',
          },
          {
            name: 'script1',
            type: 'text/plain',
            uuid: '27ae35e4-d898-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.725C667450C6672638780B36304C456202F427CA/shared-object/aflex/script1',
          },
          {
            name: 'aflex002',
            type: 'text/plain',
            uuid: '27b0d6aa-d898-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.725C667450C6672638780B36304C456202F427CA/shared-object/aflex/aflex002',
          },
          {
            name: 'script_codes',
            type: 'text/plain',
            uuid: '27b32d4c-d898-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.725C667450C6672638780B36304C456202F427CA/shared-object/aflex/script_codes',
          },
          {
            name: 'default',
            type: 'text/plain',
            uuid: '27b5e3d4-d898-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.725C667450C6672638780B36304C456202F427CA/shared-object/aflex/default',
          },
          {
            name: 'redirect1',
            type: 'text/plain',
            uuid: '27b900dc-d898-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.725C667450C6672638780B36304C456202F427CA/shared-object/aflex/redirect1',
          },
          {
            name: 'script_down',
            type: 'text/plain',
            uuid: '27bc053e-d898-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.725C667450C6672638780B36304C456202F427CA/shared-object/aflex/script_down',
          },
          {
            name: 'mysql',
            type: 'text/plain',
            uuid: '27bfcdcc-d898-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.725C667450C6672638780B36304C456202F427CA/shared-object/aflex/mysql',
          },
          {
            name: 'v6.mysql',
            type: 'text/plain',
            uuid: '27c2467e-d898-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.725C667450C6672638780B36304C456202F427CA/shared-object/aflex/v6.mysql',
          },
        ],
        'ssl-cert-list': [
          {
            name: 'aGalaxy50-Cert-003',
            type: 'text/plain',
            uuid: '27c4ce8a-d898-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.725C667450C6672638780B36304C456202F427CA/shared-object/ssl-cert/aGalaxy50-Cert-003',
          },
          {
            name: 'clicert',
            type: 'text/plain',
            uuid: '27c72662-d898-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.725C667450C6672638780B36304C456202F427CA/shared-object/ssl-cert/clicert',
          },
          {
            name: 'default-1',
            type: 'text/plain',
            uuid: '27c97066-d898-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.725C667450C6672638780B36304C456202F427CA/shared-object/ssl-cert/default-1',
          },
          {
            name: 'cert-003',
            type: 'text/plain',
            uuid: '27cc1b4a-d898-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.725C667450C6672638780B36304C456202F427CA/shared-object/ssl-cert/cert-003',
          },
          {
            name: 'cert_template_20160118_1',
            type: 'text/plain',
            uuid: '27d0322a-d898-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.725C667450C6672638780B36304C456202F427CA/shared-object/ssl-cert/cert_template_20160118_1',
          },
          {
            name: 'c1',
            type: 'text/plain',
            uuid: '27d2742c-d898-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.725C667450C6672638780B36304C456202F427CA/shared-object/ssl-cert/c1',
          },
          {
            name: 'cssl-2048',
            type: 'text/plain',
            uuid: '27d4b926-d898-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.725C667450C6672638780B36304C456202F427CA/shared-object/ssl-cert/cssl-2048',
          },
          {
            name: 'aGalaxy-SSL_CERT_AAJ',
            type: 'text/plain',
            uuid: '27d7a12c-d898-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.725C667450C6672638780B36304C456202F427CA/shared-object/ssl-cert/aGalaxy-SSL_CERT_AAJ',
          },
          {
            name: 'certdaniel',
            type: 'text/plain',
            uuid: '27dd7052-d898-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.725C667450C6672638780B36304C456202F427CA/shared-object/ssl-cert/certdaniel',
          },
          {
            name: 'my_sert_1234',
            type: 'text/plain',
            uuid: '27e03bac-d898-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.725C667450C6672638780B36304C456202F427CA/shared-object/ssl-cert/my_sert_1234',
          },
          {
            name: 'ssl-ca-001',
            type: 'text/plain',
            uuid: '27e3450e-d898-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.725C667450C6672638780B36304C456202F427CA/shared-object/ssl-cert/ssl-ca-001',
          },
          {
            name: 'aGalaxy50-Cert-5',
            type: 'text/plain',
            uuid: '27e64c40-d898-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.725C667450C6672638780B36304C456202F427CA/shared-object/ssl-cert/aGalaxy50-Cert-5',
          },
          {
            name: 'hc-frank',
            type: 'text/plain',
            uuid: '27e91934-d898-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.725C667450C6672638780B36304C456202F427CA/shared-object/ssl-cert/hc-frank',
          },
          {
            name: 'cssl-4096',
            type: 'text/plain',
            uuid: '27ec306a-d898-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.725C667450C6672638780B36304C456202F427CA/shared-object/ssl-cert/cssl-4096',
          },
          {
            name: '?p1?cssl-1024',
            type: 'text/plain',
            uuid: '27eea868-d898-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.725C667450C6672638780B36304C456202F427CA/shared-object/ssl-cert/%3Fp1%3Fcssl-1024',
          },
          {
            name: 'cer222333444',
            type: 'text/plain',
            uuid: '27f142d0-d898-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.725C667450C6672638780B36304C456202F427CA/shared-object/ssl-cert/cer222333444',
          },
          {
            name: 'hc-cert',
            type: 'text/plain',
            uuid: '27f3ad4a-d898-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.725C667450C6672638780B36304C456202F427CA/shared-object/ssl-cert/hc-cert',
          },
          {
            name: 'cssl-1024',
            type: 'text/plain',
            uuid: '27f6598c-d898-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.725C667450C6672638780B36304C456202F427CA/shared-object/ssl-cert/cssl-1024',
          },
          {
            name: 'frank1',
            type: 'text/plain',
            uuid: '27f8e03a-d898-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.725C667450C6672638780B36304C456202F427CA/shared-object/ssl-cert/frank1',
          },
          {
            name: 'cert-002',
            type: 'text/plain',
            uuid: '27fb61ac-d898-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.725C667450C6672638780B36304C456202F427CA/shared-object/ssl-cert/cert-002',
          },
          {
            name: 'servercert',
            type: 'text/plain',
            uuid: '27fdb5e2-d898-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.725C667450C6672638780B36304C456202F427CA/shared-object/ssl-cert/servercert',
          },
          {
            name: 'new_frank_cert1',
            type: 'text/plain',
            uuid: '2800147c-d898-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.725C667450C6672638780B36304C456202F427CA/shared-object/ssl-cert/new_frank_cert1',
          },
          {
            name: 'cert2',
            type: 'text/plain',
            uuid: '2802c2ee-d898-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.725C667450C6672638780B36304C456202F427CA/shared-object/ssl-cert/cert2',
          },
          {
            name: 'aGalaxy50-Cert-024',
            type: 'text/plain',
            uuid: '2805528e-d898-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.725C667450C6672638780B36304C456202F427CA/shared-object/ssl-cert/aGalaxy50-Cert-024',
          },
          {
            name: 'cert-001',
            type: 'text/plain',
            uuid: '2808e4bc-d898-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.725C667450C6672638780B36304C456202F427CA/shared-object/ssl-cert/cert-001',
          },
          {
            name: 'test',
            type: 'text/plain',
            uuid: '280d8788-d898-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.725C667450C6672638780B36304C456202F427CA/shared-object/ssl-cert/test',
          },
          {
            name: 'cert1',
            type: 'text/plain',
            uuid: '2810eab8-d898-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.725C667450C6672638780B36304C456202F427CA/shared-object/ssl-cert/cert1',
          },
          {
            name: 'frank1-api',
            type: 'text/plain',
            uuid: '2813cf1c-d898-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.725C667450C6672638780B36304C456202F427CA/shared-object/ssl-cert/frank1-api',
          },
          {
            name: 'cert.pem',
            type: 'text/plain',
            uuid: '2817542a-d898-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.725C667450C6672638780B36304C456202F427CA/shared-object/ssl-cert/cert.pem',
          },
          {
            name: 'certtest',
            type: 'text/plain',
            uuid: '281a8212-d898-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.725C667450C6672638780B36304C456202F427CA/shared-object/ssl-cert/certtest',
          },
        ],
        'ssl-ca-list': [
          {
            name: 'default_ca_bundle',
            type: 'text/plain',
            uuid: '28935d36-d898-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.725C667450C6672638780B36304C456202F427CA/shared-object/ssl-ca/default_ca_bundle',
          },
        ],
        'ssl-key-list': [
          {
            name: 'key1',
            type: 'text/plain',
            uuid: '2822401a-d898-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.725C667450C6672638780B36304C456202F427CA/shared-object/ssl-key/key1',
          },
          {
            name: 'key111222111222',
            type: 'text/plain',
            uuid: '282716a8-d898-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.725C667450C6672638780B36304C456202F427CA/shared-object/ssl-key/key111222111222',
          },
          {
            name: 'aGalaxy50-Key-007',
            type: 'text/plain',
            uuid: '282c3ec6-d898-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.725C667450C6672638780B36304C456202F427CA/shared-object/ssl-key/aGalaxy50-Key-007',
          },
          {
            name: 'key-003',
            type: 'text/plain',
            uuid: '282fb074-d898-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.725C667450C6672638780B36304C456202F427CA/shared-object/ssl-key/key-003',
          },
          {
            name: 'danielkey',
            type: 'text/plain',
            uuid: '28333bb8-d898-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.725C667450C6672638780B36304C456202F427CA/shared-object/ssl-key/danielkey',
          },
          {
            name: 'default-1',
            type: 'text/plain',
            uuid: '2836069a-d898-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.725C667450C6672638780B36304C456202F427CA/shared-object/ssl-key/default-1',
          },
          {
            name: 'key_template_20160725_2_1111',
            type: 'text/plain',
            uuid: '28388f8c-d898-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.725C667450C6672638780B36304C456202F427CA/shared-object/ssl-key/key_template_20160725_2_1111',
          },
          {
            name: 'aGalaxy50-Key-018',
            type: 'text/plain',
            uuid: '283c054a-d898-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.725C667450C6672638780B36304C456202F427CA/shared-object/ssl-key/aGalaxy50-Key-018',
          },
          {
            name: 'c1',
            type: 'text/plain',
            uuid: '2841293a-d898-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.725C667450C6672638780B36304C456202F427CA/shared-object/ssl-key/c1',
          },
          {
            name: 'aGalaxy-SSL-key',
            type: 'text/plain',
            uuid: '2845279c-d898-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.725C667450C6672638780B36304C456202F427CA/shared-object/ssl-key/aGalaxy-SSL-key',
          },
          {
            name: 'cssl-2048',
            type: 'text/plain',
            uuid: '284a3732-d898-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.725C667450C6672638780B36304C456202F427CA/shared-object/ssl-key/cssl-2048',
          },
          {
            name: 'key_template_20160118_00',
            type: 'text/plain',
            uuid: '284f4970-d898-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.725C667450C6672638780B36304C456202F427CA/shared-object/ssl-key/key_template_20160118_00',
          },
          {
            name: 'certdaniel',
            type: 'text/plain',
            uuid: '2852f412-d898-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.725C667450C6672638780B36304C456202F427CA/shared-object/ssl-key/certdaniel',
          },
          {
            name: 'hc-frank',
            type: 'text/plain',
            uuid: '285828f6-d898-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.725C667450C6672638780B36304C456202F427CA/shared-object/ssl-key/hc-frank',
          },
          {
            name: 'key-001',
            type: 'text/plain',
            uuid: '285b7d6c-d898-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.725C667450C6672638780B36304C456202F427CA/shared-object/ssl-key/key-001',
          },
          {
            name: 'cssl-4096',
            type: 'text/plain',
            uuid: '285df0c4-d898-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.725C667450C6672638780B36304C456202F427CA/shared-object/ssl-key/cssl-4096',
          },
          {
            name: 'clikey',
            type: 'text/plain',
            uuid: '28605bc0-d898-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.725C667450C6672638780B36304C456202F427CA/shared-object/ssl-key/clikey',
          },
          {
            name: '?p1?cssl-1024',
            type: 'text/plain',
            uuid: '28630564-d898-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.725C667450C6672638780B36304C456202F427CA/shared-object/ssl-key/%3Fp1%3Fcssl-1024',
          },
          {
            name: 'aGalaxy-SSL-KEY_AAJ',
            type: 'text/plain',
            uuid: '28655e90-d898-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.725C667450C6672638780B36304C456202F427CA/shared-object/ssl-key/aGalaxy-SSL-KEY_AAJ',
          },
          {
            name: 'hc-cert',
            type: 'text/plain',
            uuid: '2867d13e-d898-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.725C667450C6672638780B36304C456202F427CA/shared-object/ssl-key/hc-cert',
          },
          {
            name: 'cssl-1024',
            type: 'text/plain',
            uuid: '286b49cc-d898-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.725C667450C6672638780B36304C456202F427CA/shared-object/ssl-key/cssl-1024',
          },
          {
            name: 'frank1',
            type: 'text/plain',
            uuid: '286e4a28-d898-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.725C667450C6672638780B36304C456202F427CA/shared-object/ssl-key/frank1',
          },
          {
            name: 'key.pem',
            type: 'text/plain',
            uuid: '2871a330-d898-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.725C667450C6672638780B36304C456202F427CA/shared-object/ssl-key/key.pem',
          },
          {
            name: 'key-new-333',
            type: 'text/plain',
            uuid: '287657f4-d898-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.725C667450C6672638780B36304C456202F427CA/shared-object/ssl-key/key-new-333',
          },
          {
            name: 'servercert',
            type: 'text/plain',
            uuid: '287a55ca-d898-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.725C667450C6672638780B36304C456202F427CA/shared-object/ssl-key/servercert',
          },
          {
            name: 'key-002',
            type: 'text/plain',
            uuid: '287de51e-d898-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.725C667450C6672638780B36304C456202F427CA/shared-object/ssl-key/key-002',
          },
          {
            name: 'key_template_20160725_1',
            type: 'text/plain',
            uuid: '2881df0c-d898-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.725C667450C6672638780B36304C456202F427CA/shared-object/ssl-key/key_template_20160725_1',
          },
          {
            name: 'my_key_1234',
            type: 'text/plain',
            uuid: '2885e598-d898-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.725C667450C6672638780B36304C456202F427CA/shared-object/ssl-key/my_key_1234',
          },
          {
            name: 'test',
            type: 'text/plain',
            uuid: '288947d8-d898-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.725C667450C6672638780B36304C456202F427CA/shared-object/ssl-key/test',
          },
          {
            name: 'cert1',
            type: 'text/plain',
            uuid: '288c0234-d898-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.725C667450C6672638780B36304C456202F427CA/shared-object/ssl-key/cert1',
          },
          {
            name: 'certtest',
            type: 'text/plain',
            uuid: '288f9a0c-d898-11e8-9a98-62371b11a8cd',
            'a10-url':
              '/hpcapi/v3/provider/root/tenant/shared.725C667450C6672638780B36304C456202F427CA/shared-object/ssl-key/certtest',
          },
        ],
        'a10-url':
          '/hpcapi/v3/provider/root/tenant/shared.725C667450C6672638780B36304C456202F427CA/shared-object',
      },
      'a10-url':
        '/hpcapi/v3/provider/root/tenant/shared.725C667450C6672638780B36304C456202F427CA',
    },
  ],
}
