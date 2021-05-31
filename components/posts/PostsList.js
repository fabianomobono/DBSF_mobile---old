import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { colors, styles } from '../../styles'

import React from 'react'
import { selectUsername } from '../info/infoSlice'
import { useLinkProps } from '@react-navigation/native'
import { useSelector } from 'react-redux'

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

  const like = () => {
    alert('like')
  }

  const dislike = () => {
    alert('dislike')
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
          <View style={postStyle.feeling}>
            <TouchableOpacity style={postStyle.feelingTouch}>
              <Text style={postStyle.feelingText}>Like</Text>
            </TouchableOpacity>
            <TouchableOpacity style={postStyle.feelingTouch}>  
              <Text style={postStyle.feelingText}>Dislike</Text>
            </TouchableOpacity>
          </View>
        </View>
    </View>
    </TouchableWithoutFeedback>
  )
}


export const postStyle = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: colors.white,
    borderColor: colors.silver,
    borderWidth: 1,
    paddingBottom: 40,
    margin: 5,
    borderRadius: 10,
  },
  feelingTouch: {
    backgroundColor: colors.DBSFGreen,
  },
  feeling: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 3,
    borderColor: colors.silver,
  },
  feelingText: {
    padding: 5,
    paddingHorizontal: 40,
    fontWeight: 'bold',
    color: colors.silver,
    borderWidth: 2,
    
  },
  text: {
    color: colors.grey,
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
    color: colors.grey
  },

  postBody: { 

  }
})
