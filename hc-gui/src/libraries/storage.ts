export const getItem = (key: string, parse?: boolean) => {
  if (parse) {
    return JSON.parse(sessionStorage.getItem(key))
  }
  return sessionStorage.getItem(key)
}
export const setItem = (
  key: string,
  data: string | any,
  stringify?: boolean,
) => {
  if (stringify) {
    data = JSON.stringify(data)
  }
  sessionStorage.setItem(key, data)
}
export const removeItem = (key: string) => {
  return sessionStorage.removeItem(key)
}
export const getList = () => {
  return ALL_TEMPLATES
}

export const ALL_TEMPLATES: IObject = {
  vip: {
    logging: '',
    'virtual-server': '',
    scaleout: '',
    policy: '',
  },
  services: {
    'tcp-proxy-client': '',
    'tcp-proxy-server': '',
    'tcp-proxy': '',
    scaleout: '',
    'file-inspection': '',
    'virtual-port': '',
    'virtual-server': '',
    ftp: '',
  },
  protocols: {
    'virtual-port': '',
    // smtp: '',
    // diameter: '',
    cache: '',
    // fix: '',
    // ssli: '',
    udp: '',
    // 'udp-shared': '',
    tcp: '',
    'tcp-proxy': '',
    // 'tcp-shared': '',
    'server-ssl': '',
    // 'server-ssl-shared': '',
    'client-ssl': '',
    // 'client-ssl-shared': '',
    dns: '',
    http: '',
    policy: '',
    'http-policy': '',
    // 'http-shared': '',
    // sip: '',
    // smpp: '',
    // dblb: '',
    // 'reqmod-icap': '',
    // 'respmod-icap': '',
    'persist.source-ip': '',
    'persist.destination-ip': '',
    'persist.ssl-sid': '',
    'persist.cookie': '',
  },
  policies: {
    'connection-reuse': '',
    policy: '',
    'http-policy': '',
    'dynamic-service': '',
    'external-service': '',
  },
  servicegroup: {
    port: '',
    server: '',
    policy: '',
  },
}

