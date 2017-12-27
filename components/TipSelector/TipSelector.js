import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'

class TipSelector extends Component {
  state = {
    values: [
      'Ok 15%',
      'Good 18%',
      'Great 20%',
      'Wow 25%'
    ],
    percentages: [0.15, 0.18, 0.20, 0.25],
    selectedIndex: 0
  }

  static propTypes = {
    handleChange: PropTypes.func
  }

  handleSelectTipPercentage = event => {
    const { handleChange } = this.props
    const { percentages } = this.state
    const { selectedSegmentIndex } = event.nativeEvent

    this.setState({
      selectedIndex: selectedSegmentIndex
    }, () => handleChange(percentages[selectedSegmentIndex]))
  }

  render () {
    const { selectedIndex, values } = this.state
    return (
      <StyledSegmentedControl
        values={values}
        selectedIndex={selectedIndex}
        onChange={this.handleSelectTipPercentage}
      />
    )
  }
}

const StyledSegmentedControl = styled.SegmentedControlIOS.attrs({
  tintColor: '#60b7e2'
})`
  height: 50px;
  flex: 1;
`

export default TipSelector
