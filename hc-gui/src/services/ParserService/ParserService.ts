
import { QueryService } from 'src/services/QueryService'
export class ParserService {
  // UrlService = new UrlService()
  // AjaxService = new AjaxService()
  // AppRoot = new AppRoot()
  // Data = new Data()
  QueryService = new QueryService()
  

  parseData=(viz: any, startTime : number, endtTime : number)=>{
    let dataSource = viz.queries[0].dataSource

    //for now we are supporting RPT, in future any supoted datasource will have to be entered here
    switch(dataSource){
      case 'RPT' : 
        return this.parseRPTData(viz)
      default:
        return  ({
          "hello" : "noQuery"
        })
    }
   
  }
  evaluate = (a: any,b:any,op:any)=>{
    switch(op){ 
      case '+': return a + b
      case '-': return b - a 
      case '*': return a * b 
      case '/': return b > 0 ? b/a : 0 
    } 
  }
  calculateInfix =(infix : any)=>{ 
    let stack = []
    let result = ''
    let closeBraceMap = {
      ')' : '(',
      '}' : '{'
    }
    let symbols = ["+","/","-","*","(",")","^"]
    for(let i=0;i<infix.length;i++){
      let characterInput = infix[i]
        if(characterInput !== ')' && characterInput!== '}'){
        
          stack.push(characterInput)
          
        }else{
          let closeBraceType = closeBraceMap[characterInput]
          let val = ''
          let op = ''
           while(stack[stack.length -1] !== closeBraceType){
              let popped = stack.pop()
          
              if(symbols.indexOf(popped) > -1){
                op = popped
              }else{
                if(val === ''){
                  val = popped
                }else{
                  val = this.evaluate(val,popped,op)
                }
              }
             // stack[stack.length -1 ] = val
            }
            stack[stack.length -1 ] = val  
        }
       
      }
      if(stack.length === 1){
        result = stack.pop()
        return parseFloat(parseFloat(result).toFixed(2))
      }else{
        result = this.evaluate(stack[0],stack[2],stack[1])
      }
     return  parseFloat(parseFloat(result).toFixed(2))
  }