export const vPortMapping: IObject = {
  tcp: [
    'dynamic-service',
    'persist.destination-ip',
    'persist.source-ip',
    'persist.ssl-sid',
    'policy',
    // 'scaleout',
    'tcp',
    'virtual-port',
  ],
  udp: [
    'dns',
    'dynamic-service',
    'persist.destination-ip',
    'persist.source-ip',
    'policy',
    // 'scaleout',
    'udp',
    'virtual-port',
  ],
  others: [
    'dynamic-service',
    'persist.destination-ip',
    'persist.source-ip',
    'policy',
    // 'scaleout',
    'tcp',
    'udp',
    'virtual-port',
  ],
  'dns-tcp': [
    'dns',
    'dynamic-service',
    'persist.destination-ip',
    'persist.source-ip',
    'policy',
    // 'scaleout',
    'tcp-proxy',
    'virtual-port',
  ],
  'dns-udp': [
    'dns',
    'dynamic-service',
    'persist.destination-ip',
    'persist.source-ip',
    'policy',
    // 'scaleout',
    'udp',
    'virtual-port',
  ],
  'fast-http': [
    'connection-reuse',
    'dynamic-service',
    'http',
    'persist.cookie',
    'persist.destination-ip',
    'persist.source-ip',
    'policy',
    // 'scaleout',
    'tcp',
    'virtual-port',
  ],
  http: [
    'cache',
    'client-ssl',
    'connection-reuse',
    'dynamic-service',
    'http',
    'http-policy',
    'persist.cookie',
    'persist.destination-ip',
    'persist.source-ip',
    'policy',
    // 'scaleout',
    'server-ssl',
    'tcp-proxy',
    'virtual-port',
  ],
  https: [
    'cache',
    'client-ssl',
    'connection-reuse',
    'dynamic-service',
    'http',
    'http-policy',
    'persist.cookie',
    'persist.destination-ip',
    'persist.source-ip',
    'policy',
    // 'scaleout',
    'server-ssl',
    'tcp-proxy',
    'virtual-port',
  ],
  http2: [
    'client-ssl',
    'connection-reuse',
    'dynamic-service',
    'http',
    'http-policy',
    'persist.cookie',
    'persist.destination-ip',
    'persist.source-ip',
    'policy',
    // 'scaleout',
    'server-ssl',
    'tcp',
    'tcp-proxy',
    'udp',
    'virtual-port',
  ],
  http2s: [
    'client-ssl',
    'connection-reuse',
    'dynamic-service',
    'http',
    'http-policy',
    'persist.cookie',
    'persist.destination-ip',
    'persist.source-ip',
    'policy',
    // 'scaleout',
    'server-ssl',
    'tcp',
    'tcp-proxy',
    'udp',
    'virtual-port',
  ],
  mlb: [
    'dynamic-service',
    'persist.destination-ip',
    'persist.source-ip',
    'policy',
    // 'scaleout',
    'tcp-proxy',
    'virtual-port',
  ],
  mms: [
    'dynamic-service',
    'persist.destination-ip',
    'persist.source-ip',
    'policy',
    // 'scaleout',
    'tcp',
    'virtual-port',
  ],
  mysql: [
    'client-ssl',
    'dynamic-service',
    'persist.destination-ip',
    'persist.source-ip',
    // 'scaleout',
    'server-ssl',
    'tcp-proxy',
    'virtual-port',
  ],
  mssql: [
    'client-ssl',
    'dynamic-service',
    'persist.destination-ip',
    'persist.source-ip',
    // 'scaleout',
    'server-ssl',
    'tcp-proxy',
    'virtual-port',
  ],
  pop3: [
    'client-ssl',
    'dynamic-service',
    'persist.cookie',
    'persist.destination-ip',
    'persist.source-ip',
    'policy',
    // 'scaleout',
    'tcp-proxy',
    'virtual-port',
  ],
  rtsp: [
    'dynamic-service',
    'persist.destination-ip',
    'persist.source-ip',
    'policy',
    'tcp',
    'virtual-port',
  ],
  'ssl-proxy': [
    'client-ssl',
    'dynamic-service',
    'persist.destination-ip',
    'persist.source-ip',
    'policy',
    // 'scaleout',
    'server-ssl',
    'tcp-proxy',
    'virtual-port',
  ],
  'tcp-proxy': [
    'dynamic-service',
    'persist.destination-ip',
    'persist.source-ip',
    'policy',
    // 'scaleout',
    'server-ssl',
    'tcp-proxy',
    'virtual-port',
  ],
}

export const templateDefinition: IObject = {
  cache: 'RAM caching template',
  cipher: 'SSL Cipher template',
  'client-ssl': 'Client SSL template',
  'connection-reuse': 'Connection Reuse template',
  dns: 'DNS template',
  'dynamic-service': 'Dynamic service template',
  http: 'HTTP template',
  'http-policy': 'http-policy template',
  logging: 'Logging template',
  monitor: 'Monitor template',
  'persist.cookie': 'Persist Cookie template',
  'persist.destination-ip': 'Persist Dest IP template',
  'persist.source-ip': 'Persist Src IP template',
  'persist.ssl-sid': 'Persist SSL ID template',
  policy: 'Policy template',
  port: 'Port template',
  server: 'Server template',
  'server-ssl': 'Server Side SSL template',
  tcp: 'L4 TCP switch config',
  'tcp-proxy': 'TCP Proxy',
  udp: 'L4 UDP switch config',
  'virtual-port': 'Virtual port template',
  'virtual-server': 'Virtual server template',
  scaleout: 'Scaleout template',
}

export const templateCategoryMap: IObject = {
  'slb.template.virtual-server': 'ADC',
  'slb.template.virtual-port': 'ADC',
  'slb.template.server': 'ADC',
  'slb.template.port': 'ADC',
  'slb.template.cache': 'ADC',
  'slb.template.connection-reuse': 'ADC',
  'slb.template.dynamic-service': 'ADC',
  'slb.template.persist.cookie': 'ADC',
  'slb.template.persist.destination-ip': 'ADC',
  'slb.template.persist.source-ip': 'ADC',
  'slb.template.persist.ssl-sid': 'ADC',
  'slb.template.http': 'Apps',
  'slb.template.http-policy': 'Apps',
  'slb.template.dns': 'Apps',
  'slb.template.cipher': 'SSL',
  'slb.template.client-ssl': 'SSL',
  'slb.template.server-ssl': 'SSL',
  'slb.template.tcp-proxy': 'SSLi',
  'slb.template.logging': 'System',
  'ip.nat.template.logging': 'System',
  'slb.template.monitor': 'System',
  'slb.template.tcp': 'Protocol',
  'slb.template.udp': 'Protocol',
  'slb.template.policy': 'Policy',
}

