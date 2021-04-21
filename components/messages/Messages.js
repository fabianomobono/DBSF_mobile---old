import React, { useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import { selectInfo} from '../info/infoSlice'
import { styles } from '../../styles'



export const Messages = () => {
  const info = useSelector(selectInfo)
  console.log("this is ingo")
  console.log(info)
  return(
    <ScrollView>
      <View>
        {info.friends.length > 0 ? info.friends.map(friend => 
          <Conversation 
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



 const Conversation = (props) => {
  return(
    <View style={messageStyles.container}>
      <Image style={styles.smallImage} source={{uri: props.profile_pic}} />
      <View style={messageStyles.convo_info}>
        <Text style={messageStyles.user}>{props.user}</Text>
        <Text style={messageStyles.date}>{props.last_message_date}</Text>
      </View>
    </View>
  ) 
}


const messageStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderWidth: 4,
    borderColor: 'silver'
  },
  user: {
    fontWeight: 'bold'
  },
  date: {
    color: 'silver'
  }
})