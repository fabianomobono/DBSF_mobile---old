import React, { useState } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'


export const SinglePostPage = ({ route, navigation }) => {
    const {text, author, date, profile_pic} = route.params
    return (
        <View>
            <Text>THis will be the single post page</Text>
            <Text>{author}</Text>
            <Text>{text}</Text>
        </View>
    )
}