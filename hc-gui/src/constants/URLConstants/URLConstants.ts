export class URLConstants {
  URLS = {
    CREATE_NEW_SESSION: {
      URL: '/sessions',
      METHOD: 'POST',
      NEEDED_QUERYSTRING: false,
    },
    GET_ROLES: {
      URL: '/roles',
      METHOD: 'GET',
      NEEDED_QUERYSTRING: false,
    },
    GET_USER_DETAILS: {
      URL: '/users/~',
      METHOD: 'GET',
      NEEDED_QUERYSTRING: true,
    },
    GET_HELP_TEXTS: {
      URL: '/helptexts/AppcitoHelpTexts',
      METHOD: 'GET',
    },
    CREATE_HELP_TEXT_REPO: {
      URL: '/helptexts',
      METHOD: 'POST',
    },
    LIST_TENANT: {
      URL: '~/tenants/~',
      METHOD: 'GET',
      NEEDED_QUERYSTRING: true,
    },
    LIST_TENANTS_O: {
      URL: '/providers/~/tenants',
      METHOD: 'GET',
      NEEDED_QUERYSTRING: true,
    },
    LIST_TENANTS: {
      URL: '/hpcapi/v3/provider/~/tenant',
      METHOD: 'GET',
      NEEDED_QUERYSTRING: true,
    },
    LIST_SELECTED_TENANTS_O: {
      URL: '/providers/~/tenants/~',
      METHOD: 'GET',
      NEEDED_QUERYSTRING: true,
    },
    LIST_SELECTED_TENANTS: {
      URL: '/hpcapi/v3/provider/~/tenant/~',
      METHOD: 'GET',
      NEEDED_QUERYSTRING: true,
    },
    GET_APPLICATIONS_DETAILS: {
      URL: '/applications/~?options=loadDetails',
      METHOD: 'GET',
      NEEDED_QUERYSTRING: true,
    },
    GET_APPLICATIONS: {
      URL: '/hpcapi/v3/provider/~/tenant/~/app-svc',
      METHOD: 'GET',
      NEEDED_QUERYSTRING: true,
    },
    GET_CLUSTERS_O: {
      URL: '/hpcapi/v3/provider/~/cluster',
      METHOD: 'GET',
      NEEDED_QUERYSTRING: true,
    },
    GET_CLUSTERS: {
      URL: '/hpcapi/v3/provider/~/cluster?detail=true',
      METHOD: 'GET',
      NEEDED_QUERYSTRING: true,
    },
    GET_CLUSTER: {
      URL: '/hpcapi/v3/provider/~/cluster/~',
      METHOD: 'GET',
      NEEDED_QUERYSTRING: true,
    },
    GET_DEVICES: {
      URL: '/hpcapi/v3/provider/~/device?cluster=~&detail=true',
      METHOD: 'GET',
      NEEDED_QUERYSTRING: true,
    },
    GET_DEVICES_O: {
      URL: '/providers/~/clusters/~/devices',
      METHOD: 'GET',
      NEEDED_QUERYSTRING: true,
    },
    GET_DEVICE_PARTITIONS: {
      URL: '/hpcapi/v3/provider/~/device/~/partition?detail=true',
      METHOD: 'GET',
      NEEDED_QUERYSTRING: true,
    },
    GET_INDEPENDENT_DEVICES: {
      URL: '/hpcapi/v3/provider/~/device',
      METHOD: 'GET',
      NEEDED_QUERYSTRING: true,
    },
    GET_CLUSTER_STATS: {
      URL: '/analytics/thunder-adc/system_telemetry_log_device_status',
      METHOD: 'POST',
      NEEDED_QUERYSTRING: false,
    },
    GET_PARTITION_STATS: {
      URL: '/analytics/thunder-adc/system_telemetry_log_partition_metrics',
      METHOD: 'POST',
      NEEDED_QUERYSTRING: false,
    },
    GET_LADC_CLUSTERS: {
      URL: '/cspcluster',
      METHOD: 'GET',
      NEEDED_QUERYSTRING: false,
    },
    CREATE_CLUSTER: {
      URL: '~//reg/dc/~',
      METHOD: 'POST',
      NEEDED_QUERYSTRING: true,
    },
    UPDATE_CLUSTER_NAME: {
      URL: '~//reg/dc/~',
      METHOD: 'PUT',
      NEEDED_QUERYSTRING: true,
    },
    GET_JWT_TOKEN: {
      URL: '/sessions/jwt/generate',
      METHOD: 'GET',
      NEEDED_QUERYSTRING: true,
    },
    GET_PROVIDERS: {
      URL: '/hpcapi/v3/provider',
      METHOD: 'GET',
      NEEDED_QUERYSTRING: false,
    },
    GET_PROVIDER_ACTIVATION_URL: {
      URL: '~/providers/~/_activationurl',
      METHOD: 'GET',
      NEEDED_QUERYSTRING: true,
    },
    UPDATE_PROVIDER: {
      URL: '/hpcapi/v3/provider/~',
      METHOD: 'PUT',
      NEEDED_QUERYSTRING: true,
    },
    GET_TENANTS: {
      URL: '/hpcapi/v3/provider/~/tenant',
      METHOD: 'GET',
      NEEDED_QUERYSTRING: true,
    },
    GET_TENANT_BANDWIDTH_STATS: {
      URL: '/analytics/thunder-adc/slb_virtual_server_port',
      METHOD: 'POST',
      NEEDED_QUERYSTRING: true,
    },
    GET_TENANT_REQUESTS_STATS: {
      URL: '/analytics/thunder-adc/counter_http_vport',
      METHOD: 'POST',
      NEEDED_QUERYSTRING: true,
    },
    UPDATE_TENANT: {
      URL: '/hpcapi/v3/provider/~/tenant/~',
      METHOD: 'PUT',
      NEEDED_QUERYSTRING: true,
    },
    GET_USERS: {
      URL: '/users',
      METHOD: 'GET',
      NEEDED_QUERYSTRING: true,
    },
    GET_USER_ACTIVATION_LINK: {
      URL: '/users/~/_getactivationmail',
      METHOD: 'GET',
      NEEDED_QUERYSTRING: true,
    },
    ADD_USER: {
      URL: '/users',
      METHOD: 'POST',
      NEEDED_QUERYSTRING: true,
    },
    UPDATE_USER: {
      URL: '/users/~/_updateinfo',
      METHOD: 'PUT',
      NEEDED_QUERYSTRING: true,
    },
    ADD_PROVIDER: {
      URL: '/hpcapi/v3/provider',
      METHOD: 'POST',
      NEEDED_QUERYSTRING: true,
    },
    ADD_SUB_PROVIDER_USER: {
      URL: '/users',
      METHOD: 'POST',
      NEEDED_QUERYSTRING: true,
    },
    ADD_TENANT: {
      URL: '/hpcapi/v3/provider/~/tenant',
      METHOD: 'POST',
      NEEDED_QUERYSTRING: true,
    },
    ASSIGN_USER: {
      URL: '/users/~/_addrole',
      METHOD: 'POST',
      NEEDED_QUERYSTRING: true,
    },
    GET_LADC_CREDENTIALS: {
      URL: '/infracredentials',
      METHOD: 'GET',
      NEEDED_QUERYSTRING: false,
    },
    GET_HC_APP_CATALOG: {
      URL: '/apps',
      METHOD: 'GET',
      NEEDED_QUERYSTRING: true,
    },
    UPLOAD_HC_APP: {
      URL: '/apps',
      METHOD: 'POST',
      NEEDED_QUERYSTRING: true,
    },
    UPDATE_HC_APP: {
      URL: '/apps/~/version/~',
      METHOD: 'PUT',
      NEEDED_QUERYSTRING: true,
    },
    GET_HC_APP_INFO: {
      URL: '/apps/~/version/~',
      METHOD: 'GET',
      NEEDED_QUERYSTRING: true,
    },
    DELETE_HC_APP: {
      URL: '/apps/~/version/~',
      METHOD: 'DELETE',
      NEEDED_QUERYSTRING: true,
    },
    SUB_HC_PROVIDER_APP: {
      URL: '~/apps/~/version/~',
      METHOD: 'POST',
      NEEDED_QUERYSTRING: true,
    },
    UNSUB_HC_PROVIDER_APP: {
      URL: '~/apps/~/version/~',
      METHOD: 'DELETE',
      NEEDED_QUERYSTRING: true,
    },
    GET_HC_PROVIDER_APPS: {
      URL: '~/apps',
      METHOD: 'GET',
      NEEDED_QUERYSTRING: true,
    },
    GET_HC_TENANT_APP_CATALOG: {
      URL: '~/tenants/~/_appcatalouge',
      METHOD: 'GET',
      NEEDED_QUERYSTRING: true,
    },
    GET_HC_TENANT_APPS: {
      URL: '~/tenants/~/apps',
      METHOD: 'GET',
      NEEDED_QUERYSTRING: true,
    },
    GET_HC_TENANT_APPS_APP_ADMIN: {
      URL: '~/tenants/~/_listapps',
      METHOD: 'GET',
      NEEDED_QUERYSTRING: true,
    },
    SUB_HC_TENANT_APP: {
      URL: '~/tenants/~/apps/~/version/~',
      METHOD: 'POST',
      NEEDED_QUERYSTRING: true,
    },
    UNSUB_HC_TENANT_APP: {
      URL: '~/tenants/~/apps/~/version/~',
      METHOD: 'DELETE',
      NEEDED_QUERYSTRING: true,
    },
    UPDATE_PASSWORD: {
      URL: '/users/~/_updatepassword',
      METHOD: 'PUT',
      NEEDED_QUERYSTRING: true,
    },
    ACTIVATE_DOMAIN_USER: {
      URL: '/users/~/activate',
      METHOD: 'POST',
      NEEDED_QUERYSTRING: true,
    },
    RESET_PASSWORD: {
      URL: '/users/~/_resetpassword',
      METHOD: 'POST',
      NEEDED_QUERYSTRING: true,
    },
    GET_TERMS_ACCEPTED: {
      URL: '/users/~/terms',
      METHOD: 'GET',
      NEEDED_QUERYSTRING: true,
    },
    SET_TERMS_ACCEPTED: {
      URL: '/users/~/terms',
      METHOD: 'POST',
      NEEDED_QUERYSTRING: true,
    },
    GET_INHERITANCE: {
      URL: '/users/~/inheritable',
      METHOD: 'GET',
      NEEDED_QUERYSTRING: true,
    },
    GET_INHERITANCE_TYPE: {
      URL: '/users/~/inheritableauthtype',
      METHOD: 'GET',
      NEEDED_QUERYSTRING: true,
    },
    GET_AUTH_TYPE: {
      URL: '/users/~/authtype',
      METHOD: 'GET',
      NEEDED_QUERYSTRING: true,
    },
    SET_AUTH: {
      URL: '/users/~/authtype',
      METHOD: 'POST',
      NEEDED_QUERYSTRING: true,
    },
    DELETE_TENANT: {
      URL: '/hpcapi/v3/provider/~/tenant/~',
      METHOD: 'DELETE',
      NEEDED_QUERYSTRING: true,
    },
    DELETE_USER: {
      URL: '/users/~',
      METHOD: 'DELETE',
      NEEDED_QUERYSTRING: true,
    },
    DELETE_PROVIDER: {
      URL: '/hpcapi/v3/provider/~',
      METHOD: 'DELETE',
      NEEDED_QUERYSTRING: true,
    },
    GET_OBJECT_TYPE: {
      URL: '/analytics/configuration/metricscategory',
      METHOD: 'GET',
      NEEDED_QUERYSTRING: false,
    },
    GET_SCHEMA_REGISTRY: {
      URL: '/schema-registry/subjects/~/versions/1',
      METHOD: 'GET',
      NEEDED_QUERYSTRING: true,
    },
    GET_METRIC_TYPE: {
      URL: '/analytics/configuration/metricscategory/~/~/~',
      METHOD: 'GET',
      NEEDED_QUERYSTRING: true,
    },
    GET_TRIGGERS: {
      URL: '/analytics/configuration/ruledef',
      METHOD: 'GET',
      NEEDED_QUERYSTRING: false,
    },
    GET_TRIGGER: {
      URL: '/analytics/configuration/ruledef/~',
      METHOD: 'GET',
      NEEDED_QUERYSTRING: true,
    },
    ADD_TRIGGER: {
      URL: '/analytics/configuration/ruledef',
      METHOD: 'POST',
      NEEDED_QUERYSTRING: true,
    },
    UPDATE_TRIGGER: {
      URL: '/analytics/configuration/ruledef',
      METHOD: 'PUT',
      NEEDED_QUERYSTRING: true,
    },
    DELETE_TRIGGER: {
      URL: '/analytics/configuration/ruledef/~',
      METHOD: 'DELETE',
      NEEDED_QUERYSTRING: true,
    },
    GET_ALERTS: {
      URL: '/analytics/configuration/ruleassociation',
      METHOD: 'GET',
      NEEDED_QUERYSTRING: false,
    },
    ADD_ALERT: {
      URL: '/analytics/configuration/ruleassociation',
      METHOD: 'POST',
      NEEDED_QUERYSTRING: false,
    },
    UPDATE_ALERT: {
      URL: '/analytics/configuration/ruleassociation',
      METHOD: 'PUT',
      NEEDED_QUERYSTRING: false,
    },
    DELETE_ALERT: {
      URL: '/analytics/configuration/ruleassociation/~',
      METHOD: 'DELETE',
      NEEDED_QUERYSTRING: true,
    },
    GET_ACTIONS: {
      URL: '/analytics/configuration/actiondef',
      METHOD: 'GET',
      NEEDED_QUERYSTRING: false,
    },
    GET_ACTION: {
      URL: '/analytics/configuration/actiondef/~',
      METHOD: 'GET',
      NEEDED_QUERYSTRING: true,
    },
    ADD_ACTION: {
      URL: '/analytics/configuration/actiondef',
      METHOD: 'POST',
      NEEDED_QUERYSTRING: false,
    },
    UPDATE_ACTION: {
      URL: '/analytics/configuration/actiondef',
      METHOD: 'PUT',
      NEEDED_QUERYSTRING: false,
    },
    DELETE_ACTION: {
      URL: '/analytics/configuration/actiondef/~',
      METHOD: 'DELETE',
      NEEDED_QUERYSTRING: true,
    },
    GET_PROVIDER_ADMIN_DETAILS: {
      URL: '/users/~',
      METHOD: 'GET',
      NEEDED_QUERYSTRING: true,
    },
    GET_PARENT_CLIENT_ID: {
      URL: '/providers/~/inheritclientid',
      METHOD: 'GET',
      NEEDED_QUERYSTRING: true,
    },
    GET_HC_EVENTS: {
      URL: '/analytics/event/hc_event',
      METHOD: 'POST',
      NEEDED_QUERYSTRING: true,
    },
    ADD_CLUSTER: {
      URL: '/hpcapi/v3/provider/~/cluster',
      METHOD: 'POST',
      NEEDED_QUERYSTRING: true,
    },
    UPDATE_CLUSTER: {
      URL: '/hpcapi/v3/provider/~/cluster/~',
      METHOD: 'PUT',
      NEEDED_QUERYSTRING: true,
    },
    DELETE_CLUSTER: {
      URL: '/hpcapi/v3/provider/~/cluster/~',
      METHOD: 'DELETE',
      NEEDED_QUERYSTRING: true,
    },
    ADD_DEVICE: {
      URL: '/hpcapi/v3/provider/~/device',
      METHOD: 'POST',
      NEEDED_QUERYSTRING: true,
    },
    REGISTER_DEVICE: {
      URL: '/hpcapi/v3/provider/~/device/~/register',
      METHOD: 'POST',
      NEEDED_QUERYSTRING: true,
    },
    UPDATE_DEVICE: {
      URL: '/hpcapi/v3/provider/~/device/~',
      METHOD: 'PUT',
      NEEDED_QUERYSTRING: true,
    },
    GET_DEVICE: {
      URL: '/hpcapi/v3/provider/~/device/~',
      METHOD: 'GET',
      NEEDED_QUERYSTRING: true,
    },
    DELETE_DEVICE: {
      URL: '/hpcapi/v3/provider/~/device/~',
      METHOD: 'DELETE',
      NEEDED_QUERYSTRING: true,
    },
    GET_PARTITION: {
      URL: '/hpcapi/v3/provider/~/device/~/partition/~',
      METHOD: 'GET',
      NEEDED_QUERYSTRING: true,
    },
    ADD_PARTITION: {
      URL: '/hpcapi/v3/provider/~/device/~/partition',
      METHOD: 'POST',
      NEEDED_QUERYSTRING: true,
    },
    UPDATE_PARTITION: {
      URL: '/hpcapi/v3/provider/~/device/~/partition/~',
      METHOD: 'PUT',
      NEEDED_QUERYSTRING: true,
    },
    DELETE_PARTITION: {
      URL: '/hpcapi/v3/provider/~/device/~/partition/~',
      METHOD: 'DELETE',
      NEEDED_QUERYSTRING: true,
    },
    ADD_CLUSTER_DEVICE: {
      URL: '/hpcapi/v3/provider/~/device?cluster=~',
      METHOD: 'POST',
      NEEDED_QUERYSTRING: true,
    },
    GET_LICENSE_INFO: {
      URL: '/licenses/providers/~/',
      METHOD: 'GET',
      NEEDED_QUERYSTRING: true,
    },
    ADD_LICENSE_INFO: {
      URL: '/licenses/providers/~/',
      METHOD: 'POST',
      NEEDED_QUERYSTRING: true,
    },
    DEL_LICENSE_INFO: {
      URL: '/licenses/providers/~/entitlementkey/~',
      METHOD: 'DELETE',
      NEEDED_QUERYSTRING: true,
    },
  }

  getURLS = (url: string) => {
    return this.URLS[url]
  }
}

export default URLConstants
