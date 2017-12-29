import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import Label from 'components/Label'
import TextInput from 'components/TextInput'
import Row from 'components/Row'
import SegmentedControlTab from 'react-native-segmented-control-tab'

class TipSelector extends Component {
  state = {
    values: [
      'Ok 15%',
      'Good 18%',
      'Great 20%',
      'Other'
    ],
    percentages: [15, 18, 20, 0],
    selectedIndex: 0,
    other: false
  }

  static propTypes = {
    handleChange: PropTypes.func
  }

  handleSelectTipPercentage = index => {
    const { handleChange } = this.props
    const { percentages } = this.state

    this.setState({
      selectedIndex: index,
      other: index === 3
    }, () => handleChange(percentages[index]))
  }

  render () {
    const { values, other } = this.state
    const { handleChange } = this.props

    return (
      <View style={{ flex: 1 }}>
        <Row style={{ marginLeft: 10, marginRight: 10 }}>
          <SegmentedControlTab
            values={values}
            selectedIndex={this.state.selectedIndex}
            tabStyle={{ borderColor: '#60b7e2', height: 50 }}
            tabTextStyle={{ color: '#60b7e2' }}
            activeTabStyle={{ backgroundColor: '#60b7e2' }}
            onTabPress={this.handleSelectTipPercentage}
          />
        </Row>
        {
          other &&
          <Row>
            <Label>Other Percentage:</Label>
            <TextInput onChangeText={handleChange} />
          </Row>
        }
      </View>
    )
  }
}

export default TipSelector
