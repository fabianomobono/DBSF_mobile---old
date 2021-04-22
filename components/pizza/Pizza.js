import React from 'react'
import { TextInput, Text } from 'react-native'

export const Pizza = () => {
  const [text, setText] = React.useState('')
  return (
    <>
      <TextInput
        style={{height: 40}}
        placeholder='Time to write some text'
        onChangeText={text => setText(text)}
        defaultValue={text}
        />
      <Text style={{padding: 10, fontSize: 42}}>
        {text.split(' ').map(word => word && '')}
      </Text>
    </>
  )
}