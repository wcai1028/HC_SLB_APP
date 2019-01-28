import * as React from 'react'
import { A10Component } from 'a10-gui-framework'
import {
    A10Tag,
} from 'a10-gui-widgets'

import { DropdownConstants } from 'src/constants/DropdownConstants/DropdownConstants'
import Utilities from 'src/services/Utilities/Utilities'

export interface IConditionProps {
    condition: any
}

class Condition extends A10Component<
    IConditionProps>
{

    Utilities = new Utilities()

    renderDetails(conditionsObj: any[], type: any) {
        return conditionsObj && conditionsObj.map((operObj: any, i: number) => {
            // let operObj = andOper[operation];
            const { getVal } = this.Utilities
            return (<div key={i}>
                {i !== 0 ? ' ' + type + ' ' : ''}
                <b> {getVal(operObj.aggregation, 'TRIGGERS', 'metricAgg').label} of </b>
                {
                    operObj.params.length > 1 ?
                        getVal(operObj.operation, 'TRIGGERS', 'operation').label + ' of (' + operObj.params.join(', ') + ')'
                        :
                        operObj.params.join(', ')
                }
                {' is '} {getVal(operObj.operator, 'TRIGGERS', 'operator').label}
                {' '} {operObj.value} 

                {
                    operObj.percent ?
                        <>
                            {' % of '}  {getVal(operObj.metricAggPercent, 'TRIGGERS', 'metricAgg').label}
                            {' '} {getVal(operObj.metricPercent, 'TRIGGERS', 'metric').label}
                        </>
                        :
                        null
                }

            </div>)
        })
    }

    render() {
        const { condition } = this.props
        if (!condition) {
            return null
        }
        const andOper = condition.and
        const orOper = condition.or
        return (
            <>
                <div>
                    {
                        this.renderDetails(andOper, 'AND')
                    }
                </div>
                <div>
                    {
                        this.renderDetails(orOper, 'OR')
                    }
                </div>
            </>
        )
    }
}

export default Condition