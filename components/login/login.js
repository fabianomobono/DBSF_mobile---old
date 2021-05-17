import { Button, Image, Keyboard, KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { colors, styles } from '../../styles'
import { login_token, logout, selectToken } from '../status/statusSlice'
import { useDispatch, useSelector } from 'react-redux'

import AsyncStorage from '@react-native-async-storage/async-storage'
import DateTimePicker from '@react-native-community/datetimepicker'
import { ScrollView } from 'react-native-gesture-handler'
import coglioni from '../../assets/coglioni.jpg'

// login page component
export const LoginPage = ({navigation}) => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const token = useSelector(selectToken)
  
  // helper function to store the auth token
  const storeData = async (value) => {
    
    try {
       await AsyncStorage.setItem('@storage_Key', value)   
    } catch (e) {
      // saving error
      alert('Error logging in')
    }
  }

  // when the login button is clicked
  const login = () => {
      
    // send a post request to the server and request an authentication Token
    fetch('https://dbsf.herokuapp.com/api-token-auth/',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username: username, password: password})
    })
    // when it comes back...translate to JSON
    .then(response => response.json())
    .then(data => {
      if(data.token){
        // store the token in local storage 
   
        storeData(data.token)
        // update the redux store
        dispatch(login_token(data.token))
        
        }
      }).catch(res => console.log('something is not right',res))  
  }

  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View style={styles.container}>
        <Text style={styles.title}>DBSF</Text>
        <Text style={styles.title}>{token}</Text>
        <Image source={coglioni} style={styles.loginImage}/>
        <TextInput onChangeText={text => setUsername(text)} style={styles.textInput} placeholder='Username' autoCapitalize='none' />
        <TextInput onChangeText={text => setPassword(text)} secureTextEntry={true} style={styles.textInput} placeholder='Password' />
        <TouchableOpacity style={styles.button} onPress={login}>
          <Text style={{fontSize: 20 , color: colors.white, fontWeight: 'bold'}}>Log In</Text>
        </TouchableOpacity>
        <Button 
          title='New here? Sign Up!'
          // the on object that carries parameters needs to be inside the () of navigation.navigate()
          onPress={() => navigation.navigate('SignUp', {
            itemId: 86,
            otherParam: 'This is another param'
          }
          )}
        />
      </View>
    </KeyboardAvoidingView>   
  )
}

// sign up page component
export function SignUpScreen({navigation}) {
  
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(true);

  // sign up form variables
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmation, setConfirmation] = useState('')
  const dispatch = useDispatch()
  // hands change in the date input
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };
  
  //show the date input
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {    
    showMode('date');    
  };

  
  const signUp = () => {  
    // make sure all the fields are provided
    if(firstName === '' || lastName === '' || username === '' || email === '' || password === '' || confirmation === ''){
      alert('All fields must be provided')
      return false
    }
    else if (password !== confirmation) {
      alert('Passwords do not match')
      return false
    }


    console.log(date)
    // start the sign up process in the server
    fetch('https://dbsf.herokuapp.com/api/mobileSignUp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
      body: JSON.stringify({
        username: username,
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
        confirmation: confirmation,
        dob: date
      })
    }).then(res => res.json()).then(r => {

      // if the signUp token comes back
      if (r.response === 'HURRAYYY user and token have been created...sending back token') {
        const token = r.token

        // store the token in the redux store
       
        dispatch(login_token(token))

        // set the token in  async storage on device
        const storeData = async (value) => {
    
          try {
             await AsyncStorage.setItem('@storage_Key', value)   
          } catch (e) {
            // saving error
            alert('Error logging in')
          }
        }
        storeData(token)
        
      }
      else {
        console.log(r.response)
      }
    })
    

  }

  return (
    <ScrollView>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.title}>Sign up for DBSF </Text>
        <TextInput style={styles.textInput} placeholder='First Name' value={firstName} onChangeText={text => setFirstName(text)}/>
        <TextInput style={styles.textInput} placeholder='Last Name' value={lastName} onChangeText={text => setLastName(text)}/>
        <TextInput style={styles.textInput} placeholder='Username' value={username} onChangeText={text => setUsername(text)} autoCapitalize='none'/>
        <TextInput style={styles.textInput} placeholder='Email' value={email} onChangeText={text => setEmail(text)} autoCapitalize='none'/>
        <TextInput style={styles.textInput} placeholder='Password' secureTextEntry={true} value={password} onChangeText={text => setPassword(text)}/>
        <TextInput style={styles.textInput} placeholder='Confirmation' secureTextEntry={true} value={confirmation} onChangeText={text => setConfirmation(text)}/>
        <TouchableOpacity onPress={showDatepicker} style={styles.textInputTouch}>
          <Text style={styles.centerText}>Date of Birth</Text>
          <View>
        <DateTimePicker style={styles.datePicker} 
            id='dob'
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />     
        </View>   
        </TouchableOpacity>
        <TouchableOpacity onPressOut={signUp} style={styles.button}>
          <Text style={{fontSize: 20 , color: colors.white}}>Sign Up</Text>
        </TouchableOpacity>
      </View>    
    </ScrollView>    
  );
}

// logout component
export function logoutScreen({navigation}) {
  const dispatch = useDispatch()
  const logout_user = () => {
    // delete the token from the local storage
    const removeData = async () => {
      try {
        await AsyncStorage.removeItem('@storage_Key')
      } 
      catch (e) {
        // saving error
        alert('Error logging out....was not able to delete token')
      }
    }
    dispatch(logout())
    removeData()
  }

  return (
    <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center'}}>
      <TouchableOpacity onPressOut={logout_user} style={styles.button}>
        <Text style={{padding: 10, fontSize: 20 , color: colors.white, fontWeight: 'bold'}}>Log Out!</Text>
      </TouchableOpacity>
    </View>
  )
}
