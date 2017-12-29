import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import Label from 'components/Label'
import TextInput from 'components/TextInput'
import Row from 'components/Row'
import styled from 'styled-components/native'

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

  handleSelectTipPercentage = event => {
    const { handleChange } = this.props
    const { percentages } = this.state
    const { selectedSegmentIndex } = event.nativeEvent

    this.setState({
      selectedIndex: selectedSegmentIndex,
      other: selectedSegmentIndex === 3
    }, () => handleChange(percentages[selectedSegmentIndex]))
  }

  render () {
    const { selectedIndex, values, other } = this.state
    const { handleChange } = this.props

    return (
      <View style={{flex: 1}}>
        <Row style={{marginLeft: 10, marginRight: 10}}>
          <StyledSegmentedControl
            values={values}
            selectedIndex={selectedIndex}
            onChange={this.handleSelectTipPercentage}
            key='controls'
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

const StyledSegmentedControl = styled.SegmentedControlIOS.attrs({
  tintColor: '#60b7e2'
})`
  height: 50px;
  flex: 1;
`

export default TipSelector
