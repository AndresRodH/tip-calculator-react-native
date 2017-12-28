import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SegmentedControlTab from 'react-native-segmented-control-tab'

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

  handleSelectTipPercentage = index => {
    const { handleChange } = this.props
    const { percentages } = this.state

    this.setState({
      selectedIndex: index
    }, () => handleChange(percentages[index]))
  }

  render () {
    const { values } = this.state
    return (
      <SegmentedControlTab
        values={values}
        selectedIndex={this.state.selectedIndex}
        tabStyle={{ borderColor: '#60b7e2', height: 50 }}
        tabTextStyle={{ color: '#60b7e2' }}
        activeTabStyle={{ backgroundColor: '#60b7e2' }}
        onTabPress={this.handleSelectTipPercentage}
      />
    )
  }
}

export default TipSelector
