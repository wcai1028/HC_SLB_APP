import * as React from 'react'
import {
    A10Container,
    setupA10Container
  } from 'a10-gui-framework'
  import {
    A10Modal,
    A10Button,
    A10Icon,
    A10Col,
    A10Row,
    A10Slider,
    A10InputNumber
  } from 'a10-gui-widgets'
  import {AddLog} from 'src/components/shared/Logs/AddLog'
  import {PRFlowChart} from 'src/components/shared/Logs/PRFlowChart'
  import {PR} from 'src/components/shared/Logs/Types/PR'
  const styles = require('./styles/logs.scss')
import parameters from 'parameters'

export interface ILogsProps {
    dashboardIndex : number
    onUpdate : any
    dashboard : any
    log: any,
    onVizUpdate: any
    getLogs : any,
    updateSearchText: any
}
export interface ILogsState {
    visible: boolean,
    log : any,
    mappedFilters: any,
    logs: any,
    logsListCopy : any,
    mappedFiltersCopy: any,
    filtersCopy: any,
    logsList: any,
    searchText: string
}

class Logs extends A10Container<ILogsProps, ILogsState> {

    state = {
        visible: false,
        log : this.props.log,
        mappedFilters: new Array(),
        logs: new Array(),
        logsList: new Array(),
        logsListCopy: new Array(),
        mappedFiltersCopy: new Array(),
        filtersCopy: {},
        searchText: '*.*'
    }
    logsMap = {
      appServerIP: {
        label: 'Server IP',
        toggle: false,
        visible: true,
        range: false
      },
      appServerPort:{
        label: 'Server Port',
        toggle: false,
        visible: true,
        range: false
      },
      totalBandwidth: {
        label: 'Bandwidth',
        toggle: false,
        range: true,
        visible: true,
    }
  }
  delim = {
    filter: ',',
    filterCategory: ';'
  }

  componentDidMount(){
    this.getLogs()
  }

  componentDidUpdate(prevProps, prevState, snapshot){
    if(prevProps.log.key !== this.props.log.key){
      this.setState({
                   log : this.props.log
               },()=>{
                 this.getLogs()
               })
    }
  }

    updateModalData = (formData: any) => {
        const StoredDashBoards = JSON.parse(window.sessionStorage.getItem('DASHBOARDS'))
        StoredDashBoards[this.props.dashboardIndex]['logs'][this.props.log.key-1].viz = [formData]
        StoredDashBoards[this.props.dashboardIndex]['logs'][this.props.log.key-1].dataSet = true
        StoredDashBoards[this.props.dashboardIndex]['logs'][this.props.log.key-1].name = formData.name
        window.sessionStorage.setItem('DASHBOARDS',JSON.stringify(StoredDashBoards))
        this.props.onUpdate()
        this.props.onVizUpdate()
        this.getLogs()
    }

    handleCancel = (e: any) => {
        this.setState({
            visible: false
          })
    }

    showModal = () => {
        this.setState({
          visible: true
        })
      }

    mapLogFilters(logs: any) {
      const mappedLogFilters: any = []
      const logKeys = Object.keys(this.logsMap)
        logKeys.forEach((logKey) => {
          
          const logMapObj = this.logsMap[logKey]
          logMapObj.key = logKey
          const logObj = logs[logKey]
          
          if (logMapObj.range) {
            let min = 9999999
            let max = 0
            if (logObj) {
                const logObjKeys = Object.keys(logObj)
                logObjKeys.forEach((logObjKey) => {
                    if (parseInt(logObjKey,10) < min) {
                        min = parseInt(logObjKey,10)
                        logMapObj.min = parseInt(logObjKey,10)
                    }
                    if (parseInt(logObjKey,10) > max) {
                        max = parseInt(logObjKey,10)
                        logMapObj.max = parseInt(logObjKey,10)
                    }
                })
    
                logMapObj.minVal = parseInt(logMapObj.min,10)
                logMapObj.maxVal = parseInt(logMapObj.max,10)
                logMapObj.value = parseInt(logMapObj.min,10)
    
                logObj['all-' + logKey] = { show: true}
                logMapObj.details = logObj
                mappedLogFilters.push(logMapObj)
            }
          }
          else if (logObj) {
            logObj['all-' + logKey] = { show: true}
            logMapObj.details = logObj
            mappedLogFilters.push(logMapObj)
          }
    
        })
        return mappedLogFilters
    }

    resetFilters(){
      const mappedFiltersCopy = JSON.parse(JSON.stringify(this.state.mappedFiltersCopy))
      this.setState({
          mappedFilters: mappedFiltersCopy
        },()=> {
          this.multiFilter()
        })
    }

