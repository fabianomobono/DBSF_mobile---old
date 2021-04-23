import React, { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { View, Text, Image, StyleSheet, Button} from 'react-native'
import { PresignedPost } from 'aws-sdk/clients/s3'
import { TouchableOpacity } from 'react-native'
import { styles } from '../../styles'

export const FriendsProfile = ({route}) => {
    const { first, last, user, profile_pic } = route.params
    return (
        <ScrollView>  
            <View style={FriendsProfileStyles.container}>
                <Image source={{uri: profile_pic}} style={FriendsProfileStyles.profile_pic}/>
                <TouchableOpacity style={styles.button}>
                    <Text  style={{fontSize: 20 , color: 'white', fontWeight: 'bold'}}>Request Friendship</Text>
                </TouchableOpacity>
                <Text style={FriendsProfileStyles.text}>Name: {first} {last}</Text>
                <Text style={FriendsProfileStyles.text}>Username: {user}</Text>     
            </View>
   
        </ScrollView>
    )
}

const FriendsProfileStyles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 20,

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
    }

})
