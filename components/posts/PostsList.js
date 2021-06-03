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

  const singlePost = () => {
    props.navigation.navigate('Single Post', {
      text: props.text,
      author: props.author,
      date: props.date,
      profile_pic: props.profile_pic,
      id: props.id,
      comments: props.comments
    })
  }

  return (
    <TouchableWithoutFeedback onPress={singlePost}>
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
        <View style={postStyle.feeling}>
          <TouchableOpacity style={postStyle.feelingTouchYay}>
            <Text style={postStyle.feelingTextYay}>&#128077;</Text>
          </TouchableOpacity>
          <TouchableOpacity style={postStyle.feelingTouchNay}>  
            <Text style={postStyle.feelingTextNay}>&#128078;</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={postStyle.commentContainer} onPress={singlePost}>
          <Text style={postStyle.commentButton}>Comment...</Text>
        </TouchableOpacity>
    </View>
    </TouchableWithoutFeedback>
  )
}


export const postStyle = StyleSheet.create({
  author: {
    fontSize: 15,
    fontWeight: 'bold',
    padding: 5,
    paddingBottom: 1
  },
  commentButton: {
    color: colors.grey,
  },
  commentContainer: {
    backgroundColor: colors.silver,
    borderRadius: 10,
    marginVertical: 10,
    padding: 10
  },
  container: {
    backgroundColor: colors.white,
    borderColor: colors.silver,
    borderRadius: 10,
    borderWidth: 1,
    margin: 5,
    padding: 20,
    paddingBottom: 40
  },
  date: {
    color: colors.grey,
    padding: 5,
    paddingTop: 1
  },
  feeling: {
    borderColor: colors.silver,
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  },
  feelingTextNay: {
    color: colors.silver,
    fontSize: 20,
    fontWeight: 'bold',
    padding: 5,
    paddingHorizontal: 40
  },
  feelingTextYay: {
    color: colors.silver,
    fontSize: 20,
    fontWeight: 'bold',
    padding: 5,
    paddingHorizontal: 40
  },
  feelingTouchNay: {
    backgroundColor: colors.DBSFred,
    borderRadius: 10
  },
  feelingTouchYay: {
    backgroundColor: colors.DBSFGreen,
    borderRadius: 10
  },
  info: {
    flexDirection: 'row',
    padding: 5
  },
  postBody: {},
  text: {
    color: colors.darkGrey,
    fontSize: 15,
    padding: 20
  }
})
