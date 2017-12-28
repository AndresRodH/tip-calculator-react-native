import React from 'react'
import styled from 'styled-components/native'
import { Text, TouchableWithoutFeedback, Keyboard } from 'react-native'
import TipSelector from './components/TipSelector'

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

  updateTipPercentage = tipPercentage => {
    this.setState({
      tipPercentage
    }, () => this.calculateTip(this.state.amountTotal))
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
    const { tipTotal, split, amountPerPerson, amountTotal } = this.state
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <MainView>
          <Row>
            <Label>Amount Total:</Label>
            <StyledTextInput onChangeText={this.calculateTip} />
          </Row>
          <Row style={{margin: 10, marginTop: 20}}>
            <TipSelector handleChange={this.updateTipPercentage} />
          </Row>
          <Row>
            <Label>Split Amongst: <Text style={{fontWeight: 'bold'}}>{split}</Text></Label>
            <StyledSlider
              maximumValue={10}
              minimumValue={1}
              step={1}
              value={split}
              onValueChange={this.splitBill}
            />
          </Row>
          <Row>
            <Label>Total Tip:</Label>
            <Amount>${tipTotal.toFixed(2)}</Amount>
          </Row>
          <Row>
            <Label>Total Amount:</Label>
            <Amount>${(tipTotal + amountTotal).toFixed(2)}</Amount>
          </Row>
          {
            split !== 1 &&
            <Row>
              <Label>Amount Per Person:</Label>
              <Amount>${amountPerPerson.toFixed(2)}</Amount>
            </Row>
          }
        </MainView>
      </TouchableWithoutFeedback>
    )
  }
}

const MainView = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: #fff;
  justify-content: center;
`

const Label = styled.Text`
  text-align: right;
  margin: 10px;
  color: #60b7e2;
  flex: 1;
`

const StyledTextInput = styled.TextInput.attrs({
  keyboardType: 'numeric',
  underlineColorAndroid: 'transparent',
  caretHidden: true
})`
  text-align: left;
  color: #333333;
  margin: 10px;
  height: 50px;
  border-color: #60b7e2;
  border-width: 1;
  flex: 2;
  padding-left: 10px;
`

const Row = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 50px;
`

const Amount = styled.Text`
  font-weight: bold;
  text-align: left;
  flex: 2;
`

const StyledSlider = styled.Slider.attrs({
  minimumTrackTintColor: '#60b7e2',
  thumbTintColor: '#60b7e2'
})`
  margin: 10px;
  height: 40px;
  flex: 2;
`
