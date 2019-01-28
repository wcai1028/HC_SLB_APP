import * as React from 'react'
import { A10Component, setupA10Container } from 'a10-gui-framework'
import {
  A10Row,
  A10Col,
  A10InputNumber,
  A10Input,
  A10Tooltip,
  A10Label,
} from 'a10-gui-widgets'
import './styles/rangeslider.scss'

// restrict : Red Section - slider cant go beyond this point
// allotted : Green Section - Total allotted
export interface IRangerSliderProps {
  restrict: number
  allotted: number
  max: number
  min: number
  units: string
  inputFixedText: boolean
  placeholder: string
  name: string
  onChange?: (data: any) => void
}

// newValue: blue section
export interface IRangerSliderState {
  currentSliderValue: number
  newValue: number
}

class RangeSlider extends A10Component<IRangerSliderProps, IRangerSliderState> {
  USED = 'Being used $$@@$$'
  AVAILABLE = 'Available $$@@$$'
  CHANGE = 'Change to $$@@$$'

  greenMessage: string
  blueMessage: string
  redMessage: string
  bluePercentage: string
  redPercentage: string
  greenPercentage: string

  constructor(props: IRangerSliderProps) {
    super(props)
    this.state = {
      currentSliderValue: this.props.allotted,
      newValue: 0,
    }
    this.onInputChange = this.onInputChange.bind(this)
    this.greenMessage = this.AVAILABLE.replace(
      '$$@@$$',
      this.props.allotted - this.props.restrict + ' ' + this.props.units,
    )
    this.redMessage = this.USED.replace(
      '$$@@$$',
      this.props.restrict + ' ' + this.props.units,
    )
    this.redPercentage = this.calculatePercentage(this.props.restrict)
    this.greenPercentage = this.calculatePercentage(
      this.props.allotted - this.props.restrict,
    )
  }

  calculatePercentage(value: number) {
    if (this.props.max > 0) {
      return (value / this.props.max) * 100 + '%'
    }
    return 0 + '%'
  }

  onSliderChange = (e: React.FormEvent<HTMLInputElement>) => {
    this.onInputChange(parseInt(e.currentTarget.value, 10))
  }
  onInputChange = (value: number) => {
    // It can’t be lower than used capacities
    if (value > this.props.restrict) {
      const state = { ...this.state }
      state.currentSliderValue = value
      const newValue = value - this.props.allotted
      this.blueMessage = this.CHANGE.replace(
        '$$@@$$',
        value + ' ' + this.props.units,
      )
      if (newValue > 0) {
        state.newValue = newValue
      } else {
        state.newValue = 0
      }
      this.bluePercentage = this.calculatePercentage(state.newValue)
      this.sendUpdateObj(value)
      this.setState(state)
    } else {
      const state = { ...this.state }
      state.currentSliderValue = this.props.allotted
      state.newValue = 0
      this.sendUpdateObj(state.currentSliderValue)
      this.setState(state)
    }
  }

  sendUpdateObj(value: any) {
    const obj = {
      name: this.props.name,
      updatedValue: value,
    }
    this.props.onChange(obj)
  }
  render() {
    return (
      <div className="range-slider">
        <A10Row>
          <A10Col className="text-right" span={6}>
            <A10Label className="used-label">{this.redMessage}</A10Label>
          </A10Col>
          <A10Col span={13}>
            <div className="slidecontainer">
              <A10Input
                type="range"
                min={this.props.min}
                max={this.props.max}
                defaultValue={this.state.currentSliderValue + ''}
                value={this.state.currentSliderValue + ''}
                onChange={this.onSliderChange}
                className="slider-custom"
                id="myRange"
              />

              <div className="range-section">
                <div
                  className="custom-section red"
                  style={{ width: this.redPercentage }}
                />
                <A10Tooltip placement="bottom" title={this.greenMessage}>
                  <div
                    className="custom-section green"
                    style={{ width: this.greenPercentage }}
                  />
                </A10Tooltip>
                <A10Tooltip placement="topRight" title={this.blueMessage}>
                  <div
                    className="custom-section blue"
                    style={{ width: this.bluePercentage }}
                  />
                </A10Tooltip>
              </div>
            </div>
          </A10Col>
          <A10Col span={5}>
            <A10InputNumber
              className="inputNumber"
              min={this.props.min}
              max={this.props.max}
              value={this.state.currentSliderValue}
              onChange={this.onInputChange}
              placeholder={this.props.placeholder}
            />
            {this.props.inputFixedText && (
              <span className="unit">{this.props.units}</span>
            )}
          </A10Col>
        </A10Row>
      </div>
    )
  }
}

export default setupA10Container(RangeSlider)
