import { Animated, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Entypo, FontAwesome } from '@expo/vector-icons';
import React, { useRef, useState } from 'react'
import { colors, styles } from '../../styles'

import { TouchableOpacity } from 'react-native-gesture-handler'
import { selectFriendRequests } from '../info/infoSlice'
import { useSelector } from 'react-redux'

export const FriendRequests = ({navigation}) => {
  const friendRequests = useSelector(selectFriendRequests)
  return (
    <ScrollView>      
      {friendRequests.length > 0 ? 
        <View style={{alignItems: 'center'}} >
          <Text style={requestStyles.title}>Pending Friend Request</Text>
          {friendRequests.map(request => <FriendRequest
            key={request.id}
            navigation={navigation}
            sender={request.sender}
            profile_pic={request.sender_profile_pic}
          />)
          }
      </View>
        
      :
        <View style={requestStyles.noRequestsView}>
          <Text style={requestStyles.noRequestsText}>No Friend Requests at this time</Text>
        </View>
      }
    </ScrollView>
  )
}


const FriendRequest = (props) => {

  const [status, setStatus] = useState('pending')

  // animation stuff
  const fadeAnim = useRef(new Animated.Value(1)).current
  const heightAnim = useRef(new Animated.Value(120)).current
  
  // navigate to the Friendship sender userpage
  const profilePage = () => {
    props.navigation.navigate('Friends Profile', {
      profile_pic: props.profile_pic,
      user: props.sender
    })
  }

  // function that starts the process of visusally hiding the request => this gets called when the user taps on accept or ignore
  const hideRequest = () => {
    Animated.parallel([
      Animated.timing(
        fadeAnim,
        {
          toValue: 0,
          duration: 2000,
          useNativeDriver: false,
        },
      ),
      Animated.timing(
        heightAnim,
        {
          toValue: 0,
          duration: 5000,
          useNativeDriver: false,
        }
      )
      
    ]).start();
  }

  // make a post request to accept the friendship
  const acceptFriendship = () => {
    // change the text to Accepted
    setStatus('accepted')
    // send the post request
    

    // get back the new info from the server and update the redux store...so that the friendlist and the posts update

    // The friend request needs to disappear after a while...
    hideRequest()
  }

  // make a post request to ignore the friendship
  const ignoreFriendship = () => {
    // change the text to ignored
    setStatus('ignored')
    // send a post request to the server to update the database

    // when to response comes back the friendrequest should disappear
    hideRequest()
    
   
  }
  
  return (
    <Animated.View style={{...requestStyles.requestContainer, opacity: fadeAnim, height: heightAnim}} >
      <TouchableOpacity onPress={profilePage}>
        <Image style={{...styles.smallImage}} source={{uri: props.profile_pic}}/>
      </TouchableOpacity>
      <Text style={{fontWeight: 'bold', margin: 5, fontSize: 15, marginLeft: 20}}>{props.sender}</Text>
      {status === 'pending' ? 
        <View style={{flexDirection: 'row', marginLeft: 'auto'}}>       
          <TouchableOpacity style={requestStyles.button} onPress={acceptFriendship}>
            <FontAwesome name="check" size={24} color={colors.lightGreen} />
          </TouchableOpacity>
          <TouchableOpacity style={requestStyles.button} onPress={ignoreFriendship}>
            <Entypo name="circle-with-cross" size={24} color={colors.lightRed} />
          </TouchableOpacity>   
        </View>
        :
        <View style={{flexDirection: 'row', marginLeft: 'auto'}}>
          <Text style={requestStyles.statusText}>{status}</Text>
        </View>
      }
    </Animated.View>
  )
}


const requestStyles = StyleSheet.create({
  button: {
    backgroundColor: colors.lightSilver,
    borderRadius: 50,
    marginHorizontal: 5,
    padding: 20
  },
  noRequestsText: {
    color: colors.DBSFBlue,
    color: colors.silver,
    fontSize: 20,
    fontWeight: 'bold',
    padding: 20,
    textAlign: 'center'
  },
  noRequestsView: {
    marginTop: '50%'
  },
  outerContainer: {
    flex: 1
  },
  requestContainer: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderColor: colors.silver,
    borderRadius: 10,
    borderWidth: 2,
    flexDirection: 'row',
    margin: 1,
    padding: 20,
    shadowColor: colors.black,
    shadowOffset: {
      height: 3,
      width: 3
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    width: '90%'
  },
  statusText: {
    color: colors.silver,
    fontSize: 20,
    fontWeight: 'bold'
  },
  title: {
    color: colors.silver,
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10
  }
})