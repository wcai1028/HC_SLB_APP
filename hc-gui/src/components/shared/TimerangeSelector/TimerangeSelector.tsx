import * as React from 'react'
import { _, A10Component } from 'a10-gui-framework'
import { Utilities } from 'src/services/Utilities'
import moment from 'moment'
import cx from 'classnames'
import {
    A10Table,
    A10Modal,
    A10DropdownMenu,
    A10Row,
    A10Col,
    A10Icon,
    A10Button,
    A10Message,
    A10SearchBar,
    A10Switch,
    A10Tag,
    A10DatePicker,
    A10Dropdown,
    A10Menu
} from 'a10-gui-widgets'
import { validations } from 'a10-gui-widgets/dist/ListInput';

export interface ITimerangeSelectorProps {
    timePeriod: moment.Moment[]
    validations?: any
    timeRanges?: any[]
    onChangeTimeRange?: (timePeriod: moment.Moment[]) => void
    onChangeCurrentTime?: () => void
}

export interface ITimerangeSelectorState {
    timePeriod: moment.Moment[]
    isOpenCustomTimeSelector: boolean
    timePeriodType: number
}

export const DEFAULT_TIME_RANGES = [
    { label: '30 Mins', type: 0 },
    { label: '1 Hour', type: 1 },
    { label: '6 Hours', type: 2 },
    { label: '1 Day', type: 3 },
    { label: '3 Days', type: 4 },
    { label: '1 Week', type: 5 },
    { label: 'Custom', type: 6 },
]

class TimerangeSelector extends A10Component<ITimerangeSelectorProps, ITimerangeSelectorState> {
    static defaultProps = {
        onChangeTimeRange: _.noop,
        onChangeCurrentTime: _.noop,
    }
    timeRanges: any[] = []
    Utilities = new Utilities()

    onDragTimeRangeSlider: any

    constructor(props: ITimerangeSelectorProps) {
        super(props)
        this.state = {
            timePeriodType: 0,
            isOpenCustomTimeSelector: false,
            timePeriod: props.timePeriod,
        }
        this.timeRanges = props.timeRanges || DEFAULT_TIME_RANGES
    }

    componentDidUpdate(prevProps: ITimerangeSelectorProps) {
        const { timePeriod } = this.props
        if (prevProps.timePeriod !== timePeriod) {
            this.setState({ timePeriod })
        }
    }

    formatTimestamp = (timestamp: number) => {
        return moment.unix(timestamp).format('M/D/YY HH:mm:ss')
    }

    getSeekValByTimePeriodType = (periodType: number) => {
        if (periodType === 0) {
            return 60 // 1 mins
        } else if (periodType === 1) {
            return 60 * 30 // 30 mins
        } else if (periodType === 2) {
            return 60 * 60 // 1 hr
        } else if (periodType === 3) {
            return 60 * 60 * 3 // 3 hrs
        } else if (periodType === 4) {
            return 60 * 60 * 6 // 6 hrs
        } else if (periodType === 5) {
            return 60 * 60 * 24 // 1 day
        }
        return 60 // 1 min
    }

    getStartTime = (periodType: number, endTime: moment.Moment): moment.Moment => {
        if (periodType === 0) {
            return endTime.subtract(30 * 60, 'seconds')
        } else if (periodType === 1) {
            return endTime.subtract(1, 'hours')
        } else if (periodType === 2) {
            return endTime.subtract(6, 'hours')
        } else if (periodType === 3) {
            return endTime.subtract(24, 'hours')
        } else if (periodType === 4) {
            return endTime.subtract(3, 'days')
        } else if (periodType === 5) {
            return endTime.subtract(7, 'days')
        }
        return endTime
    }

    changePeriodType = (e: any) => {
        const periodType = +e.key

        if (periodType === 6) {
            this.setState({ isOpenCustomTimeSelector: true })
            return
        }

        const {
            timePeriod,
            onChangeTimeRange,
        } = this.props
        const newTimePeriod = [
            this.getStartTime(periodType, timePeriod[1].clone()),
            timePeriod[1],
        ]
        onChangeTimeRange(newTimePeriod)
        this.setState({
            timePeriodType: periodType,
            timePeriod: newTimePeriod,
        })
    }

    getTimePeriodOpts = () => {
        const Item = A10Menu.Item
        return (
            <A10Menu onClick={this.changePeriodType}>
                {this.timeRanges.map((opt: any, index: number) => (
                    <Item key={opt.type} defaultValue={opt.type}>{opt.label}</Item>
                ))}
            </A10Menu>
        )
    }

    onCloseDateRangePicker = (isOpen: boolean) => {
        if (!isOpen) {
            this.setState({ isOpenCustomTimeSelector: false })
        }
    }

    changeToCurrentTime = () => {
        const { onChangeCurrentTime } = this.props
        onChangeCurrentTime()
    }

    onChangeTimePeriod = (timePeriod: number[]) => {
        const { onChangeTimeRange } = this.props
        onChangeTimeRange([
            moment.unix(timePeriod[0]),
            moment.unix(timePeriod[1]),
        ])
    }

    validateTimePeriod = (timePeriod: moment.Moment[]): boolean => {
        const { validations } = this.props
        const { showMessage } = this.Utilities
        if (validations) {
            const range = validations.range
            if (timePeriod[1].valueOf() - timePeriod[0].valueOf() > range) {
                const days = range / (24 * 60 * 60 * 1000)
                showMessage(`Date range cannot be greater than ${days} day(s)`, 0, 0)
                return false
            }
            return true
        }
        return true
    }

    selectedTimePeriodByCalendar = (timePeriod: moment.Moment[]) => {
        const { onChangeTimeRange } = this.props
        if (!this.validateTimePeriod(timePeriod)) {
            return
        }
        this.setState({ timePeriod })
        onChangeTimeRange(timePeriod)
    }


    render() {
        const { onChangeTimeRange, timePeriod: originTimePeriod } = this.props
        const { isOpenCustomTimeSelector, timePeriod } = this.state
        const timePickerClsName = cx({
            'time-picker': true,
            'radius-button': true,
        })

        let fromDtFormat = 'MMM DD, YY'
        let toDtFormat = 'MMM DD, YY'
        if (timePeriod[0].dayOfYear() === timePeriod[1].dayOfYear()) {
            fromDtFormat = 'MMM DD, YY hh:mm'
            toDtFormat = 'hh:mm'
        }
        return (
            <>
                <A10Dropdown overlay={this.getTimePeriodOpts()} className="date-picker-dropdown">
                    <A10Button size="small" className="date-picker">
                        <div className="calender" />
                        <A10Icon type="down" className="calender-arrow" />
                    </A10Button>
                </A10Dropdown>
                {isOpenCustomTimeSelector ? (
                    <A10DatePicker.A10RangePicker
                        onOpenChange={this.onCloseDateRangePicker}
                        autoFocus={true}
                        defaultValue={timePeriod}
                        open={true}
                        showTime={true}
                        onOk={this.selectedTimePeriodByCalendar}
                    />
                ) : null}
                <span className="date-label">
                    {timePeriod[0].format(fromDtFormat)}
                    <span> - </span>
                    {timePeriod[1].format(toDtFormat)}
                </span>
            </>
        )
    }

}
export default TimerangeSelector
