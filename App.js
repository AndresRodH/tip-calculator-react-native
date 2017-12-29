import React, { Component } from 'react'
import styled from 'styled-components/native'
import { Text, TouchableWithoutFeedback, Keyboard } from 'react-native'
import TipSelector from 'components/TipSelector'
import TextInput from 'components/TextInput'
import Label from 'components/Label'
import Row from 'components/Row'
import Amount from 'components/Amount'
import Slider from 'components/Slider'

export default class App extends Component {
  state = {
    amountTotal: 0,
    tipPercentage: 15,
    tipTotal: 0,
    split: 1,
    amountPerPerson: 0
  }

  calculateTip = value => {
    const amountTotal = parseFloat(value) || 0
    const tipTotal = (amountTotal * this.state.tipPercentage) / 100

    this.setState({
      amountTotal,
      tipTotal
    }, () => this.splitBill(this.state.split))
  }

  updateTipPercentage = newTipPercentage => {
    const tipPercentage = parseFloat(newTipPercentage) || 0

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
            <TextInput onChangeText={this.calculateTip} />
          </Row>
          <Row>
            <TipSelector handleChange={this.updateTipPercentage} />
          </Row>
          <Row>
            <Label>Split Amongst: <Text style={{fontWeight: 'bold'}}>{split}</Text></Label>
            <Slider
              maximumValue={25}
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