export const COUNTRY: IObject[] = [
  { AF: 'Afghanistan' },
  { AL: 'Albania' },
  { DZ: 'Algeria' },
  { AS: 'American Samoa' },
  { AD: 'Andorra' },
  { AO: 'Angola' },
  { AI: 'Anguilla' },
  { AQ: 'Antarctica' },
  { AG: 'Antigua and Barbuda' },
  { AR: 'Argentina' },
  { AM: 'Armenia' },
  { AW: 'Aruba' },
  { AU: 'Australia' },
  { AT: 'Austria' },
  { AZ: 'Azerbaijan' },
  { BS: 'Bahamas' },
  { BH: 'Bahrain' },
  { BD: 'Bangladesh' },
  { BB: 'Barbados' },
  { BY: 'Belarus' },
  { BE: 'Belgium' },
  { BZ: 'Belize' },
  { BJ: 'Benin' },
  { BM: 'Bermuda' },
  { BT: 'Bhutan' },
  { BO: 'Bolivia, Plurinational State of' },
  { BQ: 'Bonaire, Sint Eustatius and Saba' },
  { BA: 'Bosnia and Herzegovina' },
  { BW: 'Botswana' },
  { BV: 'Bouvet Island' },
  { BR: 'Brazil' },
  { IO: 'British Indian Ocean Territory' },
  { BN: 'Brunei Darussalam' },
  { BG: 'Bulgaria' },
  { BF: 'Burkina Faso' },
  { BI: 'Burundi' },
  { KH: 'Cambodia' },
  { CM: 'Cameroon' },
  { CA: 'Canada' },
  { CV: 'Cape Verde' },
  { KY: 'Cayman Islands' },
  { CF: 'Central African Republic' },
  { TD: 'Chad' },
  { CL: 'Chile' },
  { CN: 'China' },
  { CX: 'Christmas Island' },
  { CC: 'Cocos (Keeling) Islands' },
  { CO: 'Colombia' },
  { KM: 'Comoros' },
  { CG: 'Congo' },
  { CD: 'Congo (the Democratic Republic of the)' },
  { CK: 'Cook Islands' },
  { CR: 'Costa Rica' },
  { HR: 'Croatia' },
  { CU: 'Cuba' },
  { CW: 'Cura\xe7ao' },
  { CY: 'Cyprus' },
  { CZ: 'Czech Republic' },
  { CI: "C\xf4te d'Ivoire" },
  { DK: 'Denmark' },
  { DJ: 'Djibouti' },
  { DM: 'Dominica' },
  { DO: 'Dominican Republic' },
  { EC: 'Ecuador' },
  { EG: 'Egypt' },
  { SV: 'El Salvador' },
  { GQ: 'Equatorial Guinea' },
  { ER: 'Eritrea' },
  { EE: 'Estonia' },
  { ET: 'Ethiopia' },
  { FK: 'Falkland Islands  [Malvinas]' },
  { FO: 'Faroe Islands' },
  { FJ: 'Fiji' },
  { FI: 'Finland' },
  { FR: 'France' },
  { GF: 'French Guiana' },
  { PF: 'French Polynesia' },
  { TF: 'French Southern Territories' },
  { GA: 'Gabon' },
  { GM: 'Gambia (The)' },
  { GE: 'Georgia' },
  { DE: 'Germany' },
  { GH: 'Ghana' },
  { GI: 'Gibraltar' },
  { GR: 'Greece' },
  { GL: 'Greenland' },
  { GD: 'Grenada' },
  { GP: 'Guadeloupe' },
  { GU: 'Guam' },
  { GT: 'Guatemala' },
  { GG: 'Guernsey' },
  { GN: 'Guinea' },
  { GW: 'Guinea-Bissau' },
  { GY: 'Guyana' },
  { HT: 'Haiti' },
  { HM: 'Heard Island and McDonald Islands' },
  { VA: 'Holy See  [Vatican City State]' },
  { HN: 'Honduras' },
  { HK: 'Hong Kong' },
  { HU: 'Hungary' },
  { IS: 'Iceland' },
  { IN: 'India' },
  { ID: 'Indonesia' },
  { IR: 'Iran (the Islamic Republic of)' },
  { IQ: 'Iraq' },
  { IE: 'Ireland' },
  { IM: 'Isle of Man' },
  { IL: 'Israel' },
  { IT: 'Italy' },
  { JM: 'Jamaica' },
  { JP: 'Japan' },
  { JE: 'Jersey' },
  { JO: 'Jordan' },
  { KZ: 'Kazakhstan' },
  { KE: 'Kenya' },
  { KI: 'Kiribati' },
  { KP: "Korea (the Democratic People's Republic of)" },
  { KR: 'Korea (the Republic of)' },
  { KW: 'Kuwait' },
  { KG: 'Kyrgyzstan' },
  { LA: "Lao People's Democratic Republic" },
  { LV: 'Latvia' },
  { LB: 'Lebanon' },
  { LS: 'Lesotho' },
  { LR: 'Liberia' },
  { LY: 'Libya' },
  { LI: 'Liechtenstein' },
  { LT: 'Lithuania' },
  { LU: 'Luxembourg' },
  { MO: 'Macao' },
  { MK: 'Macedonia (the former Yugoslav Republic of)' },
  { MG: 'Madagascar' },
  { MW: 'Malawi' },
  { MY: 'Malaysia' },
  { MV: 'Maldives' },
  { ML: 'Mali' },
  { MT: 'Malta' },
  { MH: 'Marshall Islands' },
  { MQ: 'Martinique' },
  { MR: 'Mauritania' },
  { MU: 'Mauritius' },
  { YT: 'Mayotte' },
  { MX: 'Mexico' },
  { FM: 'Micronesia (the Federated States of)' },
  { MD: 'Moldova (the Republic of)' },
  { MC: 'Monaco' },
  { MN: 'Mongolia' },
  { ME: 'Montenegro' },
  { MS: 'Montserrat' },
  { MA: 'Morocco' },
  { MZ: 'Mozambique' },
  { MM: 'Myanmar' },
  { NA: 'Namibia' },
  { NR: 'Nauru' },
  { NP: 'Nepal' },
  { NL: 'Netherlands' },
  { NC: 'New Caledonia' },
  { NZ: 'New Zealand' },
  { NI: 'Nicaragua' },
  { NE: 'Niger' },
  { NG: 'Nigeria' },
  { NU: 'Niue' },
  { NF: 'Norfolk Island' },
  { MP: 'Northern Mariana Islands' },
  { NO: 'Norway' },
  { OM: 'Oman' },
  { PK: 'Pakistan' },
  { PW: 'Palau' },
  { PS: 'Palestine, State of' },
  { PA: 'Panama' },
  { PG: 'Papua New Guinea' },
  { PY: 'Paraguay' },
  { PE: 'Peru' },
  { PH: 'Philippines' },
  { PN: 'Pitcairn' },
  { PL: 'Poland' },
  { PT: 'Portugal' },
  { PR: 'Puerto Rico' },
  { QA: 'Qatar' },
  { RO: 'Romania' },
  { RU: 'Russian Federation' },
  { RW: 'Rwanda' },
  { RE: 'R\xe9union' },
  { BL: 'Saint Barth\xe9lemy' },
  { SH: 'Saint Helena, Ascension and Tristan da Cunha' },
  { KN: 'Saint Kitts and Nevis' },
  { LC: 'Saint Lucia' },
  { MF: 'Saint Martin (French part)' },
  { PM: 'Saint Pierre and Miquelon' },
  { VC: 'Saint Vincent and the Grenadines' },
  { WS: 'Samoa' },
  { SM: 'San Marino' },
  { ST: 'Sao Tome and Principe' },
  { SA: 'Saudi Arabia' },
  { SN: 'Senegal' },
  { RS: 'Serbia' },
  { SC: 'Seychelles' },
  { SL: 'Sierra Leone' },
  { SG: 'Singapore' },
  { SX: 'Sint Maarten (Dutch part)' },
  { SK: 'Slovakia' },
  { SI: 'Slovenia' },
  { SB: 'Solomon Islands' },
  { SO: 'Somalia' },
  { ZA: 'South Africa' },
  { GS: 'South Georgia and the South Sandwich Islands' },
  { SS: 'South Sudan' },
  { ES: 'Spain' },
  { LK: 'Sri Lanka' },
  { SD: 'Sudan' },
  { SR: 'Suriname' },
  { SJ: 'Svalbard and Jan Mayen' },
  { SZ: 'Swaziland' },
  { SE: 'Sweden' },
  { CH: 'Switzerland' },
  { SY: 'Syrian Arab Republic' },
  { TW: 'Taiwan' },
  { TJ: 'Tajikistan' },
  { TZ: 'Tanzania, United Republic of' },
  { TH: 'Thailand' },
  { TL: 'Timor-Leste' },
  { TG: 'Togo' },
  { TK: 'Tokelau' },
  { TO: 'Tonga' },
  { TT: 'Trinidad and Tobago' },
  { TN: 'Tunisia' },
  { TR: 'Turkey' },
  { TM: 'Turkmenistan' },
  { TC: 'Turks and Caicos Islands' },
  { TV: 'Tuvalu' },
  { UG: 'Uganda' },
  { UA: 'Ukraine' },
  { AE: 'United Arab Emirates' },
  { GB: 'United Kingdom' },
  { US: 'United States' },
  { UM: 'United States Minor Outlying Islands' },
  { UY: 'Uruguay' },
  { UZ: 'Uzbekistan' },
  { VU: 'Vanuatu' },
  { VE: 'Venezuela, Bolivarian Republic of' },
  { VN: 'Viet Nam' },
  { VG: 'Virgin Islands (British)' },
  { VI: 'Virgin Islands {.S.)' },
  { WF: 'Wallis and Futuna' },
  { EH: 'Western Sahara' },
  { YE: 'Yemen' },
  { ZM: 'Zambia' },
  { ZW: 'Zimbabwe' },
  { AX: '\xc5land Islands' },
]