    getLogs(){
      let logsList = this.props.getLogs(this.props.log.viz[0])
      logsList = logsList['RPT.SLB.SLBL72ClientTTFB']
      let logs = {
        filters: {}
      }
      const indexes = Object.keys(logsList)
      for (let i = 0; i < indexes.length; i++) {
          const currentLog = logsList[indexes[i]]
          currentLog['show'] = false
          const allProbableFilters =  Object.keys(currentLog)
          for (let j = 0; j < allProbableFilters.length; j++) {
            if (logs.filters[allProbableFilters[j]]) {
              if (logs.filters[allProbableFilters[j]][currentLog[allProbableFilters[j]]]) {
                logs.filters[allProbableFilters[j]][currentLog[allProbableFilters[j]]].count++;
              } else {
                logs.filters[allProbableFilters[j]][currentLog[allProbableFilters[j]]] = {
                show : true,
                count : 1
                }
              }
            } else {
               logs.filters[allProbableFilters[j]] = { };
                logs.filters[allProbableFilters[j]][currentLog[allProbableFilters[j]]] = {
                  show : true,
                  count : 1
                }
            }
          }
      }   
      const filtersCopy = logs.filters
      const filters = this.mapLogFilters(logs.filters)
      const mappedFiltersCopy = JSON.parse(JSON.stringify(filters))
      const logsListArr = Object.keys(logsList).map((key)=>{
        return logsList[key]
      })
      this.setState({
        logs,
        logsList: logsListArr,
        logsListCopy: logsListArr,
        mappedFiltersCopy,
        mappedFilters: filters,
        filtersCopy
    })
       
    }

    // componentDidUpdate(){
    //    if(JSON.stringify(this.props.log) !== JSON.stringify(this.state.log)){
    //        this.setState({
    //            log : this.props.log
    //        })
    //    }
    // }
  
    // Show/Hide of Sub Filters
    loadLogFilters(key:any){
      const list = this.state.mappedFilters
      list.forEach((obj,index)=> {
        if(index === key){
          obj.toggle = !obj.toggle
          return
        }
      })
      this.setState({
        mappedFilters : list
      })
    }
  
    // Select All on particular Filter
    selectAllFilters(filterKey: any, filterItemKey: any){
      const filtersList = this.state.mappedFilters
      const selectedItem = filtersList[filterKey]
      const toggleValue = selectedItem.details[filterItemKey].show
      const details = selectedItem.details
      for (const key in details) {
        if (details.hasOwnProperty(key)) {
          details[key].show = !toggleValue
        }
      }
      filtersList[filterKey] = selectedItem
      const that = this
      this.setState({
        mappedFilters : filtersList
      },()=> {
        that.multiFilter()
      })
    }

    // On Range Slider change
    onSliderChange(filterKey: any, event: any,){
      const filtersList = this.state.mappedFilters
      const selectedItem = filtersList[filterKey]
      selectedItem.value = event
      filtersList[filterKey] = selectedItem
      const that = this
      this.setState({
        mappedFilters : filtersList
      },()=> {
        that.multiFilter()
      })
    }

    // On Filter Change
    toggleFilterSelection(filterKey: any, filterItemKey: any){
      const filtersList = this.state.mappedFilters
      const selectedItem = filtersList[filterKey]
      selectedItem.details[filterItemKey].show = !selectedItem.details[filterItemKey].show
      const details = selectedItem.details
      let count = 0
      for (const key in details) {
        if (details.hasOwnProperty(key) && key !== 'all-'+selectedItem.key && details[key].show){
            count++
          }
        }
      if(count === Object.keys(selectedItem.details).length - 1) {
        details['all-'+selectedItem.key].show = true
      }else{
        details['all-'+selectedItem.key].show = false
      }
      filtersList[filterKey] = selectedItem
      const that = this
      this.setState({
        mappedFilters : filtersList
      },()=> {
        that.multiFilter()
      })
    }


  
    // Makes a filter object of below format
    // {
    //   "appServerIP":["44.44.44.203","","44.44.44.204","all-appServerIP"],
    //   "appServerPort":["0","80","all-appServerPort"],
    //   "totalBandwidth":[439]
    // }
    multiFilter = () => {
      const filters = {}
      this.state.mappedFilters.forEach((filter)=> {
        if(!filter.range){
          const details = filter.details
          const values = []
          for (const key in details) {
            if (details.hasOwnProperty(key) && details[key].show) {
                values.push(key)
            }
          }
          if(values.length > 0){
            filters[filter.key] = values
          }
        }else{
          filters[filter.key] = [filter.value]
        }
        
      })
      const updatedList =  this.multiFilterList(filters)
      const searchText = this.generateFilterString(this.state.mappedFilters)
      console.log('searchText', searchText)
      this.props.updateSearchText(searchText)
      // console.log(this.mapFilterFromStr(this.state.searchText, this.state.mappedFilters, this.state.filtersCopy))
      this.setState({
      logsList : updatedList
      })
    }

