import React, { useState } from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons'


export const Conversation = ({route}) => {
    
    // temporary messages const
    const [text, setText] = useState('') 
    const [messages, setMessages] = useState([])


    const sendMessage = () => {
        var str = " "
        if (text.length > 0 && text.trim().length) {
            setMessages([...messages, {text: text}])
            setText('')
        }
        else {
            setText('')
        }
    }

    const { friend } = route.params
    return (
      <KeyboardAvoidingView style={conversationStyles.container} behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={60} >
        <View style={conversationStyles.titleContainter}>
            <Text style={conversationStyles.title}>This is your conversation with {friend}</Text>
        </View>
        <ScrollView style={conversationStyles.messageContainer} >
            {messages.map(message => <MessageBubble text={message.text}/>)}
        </ScrollView>
        <View style={conversationStyles.textInputContainer}>
            <TextInput style={conversationStyles.textInput} onChangeText={text => setText(text)} value={text} onSubmitEditing={sendMessage}/> 
            <TouchableOpacity style={{backgroundColor: 'steelblue', padding: 10, borderRadius: 50}} onPress={sendMessage}>
                <FontAwesome name="send" size={24} color="white" />
            </TouchableOpacity>   
        </View>        
      </KeyboardAvoidingView>
    )
}


const MessageBubble = (props) => {
    return (
       <View style={{ flexDirection: 'row-reverse'}}>
            <View style={conversationStyles.messageBubbleSender}>
                <Text style={{color: 'white', fontSize: 20}}>{props.text}</Text>
            </View>
       </View>
    )
}

const conversationStyles = StyleSheet.create({
    container: {
        
        flex: 1,
        
    },
    titleContainter: {
        alignItems: 'center',   
        backgroundColor: 'blue',
       
    }, 
    title: {
        fontWeight: 'bold',
        color: 'grey',
    },
    messageContainer: {
        backgroundColor: 'white',
        height: '87%',
        
    },   
    textInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1aa1f0',
        padding: 5,        
        
    },
    textInput: {
        backgroundColor: 'white',
        borderRadius: 50,
        color: '#777',
        width: 320,
        padding: 20,
        marginRight: 15,
        
    },
    messageBubbleSender: {
        padding: 10,
        borderRadius: 20,
        backgroundColor: '#1aa1f0',
        color: 'white',
        alignSelf: 'flex-start',
        maxWidth: 200,
        margin: 10,
        
    }
})