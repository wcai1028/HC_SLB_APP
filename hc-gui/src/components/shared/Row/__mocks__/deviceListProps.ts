export default {
    "uid": "A10Container-DeviceList-19",
    "GLOBAL_CONFIG": {
        "DEBUG": true,
        "THEME": {
            "name": "Thunder",
            "cssPath": ""
        },
        "INTL": {
            "locale": "en-US",
            "messages": {},
            "languages": [
                "en-US",
                "zh-Hans",
                "ja"
            ]
        },
        "EPIC_DEPENDENCIES": {},
        "REDUX_DATA_NS": {
            "TENANT": [
                "tenant"
            ],
            "TENANT_LIST": [
                "tenant",
                "tenantList"
            ],
            "VIP_LIST": [
                "tenant",
                "vipList"
            ],
            "APP_SERVICE_GROUP_LIST": [
                "tenant",
                "appServiceGroupList"
            ],
            "SERVICE_GROUP_LIST": [
                "tenant",
                "globalServiceGroupList"
            ],
            "GLOBAL_SERVER_LIST": [
                "tenant",
                "globalServerList"
            ],
            "GLOBAL_VPORT_LIST": [
                "tenant",
                "globalVPortList"
            ],
            "CLUSTER_LIST": [
                "tenant",
                "clusterList"
            ],
            "PHYSICAL_CLUSTER_LIST": [
                "tenant",
                "${clusterName}",
                "clusterList"
            ],
            "VPORT_LIST": [
                "tenant",
                "appsvc",
                "${svcName}",
                "vip",
                "${vipName}",
                "portList"
            ],
            "SERVER_LIST": [
                "tenant",
                "vip",
                "${sgName}",
                "server"
            ],
            "APP_SERVICE_LIST": [
                "tenant",
                "appservicegroup",
                "${asgName}",
                "appServiceList"
            ],
            "LC_APP_SERVICE_LIST": [
                "tenant",
                "logicalcluster",
                "${logicalCluster}",
                "appServiceList"
            ],
            "SHARED_OBJECT_LIST": [
                "tenant",
                "serviceObjectList"
            ],
            "APP_VIP_LIST": [
                "tenant",
                "appsvc",
                "${svcName}",
                "vipList"
            ],
            "DEPLOYED_OBJECT_LIST": [
                "tenant",
                "sharedObjectType",
                "${type}",
                "${name}",
                "objectList"
            ],
            "ASSOCIATED_SERVICE_GROUP": [
                "tenant",
                "appsvc",
                "${svcName}",
                "${portId}",
                "serviceGroup"
            ],
            "AFLEX_LIST": [
                "tenant",
                "aflexList"
            ],
            "CERT_LIST": [
                "tenant",
                "certList"
            ],
            "HEALTH_MONITOR_LIST": [
                "tenant",
                "healthMonitorList"
            ],
            "IPNAT_LIST": [
                "tenant",
                "ipNatList"
            ],
            "VRID_LIST": [
                "tenant",
                "vridList"
            ],
            "DIRTY_LIST": [
                "tenant",
                "dirtyList",
                "${type}",
                "${name}"
            ],
            "HEALTH_STATUS": [
                "operState",
                "${uuid}"
            ],
            "HEALTH_SERIES": [
                "health",
                "${uuid}"
            ],
            "DEVICE_LIST": [
                "deviceList",
                "${clusterName}"
            ],
            "BACKUP_LIST": [
                "backupList"
            ],
            "PARTITION_CONFIG_LIST": [
                "partitionConfigList"
            ],
            "IMAGE_LIST": [
                "imageList"
            ],
            "WORKFLOW_LIST": [
                "workflowList"
            ],
            "LICENSE_LIST": [
                "licenseList"
            ]
        },
        "ADC_ROUTE_PATH": "/launchers/adc"
    }
}