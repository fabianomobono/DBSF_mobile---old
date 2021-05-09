import React, {useState } from 'react'
import { View, ScrollView, Text, StyleSheet, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import { styles } from '../../styles'
import { selectFriendRequests } from '../info/infoSlice'
import { FontAwesome, Entypo } from '@expo/vector-icons';


export const FriendRequests = ({navigation}) => {
  const friendRequests = useSelector(selectFriendRequests)
  return (
    <ScrollView>
      <View style={{alignItems: 'center'}}>
        <Text style={requestStyles.title}>Pending Friend Request</Text>
      </View>
      {friendRequests.length > 0 ? 
        friendRequests.map(request => <FriendRequest
          navigation={navigation}
          sender={request.sender}
          profile_pic={request.sender_profile_pic}
        />)
      :
        <Text>No Friend Requests at this time</Text>
      }
    </ScrollView>
  )
}


const FriendRequest = (props) => {

  const profilePage = () => {
    props.navigation.navigate('Friends Profile', {
      profile_pic: props.profile_pic,
      user: props.sender
    })
  }

  return (
    <View style={requestStyles.requestContainer}>
      <TouchableOpacity onPress={profilePage}>
        <Image style={styles.smallImage} source={{uri: props.profile_pic}}/>
      </TouchableOpacity>
      <Text style={{fontWeight: 'bold', margin: 5, fontSize: 15, marginLeft: 20}}>{props.sender}</Text>
      <View style={{flexDirection: 'row', marginLeft: 'auto'}}>
        <TouchableOpacity style={requestStyles.button}>
          <FontAwesome name="check" size={24} color="rgba(101, 239, 101, 0.9)" />
        </TouchableOpacity>
        <TouchableOpacity style={requestStyles.button}>
          <Entypo name="circle-with-cross" size={24} color="rgba(255, 50, 101, 0.8)" />
        </TouchableOpacity>
      </View>
    </View>
  )
}


const requestStyles = StyleSheet.create({
  outerContainer: {

  },
  requestContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'silver',
    borderRadius: 10,
    margin: 5,
    padding: 20,
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  button: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    padding: 20,
    borderRadius: 50,
    marginHorizontal: 5,
  },
  title: {
    margin: 10,
    fontWeight: 'bold',
    fontSize: 20,
    color: 'silver'
  }
})