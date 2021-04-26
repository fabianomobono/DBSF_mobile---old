import React, { useState } from 'react'
import {Text, View, ScrollView, TextInput, StyleSheet, Image } from 'react-native'
import { useSelector } from 'react-redux'
import { styles } from '../../styles'
import { selectToken } from '../status/statusSlice'
import { messageStyles } from '../messages/Messages'
import { TouchableWithoutFeedback } from 'react-native'



export const FindPeople = ({navigation}) => {
    
    //state variables
    const [searchTerm, setSearchTerm] = useState('')
    const [users, setUsers] = useState([])
    const [requestSent, setRequestSent] = useState(false)
    console.log(requestSent)
    
    // get the Authorization token from the redux store
    const token = useSelector(selectToken)

    // search for people using the search term
    const search = () => {
        
        fetch('https://dbsf.herokuapp.com/api/findFriends', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Token '.concat(token)
            },
            body: JSON.stringify({
                search_term: searchTerm
            })
        })
        .then(res => res.json())
        .then(res => {
            setRequestSent(true)
            setUsers(res.response)})            
        .catch(res => alert('Oh no....we could not load your results. Try logging out and logging back in'))
    }
    
    return (
        <ScrollView style={findPeople.container}>
            <View style={findPeople.subContainer}>
                <TextInput placeholder='Search for other users' autoCapitalize='none' style={styles.textInput} onChangeText={text => setSearchTerm(text)} onSubmitEditing={search}/>
            </View>
            <View>
                {
                // if the searchTerm is non existent display 'Search for people' else check if to display results
                // or the 'No users containt {searchTerm}...' message
                searchTerm.length > 0 ?
                users.length > 0 ? 
                    users.map(user => <UserFriend first={user.first} last={user.last} profile_pic={user.profile_pic} user={user.user} navigation={navigation}/>)
                :
                    <Text style={styles.empty_list_message}>{requestSent ? 'No users that contain  in their username': 'Search for people' }</Text>
                :
                    <Text style={styles.empty_list_message}>Search for people</Text>
                }
            </View>
        </ScrollView>
    )
}

export const UserFriend = (props) => {

    const friendsPage = () => {
        props.navigation.navigate('Friends Profile', {
            profile_pic: props.profile_pic,
            user: props.user,
            first: props.first,
            last: props.last
        })
    }

    return (
        <TouchableWithoutFeedback onPress={friendsPage}>
             <View style={findPeople.resultUser}>
                <Image style={styles.smallImage} source={{uri: props.profile_pic}} />
                <View >
                    <Text style={messageStyles.user}>{props.user}</Text> 
                    <Text style={findPeople.info}>{props.first} {props.last}</Text>     
                </View>
            </View>
        </TouchableWithoutFeedback>
       
    )
}

const findPeople = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,   
    },
    subContainer: {
        alignItems: 'center'
    },
    resultUser : {
        marginTop: 10,
        borderWidth: 1,
        borderColor: 'silver',
        borderRadius: 20,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
    },
    info: {
        color: 'silver',

    }    
})


