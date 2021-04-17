import React, { useState } from 'react'
import { View, Text, TouchableOpacity, TextInput, Image, Button, Keyboard, KeyboardAvoidingView } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import coglioni from '../../assets/coglioni.jpg'
import { styles } from '../../styles'
import DateTimePicker from '@react-native-community/datetimepicker'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch, useSelector } from 'react-redux'
import { login_token, logout, selectToken } from '../status/statusSlice'


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
       const v = await AsyncStorage.getItem('@storage_Key')
       console.log('this is v called in storedata in LoginPage.login')
       console.log(v)
    } catch (e) {
      // saving error
      console.log('Error logging in')
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
      credentials: 'same-origin',
      body: JSON.stringify({username: username, password: password})
    })
    // when it comes back...translate to JSON
    .then(response => response.json())
    .then(data => {
      if(data.token){
        // store the token in local storage 
        console.log(data.token)
        console.log(typeof(data.token))
        console.log('callign storeData')     
        storeData(data.token)
        // update the redux store
        dispatch(login_token(data.token))
        navigation.navigate('Home')
        }
      })  
  }

  return (
    <KeyboardAvoidingView style={{flex: 1, paddingTop: 1}} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View style={styles.container}>
        <Text style={styles.title}>DBSF</Text>
        <Text style={styles.title}>{token}</Text>
        <Image source={coglioni} style={styles.loginImage}/>
        <TextInput onChangeText={text => setUsername(text)} style={styles.textInput} placeholder='Username' autoCapitalize='none' />
        <TextInput onChangeText={text => setPassword(text)} secureTextEntry={true} style={styles.textInput} placeholder='Password' />
        <TouchableOpacity style={styles.button} onPress={login}>
          <Text style={{fontSize: 20 , color: 'white'}}>Log In</Text>
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


export function SignUpScreen({navigation}) {
  
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(true);
  
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    
    showMode('date');
    
  };

  const signUp = () => {  
    alert('hgjk')
    
  }

  return (
    <ScrollView>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.title}>Sign up for DBSF </Text>
        <TextInput style={styles.textInput} placeholder='First Name'/>
        <TextInput style={styles.textInput} placeholder='Last Name'/>
        <TextInput style={styles.textInput} placeholder='Username'/>
        <TextInput style={styles.textInput} placeholder='Email'/>
        <TextInput style={styles.textInput} placeholder='Password'/>
        <TextInput style={styles.textInput} placeholder='Confirmation'/>
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
          <Text style={{fontSize: 20 , color: 'white'}}>Sign Up</Text>
        </TouchableOpacity>
      </View>    
    </ScrollView>    
  );
}



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
    <View>
      <TouchableOpacity onPressOut={logout_user}>
        <Text>Log Out!</Text>
      </TouchableOpacity>
    </View>
  )
}
