export class Data {
    TRIGGERS = [{
        "defintion_name": "amazon_sentbytes_gt_rd",
        "event_def_id": "tenant-RD300",
        "event_name": "rule-definition",
        "event_type": "add",
        "account_id": "askhdj-23423-sdf323",
        "description": "this defines a rule to trigger a callback when sent_bytes gt 1024bytes",
        "event-definition": {
            "object_type": "app_server",
            "metric_type": "slb_virtual_server_port",
            "window": {
                "type": "time",
                "value": "10m"
            },
            "conditions": {
                "and": {
                    "gt": {
                        "params": [
                            "sent_bytes"
                        ],
                        "aggregation": "sum",
                        "value": 1024
                    },
                    "gt": {
                        "params": [
                            "received_bytes"
                        ],
                        "aggregation": "sum",
                        "value": 1024
                    },
                    "operation": {
                        "params": [
                            "sent_bytes",
                            "received_bytes"
                        ],
                        "op": "sum",
                        "aggregation": "sum",
                        "value": 1024
                    }
                },
                "expression": "sum(sent_bytes)>1024"
            }
        },
        "action-definition": {},
    }, {
        "defintion_name": "amazon_sentbytes_gt",
        "event_def_id": "tenant-ED300",
        "event_name": "rule-association",
        "event_type": "add",
        "account_id": "askhdj-23423-sdf323",
        "description": "this defines a rule to trigger a callback when sent_bytes gt 1024bytes",
        "event-definition": {
            "rule_def_id": "tenant-rule-RD300",
            "action_def_id": [
                "tenant-action-AD300",
                "tenant-action-AD900"
            ],
            "filter": {
                "account_id": "ACCOUNT_ID",
                "app_svc_id": "APP_SVC_ID",
                "client_IP": "CLIENT_IP"
            }
        }
    }]
    ALERTS = [{
        "enabled": "Active",
        "alertName": "DataCPU 90%",
        "priority": "Critical",
        "triggerName": "DataCPU 90%",
        "triggerObject": "Partition 1",
        "actionName": "Default",
        "event_def_id": "tenant-RD300",
        "event_name": "rule-definition",
        "event_type": "add",
        "account_id": "askhdj-23423-sdf323",
        "description": "this defines a rule to trigger a callback when sent_bytes gt 1024bytes",
        "event-definition": {
            "object_type": "app_server",
            "metric_type": "slb_virtual_server_port",
            "window": {
                "type": "time",
                "value": "10m"
            },
            "conditions": {
                "and": {
                    "gt": {
                        "params": [
                            "sent_bytes"
                        ],
                        "aggregation": "sum",
                        "value": 1024
                    }
                },
                "expression": "sum(sent_bytes)>1024"
            }
        },
        "action-definition": {},
    }, {
        "enabled": "Active",
        "alertName": "Session GT 90%",
        "priority": "Moderate",
        "triggerName": "Sessions 90%",
        "triggerObject": "Partition 2",
        "actionName": "Default",
        "defintion_name": "amazon_sentbytes_gt",
        "event_def_id": "tenant-ED300",
        "event_name": "rule-association",
        "event_type": "add",
        "account_id": "askhdj-23423-sdf323",
        "description": "this defines a rule to trigger a callback when sent_bytes gt 1024bytes",
        "event-definition": {
            "rule_def_id": "tenant-rule-RD300",
            "action_def_id": [
                "tenant-action-AD300",
                "tenant-action-AD900"
            ],
            "filter": {
                "account_id": "ACCOUNT_ID",
                "app_svc_id": "APP_SVC_ID",
                "client_IP": "CLIENT_IP"
            }
        }
    }]
    ACTIONS = [{
        "defintion_name": "Default",
        "triggers": 2,
        "optionsEnabled": "Email, POST",
        "event_def_id": "tenant-RD300",
        "event_name": "rule-definition",
        "event_type": "add",
        "account_id": "askhdj-23423-sdf323",
        "description": "this defines a rule to trigger a callback when sent_bytes gt 1024bytes",
        "event-definition": {
            "object_type": "app_server",
            "metric_type": "slb_virtual_server_port",
            "window": {
                "type": "time",
                "value": "10m"
            },
            "conditions": {
                "and": {
                    "gt": {
                        "params": [
                            "sent_bytes"
                        ],
                        "aggregation": "sum",
                        "value": 1024
                    },
                    "gt": {
                        "params": [
                            "received_bytes"
                        ],
                        "aggregation": "sum",
                        "value": 1024
                    },
                    "operation": {
                        "params": [
                            "sent_bytes",
                            "received_bytes"
                        ],
                        "op": "sum",
                        "aggregation": "sum",
                        "value": 1024
                    }
                },
                "expression": "sum(sent_bytes)>1024"
            }
        },
        "action-definition": {},
    }, {
        "defintion_name": "Notify Admins",
        "triggers": 10,
        "optionsEnabled": "Email",
        "event_def_id": "tenant-ED300",
        "event_name": "rule-association",
        "event_type": "add",
        "account_id": "askhdj-23423-sdf323",
        "description": "this defines a rule to trigger a callback when sent_bytes gt 1024bytes",
        "event-definition": {
            "rule_def_id": "tenant-rule-RD300",
            "action_def_id": [
                "tenant-action-AD300",
                "tenant-action-AD900"
            ],
            "filter": {
                "account_id": "ACCOUNT_ID",
                "app_svc_id": "APP_SVC_ID",
                "client_IP": "CLIENT_IP"
            }
        }
    }, {
        "defintion_name": "Email to Provider Admin only",
        "triggers": 0,
        "optionsEnabled": "Email, POST",
        "event_def_id": "tenant-ED300",
        "event_name": "rule-association",
        "event_type": "add",
        "account_id": "askhdj-23423-sdf323",
        "description": "this defines a rule to trigger a callback when sent_bytes gt 1024bytes",
        "event-definition": {
            "rule_def_id": "tenant-rule-RD300",
            "action_def_id": [
                "tenant-action-AD300",
                "tenant-action-AD900"
            ],
            "filter": {
                "account_id": "ACCOUNT_ID",
                "app_svc_id": "APP_SVC_ID",
                "client_IP": "CLIENT_IP"
            }
        }
    }]
    tenants = {
        "data": {
            "tenant-list": [
                {
                    "name": "slb-p1.2fb0bcb6-8b1e-11e8-8b84-ad44f13d4f16",
                    "displayName": "tenant2.slb-p1",
                    "id": "6d1a374d-7be0-4d02-81ff-6ae90917cb3f",
                    "providerId": "067e6162-3b6f-4ae2-a171-2470b63dff00",
                    "state": "ACTIVE",
                    "createdAt": "Aug 20, 2018 01:30:30 PM UTC",
                    "lastModifiedAt": "Aug 20, 2018 01:30:30 PM UTC",
                    "lastModifiedBy": "qaautomation2@appcito.net",
                    "appCount": 2,
                    "clusterCount": 1,
                    "logical-cluster-list": []
                },
                {
                    "name": "shared.3790CAF73D24CF63E183901ACD9DFC90B01EFE6A",
                    "displayName": "tenant1.shared",
                    "id": "01e7b9b4-2cfc-430c-b233-3b75e4474a14",
                    "providerId": "067e6162-3b6f-4ae2-a171-2470b63dff00",
                    "state": "ACTIVE",
                    "createdAt": "Aug 20, 2018 01:30:30 PM UTC",
                    "lastModifiedAt": "Aug 20, 2018 01:30:30 PM UTC",
                    "lastModifiedBy": "qaautomation2@appcito.net",
                    "appCount": 1,
                    "clusterCount": 1,
                    "logical-cluster-list": []
                },
                {
                    "name": "t1",
                    "displayName": "t1",
                    "id": "6081d892-0257-4576-be13-32b22be8f82a",
                    "providerId": "067e6162-3b6f-4ae2-a171-2470b63dff00",
                    "state": "ACTIVE",
                    "createdAt": "Aug 24, 2018 08:56:13 AM UTC",
                    "lastModifiedAt": "Aug 24, 2018 08:56:13 AM UTC",
                    "appCount": 0,
                    "clusterCount": 0,
                    "logical-cluster-list": []
                }
            ]
        }
    }
    clusters = {
        "data": {
            "cluster-list": [
                {
                    "name": "vcs-cluster",
                    "cluster-uuid": "725C667450C6672638780B36304C456202F427CA",
                    "uuid": "733f92ea-ab0d-11e8-b770-62e1f4268c0f",
                    "referrer-list": [
                        {
                            "name": "vcs-cluster.shared",
                            "uuid": "",
                            "obj-class": "provider.tenant.logical-cluster"
                        },
                        {
                            "name": "vcs-cluster.part2_25",
                            "uuid": "",
                            "obj-class": "provider.tenant.logical-cluster"
                        },
                        {
                            "name": "vcs-cluster.part1_25",
                            "uuid": "",
                            "obj-class": "provider.tenant.logical-cluster"
                        },
                        {
                            "name": "device-1",
                            "uuid": "783c6962-ab0d-11e8-b770-62e1f4268c0f",
                            "obj-class": "provider.device",
                            "a10-url": "/hpcapi/v3/provider/root/device/device-1"
                        }
                    ],
                    "a10-url": "/hpcapi/v3/provider/root/cluster/vcs-cluster"
                }
            ]
        }
    }

