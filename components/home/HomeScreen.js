import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TextInput, Image, StyleSheet } from 'react-native'
import { styles } from '../../styles';
import { Post } from '../posts/PostsList'
import { useDispatch, useSelector } from 'react-redux'
import { selectToken } from '../status/statusSlice';
import { Messages } from '../messages/Messages' 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { Profile } from '../profile/Profile';
import { update_info } from '../info/infoSlice'
import { logoutScreen } from '../login/login';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';


// this is the tab navigator that contains the feed, messages, profile
const Tab = createBottomTabNavigator()
export const Main = () => {
  return (
      <Tab.Navigator initialRouteName='Feed'
      screenOptions={({ route }) => ({
        tabBarIcon: () => {
          if (route.name === 'Messages') {
           return <MaterialIcons name="message" size={24} color="white" />
          } 
          
          else if(route.name === 'Feed') {
            return <FontAwesome5 name="home" size={24} color="white" />
          }

          else if(route.name === 'Profile'){
            return <FontAwesome5 name="home" size={24} color="white" />
          }
          else if (route.name === 'Logout'){
            return <FontAwesome5 name="home" size={24} color="white" />
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: 'white',
        inactiveTintColor: 'silver',
        fontSize: 50,
        style: {
          fontSize: 100,
          backgroundColor: '#1aa1f0',
          height: 80,
          fontSize: 50,
        },
        labelStyle: {
          fontSize: 20
        }
      }}
    >
        <Tab.Screen name='Feed' component={HomeScreen}/>
        <Tab.Screen name='Messages' component={Messages}/>
        <Tab.Screen name='Profile' component={Profile}/>
        <Tab.Screen name={'Logout'} component={logoutScreen} />
      </Tab.Navigator>
  )
}


export function HomeScreen() {
  
  // define current text in the textInput and the list of posts
  const [text, setText] = useState('')
  const [posts, setPosts] = useState([])
  const [profile_pic, setProfile_pic] = useState('')
  const [user, setUser] = useState('')
  // redux stuff
  // set up dispatch call
  const dispatch = useDispatch()
  // get the token from the store
  const token = useSelector(selectToken)

  // when the component mounts request data from the server
  useEffect( () =>{
    console.log('useEffect got called...and here is the token')
    console.log(token)

     fetch('https://dbsf.herokuapp.com/api/get_info', 
        {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
             Authorization: "Token ".concat(token)
          },
          credentials: 'same-origin',  
        }).then(res => res.json()).then(r => {
          
          setPosts(r.hello.posts)
          setProfile_pic(r.hello.profile_pic)
          setUser(r.hello.user)
          console.log('useEffect in HomeScreen Component has been called...this gets triggered when the get info fetch comes back')
          

          // add the information to the redux store
          dispatch(update_info(r.hello))
        })
      .catch(r => alert('something went wrong'));
  },[])
  
  // add a new post to the feed
  const new_post = () => {
    var p = posts
    setPosts([{text: text, author: user, author_picture: profile_pic}, ...p])
    setText('')
  }

  
  const getData = async () => {

    try {
      const value = await AsyncStorage.getItem('@storage_Key')
      if(value !== null) {
        // value previously stored
       alert(value)
        
      }
      else {
        alert('value is null')
      }
    } catch(e) {
      // error reading value
      alert('there was a problem checking the login status from the home screen')
    }
  }

  const tFromS = () => {
    alert(token)
  }

  return (
    <View>
      <View style={homeStyle.container}>
        <TouchableOpacity onPress={getData}>
          <Text>alert Token</Text>
        </TouchableOpacity>
        
        <Image source={{uri: profile_pic}} style={styles.smallImage} />
        <TextInput
          value={text} 
          style={homeStyle.textInput} 
          onChangeText={text => setText(text)}
          onSubmitEditing={new_post} placeholder='Write a post'/> 
      </View>
      <ScrollView style={{height: '90%'}} >
      <TouchableOpacity onPress={tFromS}>
          <Text>alert Token  from store</Text>
        </TouchableOpacity>
       <View>
        {posts.map(t => 
          <Post 
            text={t.text} 
            author={t.author } 
            profile_pic={t.author_picture}
            date={t.date}/>)}
       </View>
      </ScrollView>
    </View>
  );
}


const homeStyle = StyleSheet.create({
  container: {
    backgroundColor: '#ddd',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },

  textInput: { 
    borderColor: 'grey',
    borderWidth: 1,
    backgroundColor: 'white',
    fontSize: 20,
    padding: 10,
    margin: 10,
    width: 340,
    textAlign: 'center',
    borderRadius: 20,
  },
  navbar: {
    backgroundColor: 'green',
    flex: 1,
    borderWidth: 4,
    height: 1,
   
  }
})