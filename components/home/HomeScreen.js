import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TextInput, Image, StyleSheet } from 'react-native'
import { styles } from '../../styles';
import { Post } from '../posts/PostsList'
import { useDispatch, useSelector } from 'react-redux'
import { selectToken } from '../status/statusSlice';
import { Messages } from '../messages/Messages' 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons, FontAwesome5, FontAwesome } from '@expo/vector-icons';
import { Profile } from '../profile/Profile';
import { update_info, selectInfo, add_post } from '../info/infoSlice'
import { logoutScreen } from '../login/login';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FindPeople } from '../find/FindPeople';


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
            return <MaterialIcons name="face" size={24} color="white" />
          }

          else if (route.name === 'Logout'){
            return <MaterialIcons name="logout" size={24} color="white" />
          }

          else if (route.name === 'Search') {
            return <FontAwesome name="search" size={24} color="white" />
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: 'white',
        inactiveTintColor: 'silver',
        showLabel: false,
        style: {    
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
        <Tab.Screen name='Search' component={FindPeople} />
        <Tab.Screen name='Logout' component={logoutScreen}/>        
      </Tab.Navigator>
  )
}


export function HomeScreen({navigation}) {

  // get posts from the redux-store
  const posts = useSelector(selectInfo).posts
  // define current text in the textInput and the list of posts
  const [text, setText] = useState('')
  const [profile_pic, setProfile_pic] = useState('')
  const [user, setUser] = useState('')
  // redux stuff
  // set up dispatch call
  const dispatch = useDispatch()
  // get the token from the store
  const token = useSelector(selectToken)
  
  // when the component mounts request data from the server
  useEffect( () =>{
    // when the component mounts request data from the server
    fetch('https://dbsf.herokuapp.com/api/get_info', 
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
            Authorization: "Token ".concat(token)
        },
        credentials: 'same-origin',  
      }).then(res => res.json()).then(r => {
        
        
        setProfile_pic(r.hello.profile_pic)
        setUser(r.hello.user)
        console.log('useEffect in HomeScreen Component has been called...this gets triggered when the get info fetch comes back')
        

        // add the information to the redux store
        dispatch(update_info(r.hello))
        
      })
    .catch(r => alert('something went wronghnjmkmk'));
  },[])
  
  // add a new post to the feed
  const new_post = () => {  
    
    // send the post to the server so it can be saved in the database
    if (text.length > 1) {
      fetch('https://dbsf.herokuapp.com/api/new_post', {
      method: 'POST',
      headers: {
        'Authorization': 'Token '.concat(token),
        'Content-type': 'application/json'
      },
      body: JSON.stringify({text: text})
    })
    .then(res => res.json())
    .then(res => {
      const r = res.response
      // when the response comes back update the redux store with the new posts
      dispatch(add_post({text: r.text, author: r.author, author_picture: profile_pic, date: r.date, id: r.id, comments: r.comments}))
      console.log('redux store was updated...i think')
    })
    .catch(r => console.log('this does not work'))
    setText('')
    }
    else {
      alert('post text needs to be longer')
    }
  }

  return (
    <View>
      <View style={homeStyle.container}>
        <Image source={{uri: profile_pic}} style={styles.smallImage} />
        <TextInput
          value={text} 
          style={homeStyle.textInput} 
          onChangeText={text => setText(text)}
          onSubmitEditing={new_post} placeholder='Write a post'/> 
      </View>
      <ScrollView style={{height: '90%'}} >
       <View>
        {
          posts.length  > 0 ? posts.map(t => 
            <Post
              navigation={navigation}
              id={t.id}
              key={t.id} 
              text={t.text} 
              author={t.author } 
              profile_pic={t.author_picture}
              date={t.date}/>)
          : 
            <Text style={styles.empty_list_message}>No posts here. Try to search for friends in the search box and add them as friends. You'll see posts appear over time!</Text>
        }
       </View>
      </ScrollView>
    </View>
  );
}


const homeStyle = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
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
  },
  
})