import styled from 'styled-components/native'

const StyledTextInput = styled.TextInput.attrs({
  keyboardType: 'numeric',
  underlineColorAndroid: 'transparent'
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

export default StyledTextInput
