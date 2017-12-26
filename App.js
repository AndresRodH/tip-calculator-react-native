import React from 'react'
import styled from 'styled-components/native'
import {
  Text,
  View
} from 'react-native'

export default class App extends React.Component {
  state = {
    amountTotal: 0,
    tipPercentage: 0.15,
    tipTotal: 0,
    split: 1,
    amountPerPerson: 0
  }

  calculateTip = value => {
    const amountTotal = parseInt(value) || 0
    const tipTotal = amountTotal * this.state.tipPercentage
    this.setState({
      amountTotal,
      tipTotal
    }, () => this.splitBill(this.state.split))
  }

  splitBill = value => {
    const { amountTotal, tipTotal } = this.state
    const split = value
    const amountPerPerson = amountTotal !== 0 ? (amountTotal + tipTotal) / split : 0

    this.setState({
      split,
      amountPerPerson
    })
  }

  render () {
    const { tipTotal, split, amountPerPerson } = this.state
    return (
      <MainView>
        <Text>
          Amount Total:
        </Text>
        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 30, fontWeight: 'bold'}}>$</Text>
          <StyledTextInput onChangeText={this.calculateTip} />
        </View>
        <Text>
          Split Amongst: {split}
        </Text>
        <StyledSlider
          maximumValue={10}
          minimumValue={1}
          step={1}
          value={split}
          onValueChange={this.splitBill}
        />
        <Text>
          Amount Per Person:
        </Text>
        <Amount>
          ${amountPerPerson.toFixed(2)}
        </Amount>
        <Text>
          Total Tip:
        </Text>
        <Amount>
          ${tipTotal.toFixed(2)}
        </Amount>
      </MainView>
    )
  }
}

const MainView = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`

const StyledTextInput = styled.TextInput`
  textAlign: left;
  color: #333333;
  margin: 5px;
  height: 50px;
  border-color: #60b7e2;
  width: 80%;
  border-width: 1;
`

const Amount = styled.Text`
  font-weight: bold;
  text-align: left;
`

const StyledSlider = styled.Slider`
  margin: 5px;
  height: 40px;
  width: 50%;
`
