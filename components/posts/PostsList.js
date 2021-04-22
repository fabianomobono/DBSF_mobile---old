import { useLinkProps } from '@react-navigation/native'
import React from 'react'
import { FlatList, Text, View, StyleSheet, Image } from 'react-native'
import { styles } from '../../styles'
import  coglioni  from '../../assets/coglioni.jpg'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

const posts = [
  {id: 1, user: 'fabian', text: 'this is post number one'}, 
  {id: 2, user: 'linda', text: 'This is post number 2'}, 
  {id: 3, user: 'babbo', text: 'oggi si mangia pasta alle vongole'},
  {id: 4, user: 'mamma', text: 'alles gutes Liebes'},
  {id: 5, user: 'mattia', text: 'mi sono innamorato'},
  {id: 6, user: 'elisa', text: 'non ho tempo'},
  {id: 7, user: 'mirko', text: 'viva il BJJ'},
  {id: 7, user: 'mirko', text: 'viva il BJJ'},
  {id: 7, user: 'mirko', text: 'viva il BJJ'},
  {id: 7, user: 'mirko', text: 'viva il BJJ'}
]

export const PostsList = () => {
  return (
    <View>
     <FlatList
      style={styles.postsList}
      data={posts}
      renderItem={({item}) => <Text style={styles.post}>{item.user} wrote: {item.text} Post id: {item.id}</Text>}  />
    </View>
  )
}


export const Post = (props) => {
  return (
    <TouchableWithoutFeedback onPress={() => props.navigation.navigate('Single Post',{
      text: props.text,
      author: props.author,
      date: props.date,
      profile_pic: props.profile_pic,
      id: props.id
    })}>
      <View style={postStyle.container}>
      <View style={postStyle.info}>
        <Image source={{uri:props.profile_pic}} style={styles.smallImage}/>
        <View>
          <Text style={postStyle.author}>{props.author}</Text>
          <Text style={postStyle.date}>{props.date}</Text>
        </View>
      </View>
      <View style={postStyle.postBody}>
        <Text style={postStyle.text}>
          {props.text}
        </Text>
      </View>
    </View>
    </TouchableWithoutFeedback>
    
  )
}


export const postStyle = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    borderColor: 'silver',
    borderWidth: 3,
    marginTop: 5,
  },

  text: {
    color: '#444',
    fontSize: 15,
    padding: 20,
  },

  info: {
    flexDirection: 'row',
    padding: 5
  },

  author: {  
    padding: 5,
    paddingBottom: 1,
    fontWeight: 'bold',
    fontSize: 15
  },

  date: {
    paddingTop: 1,
    padding: 5,
    color: 'grey'
  },

  postBody: {  
  }
})
