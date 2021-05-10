import { useLinkProps } from '@react-navigation/native'
import React from 'react'
import { FlatList, Text, View, StyleSheet, Image } from 'react-native'
import { styles } from '../../styles'
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import { selectUsername } from '../info/infoSlice'


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

  // get the current user in order to decide if the to navigate the user's own profile page
  // or a different user
  const current_user = useSelector(selectUsername)


  // navigate to the author's profile page
  const friendsPage = () => {    
    if(props.author === current_user) {
      props.navigation.navigate('Profile')
    }
    else {
      props.navigation.navigate('Friends Profile', {
        profile_pic: props.profile_pic,
        user: props.author,
        first: props.first,
        last: props.last
      })
    }
    
}

  return (
    <TouchableWithoutFeedback onPress={() => props.navigation.navigate('Single Post', {
      text: props.text,
      author: props.author,
      date: props.date,
      profile_pic: props.profile_pic,
      id: props.id,
      comments: props.comments
    })}>
      <View style={postStyle.container}>
        <View style={postStyle.info}>
          <TouchableOpacity onPress={friendsPage}>
            <Image source={{uri:props.profile_pic}} style={styles.smallImage}/>
          </TouchableOpacity>       
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
    borderWidth: 1,
    paddingBottom: 40,
    margin: 5,
    borderRadius: 10,
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
