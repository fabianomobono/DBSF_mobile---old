import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { View, Text, Image, StyleSheet, Button} from 'react-native'
import { TouchableOpacity } from 'react-native'
import { styles } from '../../styles'
import { useSelector } from 'react-redux'
import { selectToken } from '../status/statusSlice'
import { Post } from '../posts/PostsList'
import { profileStyle } from './Profile'
import { AntDesign } from '@expo/vector-icons';


export const FriendsProfile = ({route, navigation}) => {
	
	//set variables from navigation params
	const { first, last, user, profile_pic } = route.params
	const token = useSelector(selectToken)
	const [fullPic, setFullPic] = useState(false)


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
		console.log(res)
		setPosts(res.posts.posts)
	})
	.catch(res => console.log(res))
	},[])

	// show the full profile pic
	if (fullPic){
		return (
			<View>
			  <View style={{direction: 'rtl', flexDirection: 'row', backgroundColor: 'black'}}>
				<TouchableOpacity onPress={() => setFullPic(false)}>
				  <AntDesign name="close" size={30} color="white" style={styles.close} />
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
					<TouchableOpacity style={styles.button}>
						<Text  style={{fontSize: 20 , color: 'white', fontWeight: 'bold'}}>Request Friendship</Text>
					</TouchableOpacity>
					<Text style={profileStyle.text}>Name: {first} {last}</Text>
					<Text style={profileStyle.text}>Username: {user}</Text>               
				</View>
				<View>
					
					{
					// if the user has written posts display the posts, else display empty posts list message
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
		padding: 20,
		flex: 1,
	},
	profile_pic: {
		width: 200, 
		height: 200, 
		borderRadius: 200
	},
	text: {
		fontSize: 20,
		fontWeight: 'bold',
		color: 'grey',
		marginTop: 30,
	},

})
