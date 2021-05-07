import React, { useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import { selectInfo} from '../info/infoSlice'
import { styles } from '../../styles'
import { NavigationContainer } from '@react-navigation/native'
import { Conversation } from './Conversation'
import { createStackNavigator } from '@react-navigation/stack'


const Stack = createStackNavigator()


export const DMSystem = () => {
  return (
      <Stack.Navigator initialRouteName='All Messages'>
        
      </Stack.Navigator>    
  )
}



export const Messages = ({navigation}) => {
  const info = useSelector(selectInfo)
  return(
    <ScrollView>
      <View>
        {info.friends.length > 0 ? info.friends.map(friend => 
          <ConversationPre
            navigation={navigation}
            last_message_date={friend.last_message_date} 
            user={friend.user} 
            profile_pic={friend.profile_pic}
            key={friend.id}
            id={friend.id}
            />)
          :
          <Text style={styles.empty_list_message}>Uh Oh! You don't have any Friends yet. Try to add them via the search box and they will appear here when they accept your friend request.</Text>
        }
      </View> 
    </ScrollView>
  )
}



 const ConversationPre = (props) => {
  const date = new Date(props.last_message_date)
  var now = new Date()
  now.setHours(now.getHours() + 4);
  console.log(props.user, 'date:', date, 'now:', now)
  
  console.log(props.user, now - date)
  if (now - date > 10000){
    return(
      <TouchableOpacity onPress={() => props.navigation.navigate('Conversation',{
        friend: props.user,
        id: props.id
      })}>
         <View style={messageStyles.container}>
           <Image style={styles.smallImage} source={{uri: props.profile_pic}} />
           <View style={messageStyles.convo_info}>
             <Text style={messageStyles.user}>{props.user}</Text>
             <Text style={messageStyles.DBSFdate}>{props.last_message_date.substring(0, props.last_message_date.length - 9)}</Text>
           </View>
       </View>
      </TouchableOpacity>
     ) 
  }
  else {
    return(
      <TouchableOpacity onPress={() => props.navigation.navigate('Conversation',{
        friend: props.user,
        id: props.id
      })}>
         <View style={messageStyles.container}>
           <Image style={styles.smallImage} source={{uri: props.profile_pic}} />
           <View style={messageStyles.convo_info}>
             <Text style={messageStyles.user}>{props.user}</Text>
             <Text style={messageStyles.date}>{props.last_message_date.substring(0, props.last_message_date.length - 9)}</Text>
           </View>
       </View>
      </TouchableOpacity>
    ) 
  }  
}


export const messageStyles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderWidth: 2,
    borderColor: 'silver',
    borderRadius: 10,
    margin: 5,
    shadowColor: 'black',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    
  },
  user: {
    fontWeight: 'bold'
  },
  date: {
    color: 'silver'
  },
  DBSFdate: {
    color: 'black',
    backgroundColor: 'red'
  }
})