export const algoMap: IObject = {
  '1.2.840.113549.2.1': 'MD2',
  '1.2.840.113549.1.1.2': 'MD2 with RSA',
  '1.2.840.113549.2.5': 'MD5',
  '1.2.840.113549.1.1.4': 'MD5 with RSA',
  '1.3.14.3.2.26': 'SHA1',
  '1.2.840.10040.4.3': 'SHA1 with DSA',
  '1.2.840.10045.4.1': 'SHA1 with ECDSA',
  '1.2.840.113549.1.1.5': 'SHA1 with RSA',
  '2.16.840.1.101.3.4.2.4': 'SHA224',
  '1.2.840.113549.1.1.14': 'SHA224 with RSA',
  '2.16.840.1.101.3.4.2.1': 'SHA256',
  '1.2.840.113549.1.1.11': 'SHA256 with RSA',
  '2.16.840.1.101.3.4.2.2': 'SHA384',
  '1.2.840.113549.1.1.12': 'SHA384 with RSA',
  '2.16.840.1.101.3.4.2.3': 'SHA512',
  '1.2.840.113549.1.1.13': 'SHA512 with RSA',
}

export const healthStatusMap: IObject = {
  'All Up': { css: 'ongoing', display: 'Up' },
  Up: { css: 'ongoing', display: 'Up' },
  'Functional Up': { css: 'warning', display: 'Functionally Up' },
  Maintenance: { css: 'warning', display: 'In Maintenance' },
  Disabled: { css: 'stopped', display: 'Disabled' },
  Down: { css: 'stopped', display: 'Down' },
  Unkn: { css: 'undefined', display: 'Unknown' },
}

export const severityMap: IObject[] = [
  { color: '#ff2e48', definition: 'Emergency' }, // 0
  { color: '#ff2e48', definition: 'Alert' }, // 1
  { color: '#ff2e48', definition: 'Critical' }, // 2
  { color: '#ff2e48', definition: 'Error' }, // 3
  { color: '#ffba47', definition: 'Warning' }, // 4
  { color: '#f0df04', definition: 'Notification' }, // 5
  { color: '#64abff', definition: 'Info' }, // 6
]

export const priorityMap: IObject = {
  critical: { color: '#ff2e48', definition: 'Critical' },
  moderate: { color: '#ffba47', definition: 'Warning' },
  low: { color: '#f0df04', definition: 'Notification' },
  informational: { color: '#64abff', definition: 'Info' },
  healthy: { color: '#64abff', definition: 'Info' },
}

// import { SlbTemplateForm } from '../settings/autogenform'
