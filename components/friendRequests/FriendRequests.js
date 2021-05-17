import { Entypo, FontAwesome } from '@expo/vector-icons';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, {useState} from 'react'
import { colors, styles } from '../../styles'

import { TouchableOpacity } from 'react-native-gesture-handler'
import { selectFriendRequests } from '../info/infoSlice'
import { useSelector } from 'react-redux'

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
          <FontAwesome name="check" size={24} color={colors.lightGreen} />
        </TouchableOpacity>
        <TouchableOpacity style={requestStyles.button}>
          <Entypo name="circle-with-cross" size={24} color={colors.lightRed} />
        </TouchableOpacity>
      </View>
    </View>
  )
}


const requestStyles = StyleSheet.create({
  button: {
    backgroundColor: colors.lightSilver,
    borderRadius: 50,
    marginHorizontal: 5,
    padding: 20
  },
  outerContainer: {},
  requestContainer: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderColor: colors.silver,
    borderRadius: 10,
    borderWidth: 2,
    flexDirection: 'row',
    margin: 5,
    padding: 20,
    shadowColor: colors.black,
    shadowOffset: {
      height: 3,
      width: 3
    },
    shadowOpacity: 0.1,
    shadowRadius: 1
  },
  title: {
    color: colors.silver,
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10
  }
})