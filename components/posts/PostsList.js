import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { colors, styles } from '../../styles'

import { selectToken } from '../status/statusSlice'
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
  const [likes, setLikes] = useState(0)
  const [dislikes, setDislikes] = useState(0)
  const token = useSelector(selectToken)

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
    fetch('https://dbsf.herokuapp.com/api/like_a_post', {
      method: 'POST',
      headers: {
        Authorization: 'Token '.concat(token),
        'Content-type': 'application/json'
      },
      body: JSON.stringify({post_id: props.id})
    })
    .then(res => res.json())
    .then(response =>{
      if(response.response === 'like created'){
        alert(response.response)
        setLikes(likes + 1)
      }
      else {
        alert('unlike')
        setLikes(likes - 1)
      }
     
    
    })
    .catch(res => {
      console.log('Something is wrong')
      console.log(res)
    })
    
  }

  const dislike = () => {
    fetch('https:/dbsf.herokuapp.com/api/dislike_a_post', {
      method: 'POST',
      headers: {
        Authorization: 'Token '.concat(token),
        'Content-type': 'application/json'
      },
      body: JSON.stringify({post_id: props.id})
    })
    .then(res => res.json())
    .then(response => {
      if(response.response === 'dislike created'){
        alert(response.response)
        setDislikes(dislikes  + 1)
      }
      else {
        alert('removing dislike')
        setDislikes(dislikes - 1)
      }
    })
    
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
          <TouchableOpacity style={postStyle.feelingTouchYay} onPress={like}>
            <Text style={postStyle.feelingTextYay}>&#128077;</Text>
            <Text style={postStyle.feelingCounter}>{likes}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={postStyle.feelingTouchNay} onPress={dislike}>  
            <Text style={postStyle.feelingTextNay}>&#128078;</Text>
            <Text style={postStyle.feelingCounter}>{dislikes}</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.DBSFred,
    borderRadius: 10
  },
  feelingTouchYay: {
    flexDirection: 'row',
    alignItems: 'center',
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
  },
  feelingCounter: {
    marginRight: 5,
    color: colors.grey,
    fontWeight: 'bold',
    
  }
})
