import React from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native'

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>
          Amount Total:
        </Text>
        <TextInput style={styles.textInput}>
        </TextInput>
        <Text>
          Total Tip:
        </Text>
        <Text style={styles.amount}>
          $10
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
    justifyContent: 'center',
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
  }
})