    devices = {
        "data": {
            "device-list": [
                {
                    "name": "device-1",
                    "host": "10.6.1.25",
                    "username": "admin",
                    "encrypted": "pseudo-encoding",
                    "cluster": "vcs-cluster",
                    "device-uuid": "725C667450C6672638780B36304C456202F427CA",
                    "uuid": "783c6962-ab0d-11e8-b770-62e1f4268c0f",
                    "partition-list": [
                        {
                            "name": "part1_25",
                            "mapped-to-tenant": "part1_25.45f29db6-683f-11e8-937c-001fa01072b4",
                            "uuid": "e26e7f96-ab0d-11e8-b770-62e1f4268c0f",
                            "partition-config-list": [
                                {
                                    "name": "part1_25.2018-08-28 22:01:54.594984",
                                    "type": "application/octet-stream",
                                    "size": 22762,
                                    "created-on": 1535493714,
                                    "uuid": "f9a53394-ab0d-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part1_25/partition-config/part1_25.2018-08-28%2022%3A01%3A54.594984"
                                },
                                {
                                    "name": "part1_25.2018-08-28 22:30:57.279559",
                                    "type": "application/octet-stream",
                                    "size": 22762,
                                    "created-on": 1535495457,
                                    "uuid": "085d7b5e-ab12-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part1_25/partition-config/part1_25.2018-08-28%2022%3A30%3A57.279559"
                                },
                                {
                                    "name": "part1_25.2018-08-28 22:59:44.748402",
                                    "type": "application/octet-stream",
                                    "size": 22762,
                                    "created-on": 1535497184,
                                    "uuid": "0e03eef4-ab16-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part1_25/partition-config/part1_25.2018-08-28%2022%3A59%3A44.748402"
                                },
                                {
                                    "name": "part1_25.2018-08-28 23:02:41.798570",
                                    "type": "application/octet-stream",
                                    "size": 22762,
                                    "created-on": 1535497361,
                                    "uuid": "778afb4c-ab16-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part1_25/partition-config/part1_25.2018-08-28%2023%3A02%3A41.798570"
                                },
                                {
                                    "name": "part1_25.2018-08-28 23:25:45.517708",
                                    "type": "application/octet-stream",
                                    "size": 22762,
                                    "created-on": 1535498745,
                                    "uuid": "b04df40e-ab19-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part1_25/partition-config/part1_25.2018-08-28%2023%3A25%3A45.517708"
                                },
                                {
                                    "name": "part1_25.2018-08-28 23:27:40.832460",
                                    "type": "application/octet-stream",
                                    "size": 22762,
                                    "created-on": 1535498860,
                                    "uuid": "f509db08-ab19-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part1_25/partition-config/part1_25.2018-08-28%2023%3A27%3A40.832460"
                                },
                                {
                                    "name": "part1_25.2018-08-28 23:41:38.345596",
                                    "type": "application/octet-stream",
                                    "size": 22762,
                                    "created-on": 1535499698,
                                    "uuid": "e83bffda-ab1b-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part1_25/partition-config/part1_25.2018-08-28%2023%3A41%3A38.345596"
                                },
                                {
                                    "name": "part1_25.2018-08-28 23:42:38.409562",
                                    "type": "application/octet-stream",
                                    "size": 22762,
                                    "created-on": 1535499758,
                                    "uuid": "0c097834-ab1c-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part1_25/partition-config/part1_25.2018-08-28%2023%3A42%3A38.409562"
                                },
                                {
                                    "name": "part1_25.2018-08-28 23:43:37.452657",
                                    "type": "application/octet-stream",
                                    "size": 22762,
                                    "created-on": 1535499817,
                                    "uuid": "2f3b25d2-ab1c-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part1_25/partition-config/part1_25.2018-08-28%2023%3A43%3A37.452657"
                                },
                                {
                                    "name": "part1_25.2018-08-28 23:44:40.631018",
                                    "type": "application/octet-stream",
                                    "size": 22762,
                                    "created-on": 1535499880,
                                    "uuid": "54e25e4a-ab1c-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part1_25/partition-config/part1_25.2018-08-28%2023%3A44%3A40.631018"
                                },
                                {
                                    "name": "part1_25.2018-08-28 23:45:39.782066",
                                    "type": "application/octet-stream",
                                    "size": 22762,
                                    "created-on": 1535499939,
                                    "uuid": "78248dc4-ab1c-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part1_25/partition-config/part1_25.2018-08-28%2023%3A45%3A39.782066"
                                },
                                {
                                    "name": "part1_25.2018-08-28 23:46:42.709751",
                                    "type": "application/octet-stream",
                                    "size": 22762,
                                    "created-on": 1535500002,
                                    "uuid": "9da6605e-ab1c-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part1_25/partition-config/part1_25.2018-08-28%2023%3A46%3A42.709751"
                                },
                                {
                                    "name": "part1_25.2018-08-28 23:47:41.260341",
                                    "type": "application/octet-stream",
                                    "size": 22762,
                                    "created-on": 1535500061,
                                    "uuid": "c08cb8a2-ab1c-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part1_25/partition-config/part1_25.2018-08-28%2023%3A47%3A41.260341"
                                },
                                {
                                    "name": "part1_25.2018-08-28 23:59:41.076614",
                                    "type": "application/octet-stream",
                                    "size": 22762,
                                    "created-on": 1535500781,
                                    "uuid": "6d983b4c-ab1e-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part1_25/partition-config/part1_25.2018-08-28%2023%3A59%3A41.076614"
                                },
                                {
                                    "name": "part1_25.2018-08-28 23:59:51.173983",
                                    "type": "application/octet-stream",
                                    "size": 22762,
                                    "created-on": 1535500791,
                                    "uuid": "739e0134-ab1e-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part1_25/partition-config/part1_25.2018-08-28%2023%3A59%3A51.173983"
                                },
                                {
                                    "name": "part1_25.2018-08-29 00:00:38.857726",
                                    "type": "application/octet-stream",
                                    "size": 22762,
                                    "created-on": 1535500838,
                                    "uuid": "900892ee-ab1e-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part1_25/partition-config/part1_25.2018-08-29%2000%3A00%3A38.857726"
                                },
                                {
                                    "name": "part1_25.2018-08-29 00:00:48.753262",
                                    "type": "application/octet-stream",
                                    "size": 22762,
                                    "created-on": 1535500848,
                                    "uuid": "95ef1016-ab1e-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part1_25/partition-config/part1_25.2018-08-29%2000%3A00%3A48.753262"
                                },
                                {
                                    "name": "part1_25.2018-08-29 00:01:40.016923",
                                    "type": "application/octet-stream",
                                    "size": 22762,
                                    "created-on": 1535500900,
                                    "uuid": "b47ceaa8-ab1e-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part1_25/partition-config/part1_25.2018-08-29%2000%3A01%3A40.016923"
                                },
                                {
                                    "name": "part1_25.2018-08-29 00:02:39.167567",
                                    "type": "application/octet-stream",
                                    "size": 22762,
                                    "created-on": 1535500959,
                                    "uuid": "d7bea466-ab1e-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part1_25/partition-config/part1_25.2018-08-29%2000%3A02%3A39.167567"
                                },
                                {
                                    "name": "part1_25.2018-08-29 00:03:39.964890",
                                    "type": "application/octet-stream",
                                    "size": 22762,
                                    "created-on": 1535501019,
                                    "uuid": "fbfaff5a-ab1e-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part1_25/partition-config/part1_25.2018-08-29%2000%3A03%3A39.964890"
                                },
                                {
                                    "name": "part1_25.2018-08-29 00:04:40.392809",
                                    "type": "application/octet-stream",
                                    "size": 22762,
                                    "created-on": 1535501080,
                                    "uuid": "1fffcd86-ab1f-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part1_25/partition-config/part1_25.2018-08-29%2000%3A04%3A40.392809"
                                },
                                {
                                    "name": "part1_25.2018-08-29 00:05:38.981157",
                                    "type": "application/octet-stream",
                                    "size": 22762,
                                    "created-on": 1535501138,
                                    "uuid": "42ebb2ba-ab1f-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part1_25/partition-config/part1_25.2018-08-29%2000%3A05%3A38.981157"
                                },
                                {
                                    "name": "part1_25.2018-08-29 00:06:40.096470",
                                    "type": "application/octet-stream",
                                    "size": 22762,
                                    "created-on": 1535501200,
                                    "uuid": "675b700e-ab1f-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part1_25/partition-config/part1_25.2018-08-29%2000%3A06%3A40.096470"
                                },
                                {
                                    "name": "part1_25.2018-08-29 00:07:41.104204",
                                    "type": "application/octet-stream",
                                    "size": 22762,
                                    "created-on": 1535501261,
                                    "uuid": "8bb5f78a-ab1f-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part1_25/partition-config/part1_25.2018-08-29%2000%3A07%3A41.104204"
                                },
                                {
                                    "name": "part1_25.2018-08-29 00:08:42.645471",
                                    "type": "application/octet-stream",
                                    "size": 22762,
                                    "created-on": 1535501322,
                                    "uuid": "b0648100-ab1f-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part1_25/partition-config/part1_25.2018-08-29%2000%3A08%3A42.645471"
                                },
                                {
                                    "name": "part1_25.2018-08-29 00:09:37.879918",
                                    "type": "application/octet-stream",
                                    "size": 22762,
                                    "created-on": 1535501377,
                                    "uuid": "d150a63c-ab1f-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part1_25/partition-config/part1_25.2018-08-29%2000%3A09%3A37.879918"
                                },
                                {
                                    "name": "part1_25.2018-08-29 00:10:38.021339",
                                    "type": "application/octet-stream",
                                    "size": 22762,
                                    "created-on": 1535501438,
                                    "uuid": "f529db6e-ab1f-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part1_25/partition-config/part1_25.2018-08-29%2000%3A10%3A38.021339"
                                },
                                {
                                    "name": "part1_25.2018-08-29 00:11:38.700605",
                                    "type": "application/octet-stream",
                                    "size": 22762,
                                    "created-on": 1535501498,
                                    "uuid": "19547fa8-ab20-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part1_25/partition-config/part1_25.2018-08-29%2000%3A11%3A38.700605"
                                },
                                {
                                    "name": "part1_25.2018-08-29 00:12:37.748272",
                                    "type": "application/octet-stream",
                                    "size": 22762,
                                    "created-on": 1535501557,
                                    "uuid": "3c8775fc-ab20-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part1_25/partition-config/part1_25.2018-08-29%2000%3A12%3A37.748272"
                                },
                                {
                                    "name": "part1_25.2018-08-29 00:13:40.290547",
                                    "type": "application/octet-stream",
                                    "size": 22762,
                                    "created-on": 1535501620,
                                    "uuid": "61cde5ee-ab20-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part1_25/partition-config/part1_25.2018-08-29%2000%3A13%3A40.290547"
                                },
                                {
                                    "name": "part1_25.2018-08-29 00:14:37.954598",
                                    "type": "application/octet-stream",
                                    "size": 22762,
                                    "created-on": 1535501677,
                                    "uuid": "842c6ff2-ab20-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part1_25/partition-config/part1_25.2018-08-29%2000%3A14%3A37.954598"
                                },
                                {
                                    "name": "part1_25.2018-08-29 00:15:38.616146",
                                    "type": "application/octet-stream",
                                    "size": 22762,
                                    "created-on": 1535501738,
                                    "uuid": "a8555542-ab20-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part1_25/partition-config/part1_25.2018-08-29%2000%3A15%3A38.616146"
                                },
                                {
                                    "name": "part1_25.2018-08-29 00:16:40.720334",
                                    "type": "application/octet-stream",
                                    "size": 22762,
                                    "created-on": 1535501800,
                                    "uuid": "cd58feac-ab20-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part1_25/partition-config/part1_25.2018-08-29%2000%3A16%3A40.720334"
                                },
                                {
                                    "name": "part1_25.2018-08-29 00:17:39.665616",
                                    "type": "application/octet-stream",
                                    "size": 22762,
                                    "created-on": 1535501859,
                                    "uuid": "f07b8b52-ab20-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part1_25/partition-config/part1_25.2018-08-29%2000%3A17%3A39.665616"
                                },
                                {
                                    "name": "part1_25.2018-08-29 00:18:41.151706",
                                    "type": "application/octet-stream",
                                    "size": 22762,
                                    "created-on": 1535501921,
                                    "uuid": "1521539c-ab21-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part1_25/partition-config/part1_25.2018-08-29%2000%3A18%3A41.151706"
                                },
                                {
                                    "name": "part1_25.2018-08-29 00:19:40.419791",
                                    "type": "application/octet-stream",
                                    "size": 22762,
                                    "created-on": 1535501980,
                                    "uuid": "3874ae52-ab21-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part1_25/partition-config/part1_25.2018-08-29%2000%3A19%3A40.419791"
                                },
                                {
                                    "name": "part1_25.2018-08-29 00:20:39.745575",
                                    "type": "application/octet-stream",
                                    "size": 22762,
                                    "created-on": 1535502039,
                                    "uuid": "5bd135e6-ab21-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part1_25/partition-config/part1_25.2018-08-29%2000%3A20%3A39.745575"
                                },
                                {
                                    "name": "part1_25.2018-08-29 00:21:39.856600",
                                    "type": "application/octet-stream",
                                    "size": 22762,
                                    "created-on": 1535502099,
                                    "uuid": "7fa59e76-ab21-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part1_25/partition-config/part1_25.2018-08-29%2000%3A21%3A39.856600"
                                },
                                {
                                    "name": "part1_25.2018-08-29 00:22:41.481006",
                                    "type": "application/octet-stream",
                                    "size": 22762,
                                    "created-on": 1535502161,
                                    "uuid": "a4618bf8-ab21-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part1_25/partition-config/part1_25.2018-08-29%2000%3A22%3A41.481006"
                                },
                                {
                                    "name": "part1_25.2018-08-29 00:23:38.084910",
                                    "type": "application/octet-stream",
                                    "size": 22762,
                                    "created-on": 1535502218,
                                    "uuid": "c61df588-ab21-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part1_25/partition-config/part1_25.2018-08-29%2000%3A23%3A38.084910"
                                },
                                {
                                    "name": "part1_25.2018-08-29 00:24:37.367668",
                                    "type": "application/octet-stream",
                                    "size": 22762,
                                    "created-on": 1535502277,
                                    "uuid": "e9737d28-ab21-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part1_25/partition-config/part1_25.2018-08-29%2000%3A24%3A37.367668"
                                },
                                {
                                    "name": "part1_25.2018-08-29 00:25:37.504177",
                                    "type": "application/octet-stream",
                                    "size": 22762,
                                    "created-on": 1535502337,
                                    "uuid": "0d4bbcd8-ab22-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part1_25/partition-config/part1_25.2018-08-29%2000%3A25%3A37.504177"
                                },
                                {
                                    "name": "part1_25.2018-08-29 00:26:38.413034",
                                    "type": "application/octet-stream",
                                    "size": 22762,
                                    "created-on": 1535502398,
                                    "uuid": "319a115c-ab22-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part1_25/partition-config/part1_25.2018-08-29%2000%3A26%3A38.413034"
                                },
                                {
                                    "name": "part1_25.2018-08-29 00:27:40.602723",
                                    "type": "application/octet-stream",
                                    "size": 22762,
                                    "created-on": 1535502460,
                                    "uuid": "56aaf51a-ab22-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part1_25/partition-config/part1_25.2018-08-29%2000%3A27%3A40.602723"
                                },
                                {
                                    "name": "part1_25.2018-08-29 00:28:39.532789",
                                    "type": "application/octet-stream",
                                    "size": 22762,
                                    "created-on": 1535502519,
                                    "uuid": "79caee42-ab22-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part1_25/partition-config/part1_25.2018-08-29%2000%3A28%3A39.532789"
                                },
                                {
                                    "name": "part1_25.2018-08-29 00:29:38.235557",
                                    "type": "application/octet-stream",
                                    "size": 22762,
                                    "created-on": 1535502578,
                                    "uuid": "9cc90b54-ab22-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part1_25/partition-config/part1_25.2018-08-29%2000%3A29%3A38.235557"
                                },
                                {
                                    "name": "part1_25.2018-08-29 00:30:38.951117",
                                    "type": "application/octet-stream",
                                    "size": 22762,
                                    "created-on": 1535502638,
                                    "uuid": "c0f98b34-ab22-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part1_25/partition-config/part1_25.2018-08-29%2000%3A30%3A38.951117"
                                },
                                {
                                    "name": "part1_25.2018-08-29 00:31:38.970540",
                                    "type": "application/octet-stream",
                                    "size": 22762,
                                    "created-on": 1535502698,
                                    "uuid": "e4bec016-ab22-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part1_25/partition-config/part1_25.2018-08-29%2000%3A31%3A38.970540"
                                },
                                {
                                    "name": "part1_25.2018-08-29 00:32:39.375466",
                                    "type": "application/octet-stream",
                                    "size": 22762,
                                    "created-on": 1535502759,
                                    "uuid": "08c0597a-ab23-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part1_25/partition-config/part1_25.2018-08-29%2000%3A32%3A39.375466"
                                },
                                {
                                    "name": "part1_25.2018-08-29 00:33:42.333642",
                                    "type": "application/octet-stream",
                                    "size": 22762,
                                    "created-on": 1535502822,
                                    "uuid": "2e46de3a-ab23-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part1_25/partition-config/part1_25.2018-08-29%2000%3A33%3A42.333642"
                                },
                                {
                                    "name": "part1_25.2018-08-29 02:29:05.532213",
                                    "type": "application/octet-stream",
                                    "size": 22762,
                                    "created-on": 1535509745,
                                    "uuid": "4cd3aae4-ab33-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part1_25/partition-config/part1_25.2018-08-29%2002%3A29%3A05.532213"
                                },
                                {
                                    "name": "part1_25.2018-08-29 02:29:29.552167",
                                    "type": "application/octet-stream",
                                    "size": 22762,
                                    "created-on": 1535509769,
                                    "uuid": "5b242132-ab33-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part1_25/partition-config/part1_25.2018-08-29%2002%3A29%3A29.552167"
                                },
                                {
                                    "name": "part1_25.2018-08-29 02:29:39.183135",
                                    "type": "application/octet-stream",
                                    "size": 22762,
                                    "created-on": 1535509779,
                                    "uuid": "60e18678-ab33-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part1_25/partition-config/part1_25.2018-08-29%2002%3A29%3A39.183135"
                                },
                                {
                                    "name": "part1_25.2018-08-29 02:29:48.962705",
                                    "type": "application/octet-stream",
                                    "size": 22762,
                                    "created-on": 1535509788,
                                    "uuid": "66b5e09e-ab33-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part1_25/partition-config/part1_25.2018-08-29%2002%3A29%3A48.962705"
                                }
                            ],
                            "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part1_25"
                        },
                        {
                            "name": "part2_25",
                            "mapped-to-tenant": "part2_25.5015d448-683f-11e8-937c-001fa01072b4",
                            "uuid": "e26e8612-ab0d-11e8-b770-62e1f4268c0f",
                            "partition-config-list": [
                                {
                                    "name": "part2_25.2018-08-28 22:01:54.546565",
                                    "type": "application/octet-stream",
                                    "size": 23914,
                                    "created-on": 1535493714,
                                    "uuid": "f99ce3e2-ab0d-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part2_25/partition-config/part2_25.2018-08-28%2022%3A01%3A54.546565"
                                },
                                {
                                    "name": "part2_25.2018-08-28 22:30:57.220420",
                                    "type": "application/octet-stream",
                                    "size": 23914,
                                    "created-on": 1535495457,
                                    "uuid": "08551310-ab12-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part2_25/partition-config/part2_25.2018-08-28%2022%3A30%3A57.220420"
                                },
                                {
                                    "name": "part2_25.2018-08-28 22:59:44.703603",
                                    "type": "application/octet-stream",
                                    "size": 23914,
                                    "created-on": 1535497184,
                                    "uuid": "0dfd941e-ab16-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part2_25/partition-config/part2_25.2018-08-28%2022%3A59%3A44.703603"
                                },
                                {
                                    "name": "part2_25.2018-08-28 23:02:41.762344",
                                    "type": "application/octet-stream",
                                    "size": 23914,
                                    "created-on": 1535497361,
                                    "uuid": "7785b1aa-ab16-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part2_25/partition-config/part2_25.2018-08-28%2023%3A02%3A41.762344"
                                },
                                {
                                    "name": "part2_25.2018-08-28 23:25:45.479326",
                                    "type": "application/octet-stream",
                                    "size": 23914,
                                    "created-on": 1535498745,
                                    "uuid": "b0487394-ab19-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part2_25/partition-config/part2_25.2018-08-28%2023%3A25%3A45.479326"
                                },
                                {
                                    "name": "part2_25.2018-08-28 23:27:40.798536",
                                    "type": "application/octet-stream",
                                    "size": 23914,
                                    "created-on": 1535498860,
                                    "uuid": "f504f944-ab19-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part2_25/partition-config/part2_25.2018-08-28%2023%3A27%3A40.798536"
                                },
                                {
                                    "name": "part2_25.2018-08-28 23:41:38.307204",
                                    "type": "application/octet-stream",
                                    "size": 23914,
                                    "created-on": 1535499698,
                                    "uuid": "e8370a20-ab1b-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part2_25/partition-config/part2_25.2018-08-28%2023%3A41%3A38.307204"
                                },
                                {
                                    "name": "part2_25.2018-08-28 23:42:38.362207",
                                    "type": "application/octet-stream",
                                    "size": 23914,
                                    "created-on": 1535499758,
                                    "uuid": "0c01c260-ab1c-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part2_25/partition-config/part2_25.2018-08-28%2023%3A42%3A38.362207"
                                },
                                {
                                    "name": "part2_25.2018-08-28 23:43:37.399963",
                                    "type": "application/octet-stream",
                                    "size": 23914,
                                    "created-on": 1535499817,
                                    "uuid": "2f339c68-ab1c-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part2_25/partition-config/part2_25.2018-08-28%2023%3A43%3A37.399963"
                                },
                                {
                                    "name": "part2_25.2018-08-28 23:44:40.593206",
                                    "type": "application/octet-stream",
                                    "size": 23914,
                                    "created-on": 1535499880,
                                    "uuid": "54dcea32-ab1c-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part2_25/partition-config/part2_25.2018-08-28%2023%3A44%3A40.593206"
                                },
                                {
                                    "name": "part2_25.2018-08-28 23:45:39.752934",
                                    "type": "application/octet-stream",
                                    "size": 23914,
                                    "created-on": 1535499939,
                                    "uuid": "78200b28-ab1c-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part2_25/partition-config/part2_25.2018-08-28%2023%3A45%3A39.752934"
                                },
                                {
                                    "name": "part2_25.2018-08-28 23:46:42.672710",
                                    "type": "application/octet-stream",
                                    "size": 23914,
                                    "created-on": 1535500002,
                                    "uuid": "9da0b6f4-ab1c-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part2_25/partition-config/part2_25.2018-08-28%2023%3A46%3A42.672710"
                                },
                                {
                                    "name": "part2_25.2018-08-28 23:47:41.222769",
                                    "type": "application/octet-stream",
                                    "size": 23914,
                                    "created-on": 1535500061,
                                    "uuid": "c086760e-ab1c-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part2_25/partition-config/part2_25.2018-08-28%2023%3A47%3A41.222769"
                                },
                                {
                                    "name": "part2_25.2018-08-28 23:59:41.035126",
                                    "type": "application/octet-stream",
                                    "size": 23914,
                                    "created-on": 1535500781,
                                    "uuid": "6d91cd5c-ab1e-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part2_25/partition-config/part2_25.2018-08-28%2023%3A59%3A41.035126"
                                },
                                {
                                    "name": "part2_25.2018-08-28 23:59:51.131248",
                                    "type": "application/octet-stream",
                                    "size": 23914,
                                    "created-on": 1535500791,
                                    "uuid": "73975956-ab1e-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part2_25/partition-config/part2_25.2018-08-28%2023%3A59%3A51.131248"
                                },
                                {
                                    "name": "part2_25.2018-08-29 00:00:38.829211",
                                    "type": "application/octet-stream",
                                    "size": 23914,
                                    "created-on": 1535500838,
                                    "uuid": "9003e78a-ab1e-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part2_25/partition-config/part2_25.2018-08-29%2000%3A00%3A38.829211"
                                },
                                {
                                    "name": "part2_25.2018-08-29 00:00:48.720656",
                                    "type": "application/octet-stream",
                                    "size": 23914,
                                    "created-on": 1535500848,
                                    "uuid": "95e9b242-ab1e-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part2_25/partition-config/part2_25.2018-08-29%2000%3A00%3A48.720656"
                                },
                                {
                                    "name": "part2_25.2018-08-29 00:01:39.981625",
                                    "type": "application/octet-stream",
                                    "size": 23914,
                                    "created-on": 1535500899,
                                    "uuid": "b4778dce-ab1e-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part2_25/partition-config/part2_25.2018-08-29%2000%3A01%3A39.981625"
                                },
                                {
                                    "name": "part2_25.2018-08-29 00:02:39.114727",
                                    "type": "application/octet-stream",
                                    "size": 23914,
                                    "created-on": 1535500959,
                                    "uuid": "d7b8b920-ab1e-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part2_25/partition-config/part2_25.2018-08-29%2000%3A02%3A39.114727"
                                },
                                {
                                    "name": "part2_25.2018-08-29 00:03:39.922701",
                                    "type": "application/octet-stream",
                                    "size": 23914,
                                    "created-on": 1535501019,
                                    "uuid": "fbf5a3b6-ab1e-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part2_25/partition-config/part2_25.2018-08-29%2000%3A03%3A39.922701"
                                },
                                {
                                    "name": "part2_25.2018-08-29 00:04:40.357225",
                                    "type": "application/octet-stream",
                                    "size": 23914,
                                    "created-on": 1535501080,
                                    "uuid": "1ffa845c-ab1f-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part2_25/partition-config/part2_25.2018-08-29%2000%3A04%3A40.357225"
                                },
                                {
                                    "name": "part2_25.2018-08-29 00:05:38.947979",
                                    "type": "application/octet-stream",
                                    "size": 23914,
                                    "created-on": 1535501138,
                                    "uuid": "42e7056c-ab1f-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part2_25/partition-config/part2_25.2018-08-29%2000%3A05%3A38.947979"
                                },
                                {
                                    "name": "part2_25.2018-08-29 00:06:40.060057",
                                    "type": "application/octet-stream",
                                    "size": 23914,
                                    "created-on": 1535501200,
                                    "uuid": "675418a4-ab1f-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part2_25/partition-config/part2_25.2018-08-29%2000%3A06%3A40.060057"
                                },
                                {
                                    "name": "part2_25.2018-08-29 00:07:41.073706",
                                    "type": "application/octet-stream",
                                    "size": 23914,
                                    "created-on": 1535501261,
                                    "uuid": "8bb16170-ab1f-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part2_25/partition-config/part2_25.2018-08-29%2000%3A07%3A41.073706"
                                },
                                {
                                    "name": "part2_25.2018-08-29 00:08:42.597612",
                                    "type": "application/octet-stream",
                                    "size": 23914,
                                    "created-on": 1535501322,
                                    "uuid": "b05e88e0-ab1f-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part2_25/partition-config/part2_25.2018-08-29%2000%3A08%3A42.597612"
                                },
                                {
                                    "name": "part2_25.2018-08-29 00:09:37.839713",
                                    "type": "application/octet-stream",
                                    "size": 23914,
                                    "created-on": 1535501377,
                                    "uuid": "d14ab83a-ab1f-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part2_25/partition-config/part2_25.2018-08-29%2000%3A09%3A37.839713"
                                },
                                {
                                    "name": "part2_25.2018-08-29 00:10:37.984011",
                                    "type": "application/octet-stream",
                                    "size": 23914,
                                    "created-on": 1535501437,
                                    "uuid": "f523f6ea-ab1f-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part2_25/partition-config/part2_25.2018-08-29%2000%3A10%3A37.984011"
                                },
                                {
                                    "name": "part2_25.2018-08-29 00:11:38.663815",
                                    "type": "application/octet-stream",
                                    "size": 23914,
                                    "created-on": 1535501498,
                                    "uuid": "194fbe6e-ab20-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part2_25/partition-config/part2_25.2018-08-29%2000%3A11%3A38.663815"
                                },
                                {
                                    "name": "part2_25.2018-08-29 00:12:37.699484",
                                    "type": "application/octet-stream",
                                    "size": 23914,
                                    "created-on": 1535501557,
                                    "uuid": "3c7f03f4-ab20-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part2_25/partition-config/part2_25.2018-08-29%2000%3A12%3A37.699484"
                                },
                                {
                                    "name": "part2_25.2018-08-29 00:13:40.241643",
                                    "type": "application/octet-stream",
                                    "size": 23914,
                                    "created-on": 1535501620,
                                    "uuid": "61c7616a-ab20-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part2_25/partition-config/part2_25.2018-08-29%2000%3A13%3A40.241643"
                                },
                                {
                                    "name": "part2_25.2018-08-29 00:14:37.917667",
                                    "type": "application/octet-stream",
                                    "size": 23914,
                                    "created-on": 1535501677,
                                    "uuid": "84276a5c-ab20-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part2_25/partition-config/part2_25.2018-08-29%2000%3A14%3A37.917667"
                                },
                                {
                                    "name": "part2_25.2018-08-29 00:15:38.586451",
                                    "type": "application/octet-stream",
                                    "size": 23914,
                                    "created-on": 1535501738,
                                    "uuid": "a850432c-ab20-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part2_25/partition-config/part2_25.2018-08-29%2000%3A15%3A38.586451"
                                },
                                {
                                    "name": "part2_25.2018-08-29 00:16:40.691145",
                                    "type": "application/octet-stream",
                                    "size": 23914,
                                    "created-on": 1535501800,
                                    "uuid": "cd546fa4-ab20-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part2_25/partition-config/part2_25.2018-08-29%2000%3A16%3A40.691145"
                                },
                                {
                                    "name": "part2_25.2018-08-29 00:17:39.596249",
                                    "type": "application/octet-stream",
                                    "size": 23914,
                                    "created-on": 1535501859,
                                    "uuid": "f070d194-ab20-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part2_25/partition-config/part2_25.2018-08-29%2000%3A17%3A39.596249"
                                },
                                {
                                    "name": "part2_25.2018-08-29 00:18:41.118235",
                                    "type": "application/octet-stream",
                                    "size": 23914,
                                    "created-on": 1535501921,
                                    "uuid": "151cb652-ab21-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part2_25/partition-config/part2_25.2018-08-29%2000%3A18%3A41.118235"
                                },
                                {
                                    "name": "part2_25.2018-08-29 00:19:40.378432",
                                    "type": "application/octet-stream",
                                    "size": 23914,
                                    "created-on": 1535501980,
                                    "uuid": "386f830a-ab21-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part2_25/partition-config/part2_25.2018-08-29%2000%3A19%3A40.378432"
                                },
                                {
                                    "name": "part2_25.2018-08-29 00:20:39.710675",
                                    "type": "application/octet-stream",
                                    "size": 23914,
                                    "created-on": 1535502039,
                                    "uuid": "5bcc207e-ab21-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part2_25/partition-config/part2_25.2018-08-29%2000%3A20%3A39.710675"
                                },
                                {
                                    "name": "part2_25.2018-08-29 00:21:39.812330",
                                    "type": "application/octet-stream",
                                    "size": 23914,
                                    "created-on": 1535502099,
                                    "uuid": "7f9f12ea-ab21-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part2_25/partition-config/part2_25.2018-08-29%2000%3A21%3A39.812330"
                                },
                                {
                                    "name": "part2_25.2018-08-29 00:22:41.427145",
                                    "type": "application/octet-stream",
                                    "size": 23914,
                                    "created-on": 1535502161,
                                    "uuid": "a45a131e-ab21-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part2_25/partition-config/part2_25.2018-08-29%2000%3A22%3A41.427145"
                                },
                                {
                                    "name": "part2_25.2018-08-29 00:23:38.050653",
                                    "type": "application/octet-stream",
                                    "size": 23914,
                                    "created-on": 1535502218,
                                    "uuid": "c618c374-ab21-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part2_25/partition-config/part2_25.2018-08-29%2000%3A23%3A38.050653"
                                },
                                {
                                    "name": "part2_25.2018-08-29 00:24:37.332464",
                                    "type": "application/octet-stream",
                                    "size": 23914,
                                    "created-on": 1535502277,
                                    "uuid": "e96e8552-ab21-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part2_25/partition-config/part2_25.2018-08-29%2000%3A24%3A37.332464"
                                },
                                {
                                    "name": "part2_25.2018-08-29 00:25:37.464706",
                                    "type": "application/octet-stream",
                                    "size": 23914,
                                    "created-on": 1535502337,
                                    "uuid": "0d4664a4-ab22-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part2_25/partition-config/part2_25.2018-08-29%2000%3A25%3A37.464706"
                                },
                                {
                                    "name": "part2_25.2018-08-29 00:26:38.377766",
                                    "type": "application/octet-stream",
                                    "size": 23914,
                                    "created-on": 1535502398,
                                    "uuid": "31941518-ab22-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part2_25/partition-config/part2_25.2018-08-29%2000%3A26%3A38.377766"
                                },
                                {
                                    "name": "part2_25.2018-08-29 00:27:40.554682",
                                    "type": "application/octet-stream",
                                    "size": 23914,
                                    "created-on": 1535502460,
                                    "uuid": "56a414d4-ab22-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part2_25/partition-config/part2_25.2018-08-29%2000%3A27%3A40.554682"
                                },
                                {
                                    "name": "part2_25.2018-08-29 00:28:39.489726",
                                    "type": "application/octet-stream",
                                    "size": 23914,
                                    "created-on": 1535502519,
                                    "uuid": "79c4fba4-ab22-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part2_25/partition-config/part2_25.2018-08-29%2000%3A28%3A39.489726"
                                },
                                {
                                    "name": "part2_25.2018-08-29 00:29:38.202770",
                                    "type": "application/octet-stream",
                                    "size": 23914,
                                    "created-on": 1535502578,
                                    "uuid": "9cc3b37a-ab22-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part2_25/partition-config/part2_25.2018-08-29%2000%3A29%3A38.202770"
                                },
                                {
                                    "name": "part2_25.2018-08-29 00:30:38.916491",
                                    "type": "application/octet-stream",
                                    "size": 23914,
                                    "created-on": 1535502638,
                                    "uuid": "c0f39b20-ab22-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part2_25/partition-config/part2_25.2018-08-29%2000%3A30%3A38.916491"
                                },
                                {
                                    "name": "part2_25.2018-08-29 00:31:38.922886",
                                    "type": "application/octet-stream",
                                    "size": 23914,
                                    "created-on": 1535502698,
                                    "uuid": "e4b7d26a-ab22-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part2_25/partition-config/part2_25.2018-08-29%2000%3A31%3A38.922886"
                                },
                                {
                                    "name": "part2_25.2018-08-29 00:32:39.344387",
                                    "type": "application/octet-stream",
                                    "size": 23914,
                                    "created-on": 1535502759,
                                    "uuid": "08bb98cc-ab23-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part2_25/partition-config/part2_25.2018-08-29%2000%3A32%3A39.344387"
                                },
                                {
                                    "name": "part2_25.2018-08-29 00:33:42.299745",
                                    "type": "application/octet-stream",
                                    "size": 23914,
                                    "created-on": 1535502822,
                                    "uuid": "2e428056-ab23-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part2_25/partition-config/part2_25.2018-08-29%2000%3A33%3A42.299745"
                                },
                                {
                                    "name": "part2_25.2018-08-29 02:29:05.499531",
                                    "type": "application/octet-stream",
                                    "size": 23914,
                                    "created-on": 1535509745,
                                    "uuid": "4cce105c-ab33-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part2_25/partition-config/part2_25.2018-08-29%2002%3A29%3A05.499531"
                                },
                                {
                                    "name": "part2_25.2018-08-29 02:29:29.509760",
                                    "type": "application/octet-stream",
                                    "size": 23914,
                                    "created-on": 1535509769,
                                    "uuid": "5b1ec200-ab33-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part2_25/partition-config/part2_25.2018-08-29%2002%3A29%3A29.509760"
                                },
                                {
                                    "name": "part2_25.2018-08-29 02:29:39.154324",
                                    "type": "application/octet-stream",
                                    "size": 23914,
                                    "created-on": 1535509779,
                                    "uuid": "60dd3b04-ab33-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part2_25/partition-config/part2_25.2018-08-29%2002%3A29%3A39.154324"
                                },
                                {
                                    "name": "part2_25.2018-08-29 02:29:48.918935",
                                    "type": "application/octet-stream",
                                    "size": 23914,
                                    "created-on": 1535509788,
                                    "uuid": "66b037e8-ab33-11e8-b770-62e1f4268c0f",
                                    "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part2_25/partition-config/part2_25.2018-08-29%2002%3A29%3A48.918935"
                                }
                            ],
                            "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/part2_25"
                        },
                        {
                            "name": "shared",
                            "mapped-to-tenant": "shared.725C667450C6672638780B36304C456202F427CA",
                            "uuid": "e26e8a9a-ab0d-11e8-b770-62e1f4268c0f",
                            "a10-url": "/hpcapi/v3/provider/root/device/device-1/partition/shared"
                        }
                    ],
                    "a10-url": "/hpcapi/v3/provider/root/device/device-1"
                }
            ]

        }
    }
    PARAMS = {
        "data": {
            "schema": JSON.stringify({
                "fields": [{
                    "name": "bytes_sent",
                    "type": "long"
                }, {
                    "name": "bytes_recieved",
                    "type": "long"
                }]
            })
        }
    }
}
export default Data