    multiFilterList = (filters: any) => {
      const filterKeys = Object.keys(filters)
      // Gives a list which has range property enabled
      const rangeList: any[] = []
      for (const key in this.logsMap) {
        if (this.logsMap.hasOwnProperty(key) && this.logsMap[key].range) {
          rangeList.push(key)
        }
      }
      // Filter from Original Array 
      const list = this.state.logsListCopy
      return list.filter((eachObj,index) => {
        return filterKeys.every(eachKey => {
          // passing an empty filter means that filter is ignored.
          if (!filters[eachKey].length) {
            return true 
          }
          // Check for Range
          if(rangeList.indexOf(eachKey) > -1 && parseInt(filters[eachKey][0],10) <= parseInt(eachObj[eachKey],10)) {
            return true
          }
          return filters[eachKey].includes(eachObj[eachKey].toString())
        })
      })
    }

    parseFilterString(filterStr: any, mappedFilters: any): any {
      const filters = {}
      if (filterStr !== '*.*') {
          const filterCategoryArr = filterStr.split(this.delim.filterCategory)
          filterCategoryArr.forEach((category: any) => {
              const filterName = category.split('=')[0]
              const filterValues = category.split('=')[1]
              if (filterValues === '*') {
                  filters[filterName] = '*'
              } else {
                  filters[filterName] = filterValues.split(this.delim.filter)
              }
          }, this)
      } else {
          mappedFilters.forEach((mappedFilter: any) => {
              filters[mappedFilter.label] = '*'
          })
      }
      return filters
    }

  mapFilterFromStr(filterStr: any, mappedFilters: any, filters: any) : any {
      // preprocess
      filterStr = filterStr.replace(/;*$/, '') // removes last ; if exists
      const thisObj = this

      const parsedFilters = this.parseFilterString(filterStr, mappedFilters)
      const parsedFilterKeys = Object.keys(parsedFilters)
      parsedFilterKeys.forEach((filterName: any) => {
          const filterId = thisObj.getFilterIdByName(filterName, mappedFilters)
          if(!filters[filterId]){
              return false
          }
          const filterKeys = Object.keys(filters[filterId])               
          filterKeys.forEach((parsedFilter) => {
              if (parsedFilters[filterName] !== '*') {
                  if (parsedFilters[filterName].indexOf(parsedFilter) > -1) {
                      filters[filterId][parsedFilter].show = true
                  } else {
                      filters[filterId][parsedFilter].show = false
                  }
              } else {
                  filters[filterId][parsedFilter].show = true
              }
          })
      }, this)
      return filters
  }

  getFilterIdByName(name: any, mappedFilters: any) : any {
    let filterId = ''
    mappedFilters.forEach((mappedFilter: any) => {
        if (mappedFilter.label === name) {
            filterId = mappedFilter.key
        }
    })
    return filterId
  }

  formatFilterString(mappedFilter: any) {
    let formattedString = '*'
    if (!mappedFilter.details['all-' + mappedFilter.key].show) {
        formattedString = ''
        const that = this
        const filterKeys = Object.keys(mappedFilter.details)
        filterKeys.forEach((filterKey, j) => {
            if (mappedFilter.details[filterKey].show) {
                if (formattedString !== '') {
                    formattedString = formattedString + that.delim.filter
                }
                formattedString = formattedString +  filterKey
            }
        })
    }
    return formattedString
  }
  generateFilterString(mappedFilters: any) {
      let filterStr = '*.*'
      const isNoFilters = this.isNoFilters(mappedFilters)
      if (!isNoFilters) {
          filterStr = ''
          const that = this
          mappedFilters.forEach((mappedFilter: any, i: any) => {
              const formattedFilterStr = that.formatFilterString(mappedFilter)
              if (filterStr !== '') {
                  filterStr = filterStr + that.delim.filterCategory
              }
              filterStr = filterStr +  (mappedFilter.label + '=' + formattedFilterStr)
          })
      }
      return filterStr
  }

  isNoFilters(mappedFilters: any) {
    let isNoFilters = true
    mappedFilters.forEach((mappedFilter: any) => {
        if (!mappedFilter.details['all-' + mappedFilter.key]['show']) {
            isNoFilters = false
        }
    })
    return isNoFilters
  }

