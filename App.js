import React from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Slider
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
    const amountPerPerson = amountTotal !== 0 ? ((amountTotal + tipTotal) / split).toFixed(2) : 0

    this.setState({
      split,
      amountPerPerson
    })
  }

  render () {
    const { tipTotal, split, amountPerPerson } = this.state
    return (
      <View style={styles.container}>
        <Text>
          Amount Total:
        </Text>
        <TextInput
          style={styles.textInput}
          onChangeText={this.calculateTip}
        />
        <Text>
          Split Amongst: {split}
        </Text>
        <Slider
          maximumValue={10}
          minimumValue={1}
          step={1}
          value={split}
          style={styles.slider}
          onValueChange={this.splitBill}
        />
        <Text>
          Amount Per Person:
        </Text>
        <Text style={styles.amount}>
          ${amountPerPerson}
        </Text>
        <Text>
          Total Tip:
        </Text>
        <Text style={styles.amount}>
          ${tipTotal}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textInput: {
    textAlign: 'left',
    color: '#333333',
    margin: 5,
    height: 50,
    borderColor: '#60b7e2',
    width: '100%',
    borderWidth: 1
  },
  amount: {
    fontWeight: 'bold',
    textAlign: 'left'
  },
  slider: {
    margin: 5,
    height: 40,
    width: '50%'
  }
})
