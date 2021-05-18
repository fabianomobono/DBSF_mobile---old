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
      {friendRequests.length > 0 ? 
        <View style={{alignItems: 'center'}} >
          <Text style={requestStyles.title}>Pending Friend Request</Text>
          {friendRequests.map(request => <FriendRequest
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
  noRequestsView: {
    marginTop: '50%'
    
  },
  noRequestsText: {
    color: colors.DBSFBlue,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 20,
    color: colors.silver
  },
  button: {
    backgroundColor: colors.lightSilver,
    borderRadius: 50,
    marginHorizontal: 5,
    padding: 20
  },
  outerContainer: {
    flex: 1,
  },
  requestContainer: {
    width: '90%',
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
    shadowRadius: 1
  },
  title: {
    color: colors.silver,
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10
  }
})