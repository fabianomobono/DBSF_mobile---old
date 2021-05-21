import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { colors, styles } from '../../styles'
import { useDispatch, useSelector } from 'react-redux'

import { AntDesign } from '@expo/vector-icons';
import { Post } from '../posts/PostsList'
import { TouchableOpacity } from 'react-native'
import { profileStyle } from './Profile'
import { selectToken } from '../status/statusSlice'
import { update_info } from '../info/infoSlice';

export const FriendsProfile = ({route, navigation}) => {
	
	//set variables from navigation params
	const {user, profile_pic } = route.params

	// set local state
	const [first, setFirst] = useState('')
	const [last, setLast] = useState('')
	const [email, setEmail] = useState('')
	const [fullPic, setFullPic] = useState(false)
	const [status, setStatus] = useState('')

	const dispatch = useDispatch()
	// get the current user from the redux store
	const token = useSelector(selectToken)
	
	// set local state variables
	const [posts, setPosts] = useState([])

	useEffect(() => {
	
		// get this users posts from the server
		fetch('https://dbsf.herokuapp.com/api/one_persons_posts', {
		method: 'POST',
		headers: {
			'Content-type': 'application/json',
			'Authorization': 'Token '.concat(token)
		},
		body: JSON.stringify({friend: user})
	})
	.then(res => res.json())
	.then(res =>{
		
		// set all the local variables
		setPosts(res.posts.posts)
		setFirst(res.posts.first)
		setLast(res.posts.last)
		setEmail(res.posts.email)
		setStatus(res.status)	
	})
	.catch(res => console.log(res))
	},[])


	const requestFriendship = () => {
		// change the status to pending
		setStatus('pending or rejected')

		fetch('https://dbsf.herokuapp.com/api/requestFriendship', {
			method: 'POST',
			headers: {
				'Content-type': "application/json",
				Authorization: 'Token '.concat(token)				
			},
			body: JSON.stringify({potentialFriend: user})
		})
		.then(res => res.json())
		.then(res => {
			if (res.response === 'request sent') {
				setStatus(res.reponse)
			}
			else if (res.response === 'this friendship already exists') {
				alert('something is wrong, the friendship already exists')
			}
		})
		.catch(res => console.log('Oh great something went wrong...again!', res))
	}

	//infriend logic
	const unFriend = () => {
		//fetch a post request with the friends username in the body
		fetch('https://dbsf.herokuapp.com/api/unfriend', {
			method: 'POST',
			headers: {
				Authorization: 'Token '.concat(token),
				'Content-type': 'application/json'
			},
			body: JSON.stringify({soonExFriend: user})
		})
		.then(res => res.json())
		.then(res => {
			if (res.response === 'friendship was deleted' || res.response === 'friendship was deleted...received Friendship'){
				setStatus('not friends')
				dispatch(update_info(res.info))
			}
		})
		.catch(res => {
			console.log('something went wrong with Unfriending')
			console.log(res)
		})
	}

	// function that decides what the Friendship request button should display
	const buttonText = () => {
		switch(status) {
			case 'friends':
				return 	<TouchableOpacity style={styles.button} onPress={unFriend}>
									<Text  style={{fontSize: 20 , color: colors.white, fontWeight: 'bold'}}>Unfriend </Text>
								</TouchableOpacity>

			case 'not friends':
				return 	<TouchableOpacity style={styles.button} onPress={requestFriendship}>
									<Text  style={{fontSize: 20 , color: colors.white, fontWeight: 'bold'}}>Request Friendship</Text>
								</TouchableOpacity>
				
			case 'pending or rejected':
				return 	<TouchableWithoutFeedback style={styles.buttonDisabled}>
									<Text  style={{fontSize: 20 , color: colors.white, fontWeight: 'bold'}}>Pending</Text>
								</TouchableWithoutFeedback>

			case 'request sent':
				return <TouchableWithoutFeedback style={styles.buttonDisabled}>
									<Text  style={{fontSize: 20 , color: colors.white, fontWeight: 'bold'}}>Request sent!</Text>
								</TouchableWithoutFeedback>
		}
	}
	// show the full profile pic
	if (fullPic){
		return (
			<View>
			  <View style={{direction: 'rtl', flexDirection: 'row', backgroundColor: colors.black}}>
				<TouchableOpacity onPress={() => setFullPic(false)}>
				  <AntDesign name="close" size={30} color={colors.white} style={styles.close} />
				</TouchableOpacity>
			  </View>
			  <View style={profileStyle.fullImageBackground}>       
				<Image source={{uri:profile_pic}} style={profileStyle.fullImage} />
			  </View>
			</View>     
		  )   
	}

	else {
		return (
			<ScrollView>  
				<View style={profileStyle.container}>
					<TouchableOpacity onPress={() => setFullPic(true)}>
						<Image source={{uri: profile_pic}} style={profileStyle.profile_pic}/>
					</TouchableOpacity>					
					{buttonText()}
					<Text style={profileStyle.text}>Name: {first} {last}</Text>
					<Text style={profileStyle.text}>Username: {user}</Text>    
					<Text style={profileStyle.text}>Email: {email}</Text>           
				</View>
				<View>
					
					{
					// if the user has written posts display the posts, else display empty posts-list message
					posts.length ? posts.map(t =>                
						<Post
							navigation={navigation}
							id={t.id}
							key={t.id}
							text={t.text} 
							author={t.author} 
							profile_pic={t.author_picture}
							date={t.date}
							comments={t.comments}
						/>
						)
						:
						<View style={profileStyle.container}>
							<Text style={styles.empty_list_message}>{user} has not written any posts yet...check back later</Text>
						</View>
					}
				</View>     
			</ScrollView>
		)
	}	
}

const FriendsProfileStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    padding: 20
  },
  profile_pic: {
    borderRadius: 200,
    height: 200,
    width: 200
  },
  text: {
    color: colors.grey,
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 30
  }
})