  parseRPTData(viz : any,startTime : number, endtTime : number){
    viz.mergedResponses = {}
    let data : any= []
    for(let i=0;i<viz.responses.length;i++){
      viz.mergedResponses = {...viz.mergedResponses,...viz.responses[i]}
    }
    
    let groupby = viz.queries[0].groupBy
    let isHistogram = viz.displayProperties.visualizationType === "nonHistograms" ? false : true
    let symbols = ["+","/","-","*","(",")","^"]
    if(groupby == ""){ // non grouped graph
      if(isHistogram){ // non grouped histogram field , these will generate time series grouped by some property shwowing how the property chanhed with time
        let timeStamps = Array()
        let timeStampKeys = Object.keys(viz.mergedResponses)
        for(let t=0;t<timeStampKeys.length;t++){
          timeStamps = [...timeStamps,...Object.keys(viz.mergedResponses[timeStampKeys[t]])]
        }
        timeStamps = Array.from(new Set(timeStamps))
        
        for(let i=0;i<viz.displayProperties.seriesArr.length;i++){
          let tempData = []
          let series = viz.displayProperties.seriesArr[i]
          series.formula =  series.formula.replace(/\s/g, '')
          for(let j=0;j<symbols.length;j++){
            let tempSymbol = symbols[j]
            let replaced =  ' '+ tempSymbol + ' '
            series.formula =  series.formula.split(tempSymbol).join(replaced)
          }
          let formula = series.formula.split(' ')
          for(let e=0;e<timeStamps.length;e++){

            let formulaReplacedWithValues = new Array()
            formulaReplacedWithValues.push('(')
            for(let k=0;k<formula.length;k++) {
              if(formula[k] !== ""){
                if(symbols.indexOf(formula[k]) > -1){
                  formulaReplacedWithValues.push(formula[k])
                }else if(!isNaN(parseFloat(formula[k]))){
                  formulaReplacedWithValues.push(parseFloat(formula[k]))
                }else{
                  if(formula[k] === 'timeSeriesInterval'){
                    if(viz.displayProperties.annotation === "topindicators"){
                      formulaReplacedWithValues.push(180)
                    }else{
                      formulaReplacedWithValues.push(this.QueryService.getInterval(startTime,endtTime)/1000)
                    }
                  }else
                  {let responseKeys = Object.keys(viz.mergedResponses)
                  for(let l=0;l<responseKeys.length;l++){
                    if((formula[k]+'_sum' === responseKeys[l]) 
                    || (formula[k]+'_avg' === responseKeys[l]) 
                    || (formula[k]+'_max' === responseKeys[l])
                    || (formula[k]+'_min' === responseKeys[l])
                    || (formula[k]+'_count' === responseKeys[l])
                     ){
                     formulaReplacedWithValues.push(viz.mergedResponses[responseKeys[l]][timeStamps[e]])
                    }
                  } }
                }
              }
            }
            formulaReplacedWithValues.push(')')
            let calulatedData = this.calculateInfix(formulaReplacedWithValues)
            if(viz.displayProperties.annotation === "topindicators"){
              calulatedData = calulatedData/3
            }
            tempData.push([parseInt(timeStamps[e]),calulatedData])
          }
          viz.displayProperties.seriesArr[i].data = tempData
        //  viz.displayProperties.seriesArr[i].name = 'Test'//viz.displayProperties.seriesArr[i].series
       }
      }else{
         // non grouped non histogram field, these will be generating a single  number or set of numbers to be shown seperatly
          for(let i=0;i<viz.displayProperties.seriesArr.length;i++){
              let series = viz.displayProperties.seriesArr[i]
              series.formula =  series.formula.replace(/\s/g, '')
              for(let j=0;j<symbols.length;j++){
                let tempSymbol = symbols[j]
                let replaced =  ' '+ tempSymbol + ' '
                series.formula =  series.formula.split(tempSymbol).join(replaced)
              }
              let formula = series.formula.split(' ')
              let formulaReplacedWithValues = new Array()
              formulaReplacedWithValues.push('(')
              for(let k=0;k<formula.length;k++)
              {
                if(formula[k] !== ""){
                  if(symbols.indexOf(formula[k]) > -1){
                    formulaReplacedWithValues.push(formula[k])
                  }else if(!isNaN(parseFloat(formula[k]))){
                    formulaReplacedWithValues.push(parseFloat(formula[k]))
                  }else{
                    if(formula[k] === 'timeSeriesInterval'){
                      if(viz.displayProperties.annotation === "topindicators"){
                        formulaReplacedWithValues.push(180)
                      }else{
                        formulaReplacedWithValues.push(this.QueryService.getInterval(startTime,endtTime)/1000)
                      }
                    }else{
                      let responseKeys = Object.keys(viz.mergedResponses)
                      for(let l=0;l<responseKeys.length;l++){
                        if((formula[k]+'_sum' === responseKeys[l]) 
                        || (formula[k]+'_avg' === responseKeys[l]) 
                        || (formula[k]+'_max' === responseKeys[l])
                        || (formula[k]+'_min' === responseKeys[l])
                        || (formula[k]+'_count' === responseKeys[l])
                        ){
                          formulaReplacedWithValues.push(viz.mergedResponses[responseKeys[l]])
                        }
                      }
                    }
                    
                  }
                  
                }
              }
              formulaReplacedWithValues.push(')')
              data = this.calculateInfix(formulaReplacedWithValues)
             
              if(viz.displayProperties.annotation === "topindicators"){
                data = data/3
              }
              viz.displayProperties.seriesArr[i].data = [data]
         //     viz.displayProperties.seriesArr[i].name = viz.displayProperties.seriesArr[i].series
             
          }
      }
    }else{ // grouped graphs
      if(isHistogram){ // grouped histogram field , these will generate time series grouped by some attribute  and property like how the latency of servers changed over time
        let groups = Object.keys(viz.mergedResponses)
        
        for(let i=0;i<viz.displayProperties.seriesArr.length;i++){
          let tempData = []
          let series = viz.displayProperties.seriesArr[i]
         // viz.displayProperties.seriesArr[i].data = []
          series.formula =  series.formula.replace(/\s/g, '')
          for(let j=0;j<symbols.length;j++){
            let tempSymbol = symbols[j]
            let replaced =  ' '+ tempSymbol + ' '
            series.formula =  series.formula.split(tempSymbol).join(replaced)
          }
          let formula = series.formula.split(' ')
          for(let e=0;e<groups.length;e++){
            if(groups[e] === ''){
              viz.mergedResponses['Unknown'] = viz.mergedResponses[groups[e]]
              delete viz.mergedResponses[groups[e]]
              groups[e] = 'Unknown'
             
            }
            
            tempData.push({
              "name" : groups[e],
              "data" : []
            })
            let index = tempData.length -1
            let timeStamps = Array()
            let timeStampKeys = Object.keys(viz.mergedResponses[groups[e]])
            for(let t=0;t<timeStampKeys.length;t++){
              timeStamps = [...timeStamps,...Object.keys(viz.mergedResponses[groups[e]][timeStampKeys[t]])]
            }
            timeStamps = Array.from(new Set(timeStamps))
            for(let t=0;t<timeStamps.length;t++){
              let formulaReplacedWithValues = new Array()
              formulaReplacedWithValues.push('(')
              for(let k=0;k<formula.length;k++) {
                if(formula[k] !== ""){
                  if(symbols.indexOf(formula[k]) > -1){
                    formulaReplacedWithValues.push(formula[k])
                  }else if(!isNaN(parseFloat(formula[k]))){
                    formulaReplacedWithValues.push(parseFloat(formula[k]))
                  } else{
                    if(formula[k] === 'timeSeriesInterval'){
                      if(viz.displayProperties.annotation === "topindicators"){
                        formulaReplacedWithValues.push(180)
                      }else{
                        formulaReplacedWithValues.push(this.QueryService.getInterval(startTime,endtTime)/1000)
                      }
                    }else
                    {
                      let responseKeys = Object.keys(viz.mergedResponses[groups[e]])
                    for(let l=0;l<responseKeys.length;l++){
                      if((formula[k]+'_sum' === responseKeys[l]) 
                      || (formula[k]+'_avg' === responseKeys[l]) 
                      || (formula[k]+'_max' === responseKeys[l])
                      || (formula[k]+'_min' === responseKeys[l])
                      || (formula[k]+'_count' === responseKeys[l])
                      ){
                      formulaReplacedWithValues.push(viz.mergedResponses[groups[e]][responseKeys[l]][timeStamps[t]])
                      }
                    }} 
                  }
                  
                //  tempData[index].data.push([parseInt(timeStamps[t]),this.calculateInfix(formulaReplacedWithValues)])
                }
              }
              formulaReplacedWithValues.push(')')
              if(groups[e] === ''){
                groups[e] = 'Unknown'
              }
              let calulatedData = this.calculateInfix(formulaReplacedWithValues)
             
              if(viz.displayProperties.annotation === "topindicators"){
                calulatedData = calulatedData/3
              }
              tempData[index].data.push([parseInt(timeStamps[t]),calulatedData])
            }
          }
         viz.displayProperties.seriesArr[i].data = tempData //data
       //   viz.displayProperties.seriesArr[i].name = viz.displayProperties.seriesArr[i].series
       }
       viz.displayProperties.seriesArr =  viz.displayProperties.seriesArr[0] ? viz.displayProperties.seriesArr[0].data : []
      //  viz.displayProperties.seriesArr[0].data
      
      }else{ // grouped non histogram field, these will be generating series showing dtaa for diffrenet attrinues like requests for clients
        let groups = Object.keys(viz.mergedResponses)
       

        for(let i=0;i<viz.displayProperties.seriesArr.length;i++){
          let tempData = []
          let series = viz.displayProperties.seriesArr[i]
          series.formula =  series.formula.replace(/\s/g, '')
          for(let j=0;j<symbols.length;j++){
            let tempSymbol = symbols[j]
            let replaced =  ' '+ tempSymbol + ' '
            series.formula =  series.formula.split(tempSymbol).join(replaced)
          }
          let formula = series.formula.split(' ')
          for(let e=0;e<groups.length;e++){

            let formulaReplacedWithValues = new Array()
            formulaReplacedWithValues.push('(')
            for(let k=0;k<formula.length;k++) {
              if(formula[k] !== ""){
                if(symbols.indexOf(formula[k]) > -1){
                  formulaReplacedWithValues.push(formula[k])
                }else if(!isNaN(parseFloat(formula[k]))){
                  formulaReplacedWithValues.push(parseFloat(formula[k]))
                }else{
                  if(formula[k] === 'timeSeriesInterval'){
                    if(viz.displayProperties.annotation === "topindicators"){
                      formulaReplacedWithValues.push(180)
                    }else{
                      formulaReplacedWithValues.push(this.QueryService.getInterval(startTime,endtTime)/1000)
                    }
                  }else
                  {
                    let responseKeys = Object.keys(viz.mergedResponses[groups[e]])
                  for(let l=0;l<responseKeys.length;l++){
                    if((formula[k]+'_sum' === responseKeys[l]) 
                    || (formula[k]+'_avg' === responseKeys[l]) 
                    || (formula[k]+'_max' === responseKeys[l])
                    || (formula[k]+'_min' === responseKeys[l])
                    || (formula[k]+'_count' === responseKeys[l])
                     ){
                     formulaReplacedWithValues.push(viz.mergedResponses[groups[e]][responseKeys[l]])
                    }
                  } }
                }
              }
            }
            formulaReplacedWithValues.push(')')
            if(groups[e] === ''){
              groups[e] = 'Unknown'
            }
            let calulatedData = this.calculateInfix(formulaReplacedWithValues)
             
              if(viz.displayProperties.annotation === "topindicators"){
                calulatedData = calulatedData/3
              }
            tempData.push([groups[e],calulatedData])
          }
          viz.displayProperties.seriesArr[i].data = tempData
      //    viz.displayProperties.seriesArr[i].name = viz.displayProperties.seriesArr[i].series
       }
      }
    }
   return viz //Math.round( (Math.random() * 1000) + 1)  
  }
}

export default ParserService





