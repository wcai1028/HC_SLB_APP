import React from 'react'
import parameters from 'parameters'

import DropdownConstants from 'src/constants/DropdownConstants/DropdownConstants'
import { A10Select, A10Message } from 'a10-gui-widgets'
import { getItem } from '../../../node_modules/a10-gui-widgets/dist/SlidingPage'
import { Messages } from 'src/locale/en/Messages'

export class Utilities {
  DropdownConstants = new DropdownConstants()
  Messages = new Messages()

  metrics = {
    quantity: {
      G: 1000 * 1000 * 1000,
      M: 1000 * 1000,
      K: 1000,
    },
    bytes: {
      G: 1024 * 1024 * 1024,
      M: 1024 * 1024,
      K: 1024,
    },
  }
  sortString = (a: any, b: any, key: string) => {
    return a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0
  }
  sortDate = (a: any, b: any, key?: string) => {
    key = key || 'createdAt'
    return Date.parse(a[key]) - Date.parse(b[key])
  }
  sortObj = (a: any, b: any, key: string, valProp: string) => {
    const aVal = a[key] ? a[key][valProp] : 0
    const bVal = b[key] ? b[key][valProp] : 0
    return aVal - bVal
  }
  getLatestRecordFromBucket = (buckets: any) => {
    let result = 0
    if (buckets) {
      let ts = 0
      for (const key in buckets) {
        if (parseInt(key, 10) > ts) {
          ts = parseInt(key, 10)
          result = buckets[key]
        }
      }
    }
    if (isNaN(result)) {
      return 0
    }
    return result
  }
  getIntValue = (val: any, decimalDigits: any, roundOff: any) => {
    val = typeof val === 'string' ? parseFloat(val) : val
    decimalDigits = decimalDigits && decimalDigits !== 0 ? decimalDigits : 0
    let valString: any = 0
    if (val < 10) {
      if (val < 1 && decimalDigits > 1) {
        decimalDigits = 2
      } else {
        decimalDigits = 1
      }

      valString = val % 1 === 0 ? val : val.toFixed(decimalDigits || 1)
      if (valString === '0.0') {
        valString = 0
      }
    } else {
      val = roundOff ? Math.round(val) : val
      val = val % 1 === 0 ? val : val.toFixed(0)
      valString = val
    }
    return valString
  }
  truncateVal = (
    val: any,
    metricType: string,
    decimalDigits?: any,
    roundOff?: any,
  ) => {
    metricType = metricType === 'bytes' ? metricType : 'quantity'
    let suffix = ''
    const metric = this.metrics[metricType]
    if (val > metric.G) {
      val = val / metric.G
      suffix = 'G'
    } else if (val > metric.M) {
      val = val / metric.M
      suffix = 'M'
    } else if (val > metric.K) {
      val = val / metric.K
      suffix = 'K'
    } else {
      val = !isNaN(val) && val !== 0 && val !== 'NaN' ? val : 0
    }
    val = val > 0 ? val : 0
    val = this.getIntValue(val, decimalDigits, roundOff)
    val = val + suffix
    return val
  }
  search = (scope: any, searchStr: string, searchBy?: string, params?: any) => {
    searchBy = searchBy ? searchBy : 'name'
    const storageName = params && params.storageName ? params.storageName : 'ALL_DATA'
    const stateName = params && params.stateName ? params.stateName : 'allData'
    let allData = [
      ...JSON.parse(window.sessionStorage.getItem(storageName) || '[]'),
    ]

    if (params && params.storeData) {
      allData = params.storeData
    }

    allData = allData.filter((obj: any) => {
      return (
        obj[searchBy]
          .toLowerCase()
          .indexOf(searchStr.toLowerCase()) > -1
      )
    })

    scope.setState({
      [stateName]: allData,
      searchString: searchStr,
    })
  }
  validateEmail = (emails: any): boolean => {
    let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let hasInvalidEmail = false;
    if (emails instanceof Array) {
      emails.forEach((email: string) => {
        if (!re.test(email)) {
          hasInvalidEmail = true;
        }
      })
    } else {
      hasInvalidEmail = !re.test(emails);
    }
    return !hasInvalidEmail;
  }
  validateName = (name: string): boolean => {
    const nameRegex = /^([.a-zA-Z0-9 _-]){1,15}$/;
    return !!name.match(nameRegex);
  }
  validateField = (e: any): boolean => {
    if (e && e.nativeEvent) {
      const event = e.nativeEvent
      if (!event.target.validity.valid) {
        this.showMessage(event.target.validationMessage, 0, 0)
        return false
      }
      return true
    }
    return true
  }
  getDropdownDefault = (key: string, section: string): string => {
    let defaultOpt = { key: '', value: '' }
    let dropdownOpts = this.DropdownConstants[section][key]
    dropdownOpts.map((opt: any, i: number) => {
      if (opt.default) {
        defaultOpt = opt
      }
    })
    return defaultOpt.value
  }
  getVal = (key: string, section: string, type: string): any => {
    let dropdowns = this.DropdownConstants[section][type] || [];
    let val = '';
    dropdowns.forEach((element: any) => {
      if (element.value === key) {
        val = element;
      }
    });
    return val;
  }
  renderDropdownOpts = (key: any, type?: string, labelKey?: string, render?: any) => {
    if (key instanceof Array) {
      return key.length > 0
        ? key.map((option: any, i: number) => {
          return (
            <A10Select.Option key={option[labelKey]} value={JSON.stringify(option)}>
              {option[labelKey]}
            </A10Select.Option>
          )
        })
        : null
    } else {
      let dropdownOpts = this.DropdownConstants[type][key]
      return dropdownOpts
        ? dropdownOpts.map((key: any, i: number) => {
          return (
            <A10Select.Option key={key.key} value={key.value}>
              {
                render ?
                  <>{render(key)}</>
                  :
                  key.label
              }
            </A10Select.Option>
          )
        })
        : null
    }
  }
  launchApp = (app: any) => {
    let baseURL = parameters.BASE_URL.replace(':8443/api/v2', '') + "/hcapps/" + getItem('PROVIDER_ID');

    let queryString = "?user_id=" + getItem('USER_ID') +
      "&provider=" + getItem('PROVIDER') +
      "&token=" + getItem('USER_SESSION_ID') +
      (getItem('CURRENT_TENANT') ? "&tenant=" + JSON.parse(getItem('CURRENT_TENANT')).name : '');

    let url = baseURL + '/' + app.name + '_' + app.version + queryString + '&app_svc=' + app.name + '&app_svc_type=' + app.app_svc_type + '&action=config'
    window.open(url, '_blank');
  }
  parseChartData = (resp: any, widgetConfig: any): any => {
    let parsedData: Array<any> = [];
    if (resp == null) {
      /* 20170913: To initialize the High chart to show 'No Data Available' if response is empty */
      return parsedData;
    }

    let interval: any = widgetConfig.query.histogram ? (widgetConfig.query.histogram.interval / 1000) : 1;
    let timeperiod: any = (widgetConfig.query.rangeby.end - widgetConfig.query.rangeby.start) / 1000;

    widgetConfig.fields.forEach((field: any, index: number) => {
      if (!widgetConfig.histogramField) {
        let key = field.key + '_' + (field.aggregation ? field.aggregation : widgetConfig.aggregation);
        let val = resp[key];

        val = (isNaN(val) || val === 'NaN') ? 0 : val;
        val = field.divisionByPeriod ? val / timeperiod : val;
        val = widgetConfig.ceil ? Math.ceil(val) : val;

        if (val >= 0) {
          parsedData.push({
            name: field.label,
            data: [val],
            type: field.type,
            visible: !field.hide,
            units: field.units, // extra data
            key: field.key, // extra data,
            mergeWith: field.mergeWith, // extra data,
            showForApp: field.showForApp, // extra data,
            color: field.color
          });
        }

      } else if (resp[field.key + '_' + (field.aggregation ? field.aggregation : widgetConfig.aggregation)]) {
        let val = resp[field.key + '_' + (field.aggregation ? field.aggregation : widgetConfig.aggregation)];

        let valKeys = Object.keys(val);

        parsedData.push({
          name: field.label,
          data: [],
          type: field.type,
          visible: !field.hide,
          units: field.units, // extra data
          key: field.key, // extra data,
          mergeWith: field.mergeWith, // extra data,
          showForApp: field.showForApp, // extra data,
          color: field.color
        });
        valKeys.forEach((key: any) => {
          var date = parseInt(key);
          var value = (isNaN(val[key]) || val[key] === 'NaN') ? 0 : val[key];
          value = field.divisionByPeriod ? value / timeperiod : value;
          value = field.divisionByInterval ? value / interval : value;
          value = widgetConfig.ceil ? Math.ceil(value) : value;
          if (value !== Infinity && value != "Infinity" && value >= 0 && val[key] !== 'NaN') {
            parsedData[index].data.push([date, value]);
          }
        });
      }
    });
    return parsedData;
  }
  buildQuery = (widgetConfig: any, startDt: any, endDt: any) => {
    let interval = this.getPointGranularity(startDt, endDt);
    let query: any = {};
    query = widgetConfig.query || {};
    query.fields = [];
    widgetConfig.fields.forEach((field: any) => {
      query.fields.push(field.key);
    });
    query.aggregation = widgetConfig.aggregation || 'count';
    query.sort = widgetConfig.sort;

    query.groupby = widgetConfig.groupBy;
    query.size = widgetConfig.size;
    query.serviceId = widgetConfig.serviceId;

    query.rangeby = {
      start: startDt,
      end: endDt,
      field: widgetConfig.rangebyField || 'timestamp'
    };

    if (widgetConfig.histogramField) {
      query.histogram = {
        field: widgetConfig.histogramField,
        interval
      };
    };

    query.filterby = widgetConfig.filterBy || {}

    if (query.filterby == 'delete') {
      delete query.filterby
    }

    let tenant: any = JSON.parse(sessionStorage.getItem('CURRENT_TENANT'));
    if (query.filterby) {
      if (!query.filterby.and) {
        query.filterby.and = {};
      }
      // query.filterby.and.account_id = tenant.name;
    }
    widgetConfig.query = query;
    return query;
  }
  getPointGranularity = (fromDate: any, toDate: any) => {
    let interval: any = 60000; // default 1 min
    let timeDiff: any = 0;
    // creating moment instances
    timeDiff = toDate - fromDate;
    let date = new Date().getTime();
    if (timeDiff > 300000) {
      interval = parseInt(timeDiff / 100);
      interval = Math.floor(interval / 60000);
      interval = interval * 60000;
    } else {
      interval = 60000;
    }

    if (interval < 60000) {
      interval = 60000;
    }

    // If timediff is greater than 30 days & interval is less than 10 mins
    if (timeDiff > (30 * 24 * 60 * 60 * 1000) && interval < 10 * 60 * 1000) {
      interval = 10 * 60 * 1000;
    }
    if ((date - toDate > 30 * 24 * 60 * 60 * 1000) && interval < 10 * 60 * 1000) {
      interval = 10 * 60 * 1000;
    }
    return interval;
  }
  showMessage = (key: string | any, type: number, isKey: number | boolean, readMore?: string) => {
    const message = (!isKey || isKey === 0) ? key : this.Messages[key]

    A10Message.destroy()
    if (type === 0) {
      A10Message.error(message, 10, close)
    } else if (type === 1) {
      A10Message.success(message, 10, close)
    } else {
      A10Message.info(message, 10, close)
    }
  }

  validateAndSubmitForm = (props: any) => {
    const { form } = props
    form.validateFieldsAndScroll({ force: true }, (err: any, values: any) => {
      if (!err) {
        props.onSubmitForm()
      }
    })
  }
}

export default Utilities
