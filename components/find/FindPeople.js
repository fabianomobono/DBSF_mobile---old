import { CloudSearch } from 'aws-sdk'
import React, { useState } from 'react'
import {Text, View, ScrollView, TextInput, StyleSheet } from 'react-native'
import { styles } from '../../styles'

export const FindPeople = () => {
    
    //state variables
    const [searchTerm, setSearchTerm] = useState('')


    // search for people using the search term
    const search = () => {
        alert(searchTerm)
    }

    return (
        <ScrollView style={findPeople.container}>
            <View  style={findPeople.subContainer}>
                <TextInput placeholder='Search for other users' style={styles.textInput} onChangeText={text => setSearchTerm(text)} onSubmitEditing={search}/>
            </View> 
        </ScrollView>
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
})