    render(){
        const mode = parameters.MODE
        return(
            <>
            <A10Row>
              <A10Col span={2}>
              {this.props.log.name} - {this.props.log.key}
              </A10Col>
              <A10Col span={2}>
                {mode === 'DEVELOPMENT' ? 
                <>
                  <A10Button className="action-button" onClick={this.showModal}>
                            Edit <A10Icon
                                      app="global"
                                      type="edit"
                                      className="action-icon"
                                    />
                  </A10Button>
                  </>
                  
                  
                  : 
                  null}
                </A10Col>
            </A10Row>
            <A10Modal
            title="Add Log"
            width = "1080px"
            visible={this.state.visible}
            destroyOnClose={true}
            footer={null}
            zIndex={2049}>
                <AddLog updateModalData={this.updateModalData}
                        isEdit = {true} 
                        logForm = {this.props.log.viz[0]}
                        handleCancel= {this.handleCancel}/>
            </A10Modal>

            
            <A10Row className="logs_custom">
              <A10Col span={6}>
                <div  className="logs-filters">
                    <div className="filter-title">FILTER
                      <span className="link-blue-text pull-right"  onClick={()=>{this.resetFilters()}} title="Reset Filters">Reset</span>
                    </div>
                      <ul className="filter-category">
                      {
                        this.state.mappedFilters.length > 0 && this.state.mappedFilters.map((filterObj, filterKey) => (
                          <li id={'li'+ filterKey} key={filterKey}>
                            <div id={'div'+filterKey} onClick={()=>this.loadLogFilters(filterKey)} className="handCursor">
                                <span className={filterObj.toggle ? 'fa fa-caret-down': 'fa fa-caret-right'}/>
                                <span className="filter-name">{filterObj.label}</span>
                            </div>
                            {!filterObj.range ?
                            <>
                              {filterObj.toggle ? 
                                  <ul id={'list'+filterKey} key={'list'+filterKey} className="filter-items">
                                  {Object.keys(filterObj.details).map((filterItemKey) => (
                                    <>
                                    {!(filterItemKey.indexOf('all-') > -1) ? 
                                          <li id={filterKey + filterItemKey} key={filterKey + filterItemKey}>
                                            {filterItemKey.indexOf('all-') === -1 ? 
                                            <div className="handCursor">
                                              <input id={filterItemKey} checked={filterObj.details[filterItemKey].show} type="checkbox"
                                                  onChange={()=>this.toggleFilterSelection(filterKey, filterItemKey)} />
                                              <label htmlFor={filterItemKey} title={filterItemKey} className="handCursor">
                                                  <span className="log_text">{filterItemKey}</span>
                                                  <span className="count">({filterObj.details[filterItemKey].count})</span>
                                              </label>
                                            </div>
                                            : null}
                                          </li>
                                          : 
                                          <li id={'all-'+ filterItemKey} key={'all-'+ filterItemKey}>
                                            <div className="all-category">
                                            <div className="handCursor">
                                                <input id={filterItemKey} checked={filterObj.details[filterItemKey].show} type="checkbox" onChange={()=>this.selectAllFilters(filterKey, filterItemKey)}/>
                                                <label htmlFor={filterItemKey} className="handCursor">Select All</label>
                                            </div>
                                            </div>
                                          </li> 
                                      }
                                    </>
                                    ))
                                  }
                                </ul>
                                : null}
                              </>
                              : 
                              <>
                              {filterObj.toggle ? 
                                  <div key={'slider'+filterKey} className="filter-items">
                                  <A10Row>
                                    <A10Col span={16}>
                                    < A10Slider defaultValue={30} value={filterObj.value} onChange={this.onSliderChange.bind(this,filterKey)}  min={filterObj.minVal ? filterObj.minVal : 0} max={filterObj.max ? filterObj.max : 0}/>
                                    </A10Col>
                                    <A10Col span={8}>
                                        <A10InputNumber
                                            min={filterObj.minVal ? filterObj.minVal : 0}
                                            max={filterObj.max ? filterObj.max : 0}
                                            style={{ marginLeft: 20, width: '55px' }}
                                            value={filterObj.value}
                                            onChange={this.onSliderChange.bind(this,filterKey)}
                                        />
                                    </A10Col>
                                </A10Row>
                                  </div>
                              : null
                              }
                            </>
                            }
                          </li>
                          ))
                        }
                    </ul>
                </div>
              </A10Col>
              <A10Col span={18}>
                <PR logsList={this.state.logsList} />
            </A10Col>
          </A10Row>
            </>
        )
    }
}

export default setupA10Container(Logs)
