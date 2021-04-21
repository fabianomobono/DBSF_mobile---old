import React, { useState } from 'react'
import { Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { postStyle } from './PostsList'
import { styles } from '../../styles'
import { TextInput } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import { selectInfo, selectUsername, selectProfile_pic } from '../info/infoSlice'

export const SinglePostPage = ({ route, navigation }) => {
    // state components
    const [commentText, setCommentText] = useState('')
    const [comments, setComments] = useState([])
    const info = useSelector(selectInfo)
   
    const current_user = useSelector(selectUsername)
    const current_user_profile_pic = useSelector(selectProfile_pic)
    
    const new_comment = () => {
        setComments([...comments,{text: commentText}])
        setCommentText('')
        console.log(current_user_profile_pic)
        console.log('This was the info from SinglePostPage')
    }

    const {text, author, date, profile_pic} = route.params
    return (
        <View style={postStyle.container}>
        <View style={postStyle.info}>
          <Image source={{uri:profile_pic}} style={styles.smallImage}/>
          <View>
            <Text style={postStyle.author}>{author}</Text>
            <Text style={postStyle.date}>{date}</Text>
          </View>
        </View>
        <View style={postStyle.postBody}>
          <Text style={postStyle.text}>
            {text}
          </Text>
          <View style={SinglePostStyle.commentContainer}>
            {comments.map(c => <Comment text={c.text} current_user={current_user} current_user_profile_pic={current_user_profile_pic}/>)}
          </View>
          <TextInput 
            style={SinglePostStyle.commentTextInput} 
            placeholder='Comment...'value={commentText} 
            onChangeText={comment => setCommentText(comment)}
            onSubmitEditing={new_comment}
          />
        </View>
      </View>
    )
}

const Comment = (props) => {
    return (
        <View style={SinglePostStyle.comment}>
          <View style={SinglePostStyle.commentInfo}>
            <Image source={{uri: props.current_user_profile_pic}} style={SinglePostStyle.commentPic}/>
            <Text style={SinglePostStyle.commentAuthor}>{props.current_user}</Text>
          </View>
          <Text style={SinglePostStyle.commentText}>{props.text}</Text>
        </View>
    )
}

const SinglePostStyle = StyleSheet.create({
    commentTextInput: {
        backgroundColor: '#eee',
        padding: 20,
        fontSize: 15,
        borderRadius: 20,
        color: '#444'
    },
    commentContainer: {
        borderColor: '#999',
        borderWidth: 2,
        borderRadius: 10,
        margin: 10,
    },
    comment: {
        backgroundColor: 'rgba(200, 200, 200, 0.8)',
        padding: 10,
        margin: 3,
        borderColor: 'grey',
        borderWidth: 3,
        borderRadius: 10,        
    },
    commentText: {
        color: '#666',
        fontSize: 15,
        marginLeft: 5,
    },
    commentPic: {
        width: 20,
        height: 20,
        borderRadius: 20,
    },
    commentAuthor: {
        fontWeight: 'bold',
        marginLeft: 5,
    },
    commentInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 10,

    }
})