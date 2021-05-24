import React, { useEffect, useState } from "react"
import { ScrollView, Text, TextInput, TouchableOpacity } from "react-native"
import { colors, styles } from '../../styles'

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"

export const PasswordReset = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')

  // send the info via fetch to the server
  const sendInfo = () => {
    if (email.length > 10) {
      fetch('https://dbsf.herokuapp.com/password_reset/password-reset/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({username: username, email: email})
      }
    )
    .then(res => res.json())
    .then(r => {
      console.log('This is the response from the server...hurray')
      console.log(r)
  
      if(r.status === true) {
        alert('Email send')
      }
  
      if (r.email[0] === 'Enter a valid email address.'){
        alert('Invalid email')
      }   
    })
    .catch(f => ('invalid email...'))
      }  
  }
  

  return (
    <KeyboardAwareScrollView contentContainerStyle={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
      <Text style={{...styles.title, padding: 20, marginTop: -100, marginBottom: 10}}>Forgot your password? Reset it here!</Text>
      <TextInput keyboardType='email-address' autoCompleteType='off' autoCapitalize='none' style={styles.textInput} placeholder='enter your email' onChangeText={text => setEmail(text)}/>
      <TextInput  autoCompleteType='off' autoCapitalize='none' style={styles.textInput} placeholder='username'  onChangeText={text => setUsername(text)}/>
      <TouchableOpacity style={styles.button} onPress={sendInfo}>
        <Text style={{color: colors.white, fontSize: 20, fontWeight: 'bold'}}>Reset password</Text>
      </TouchableOpacity>
    </KeyboardAwareScrollView>
  )
}