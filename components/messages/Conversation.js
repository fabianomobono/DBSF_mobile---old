import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons'
import { useSelector } from 'react-redux';
import { selectToken} from '../status/statusSlice'
import { selectUsername } from '../info/infoSlice';

export const Conversation = ({route}) => {

    // friend username
    const { friend, id } = route.params
    const current_user = useSelector(selectUsername)


    // create a new WebSocket connection with the friendship ID
    
    
    // text from the text input
    const [text, setText] = useState('') 
    // array of objects containing the messages and info about sender and receiver and the message id
    const [messages, setMessages] = useState([])
    //This opens a chatsocket 
    const [chatSocket, setChatsocket] = useState(new WebSocket('wss://dbsf.herokuapp.com/wss/chat/' + id + '/'))
    
    // get the token from the redux store 
    const token = useSelector(selectToken)

   
    // load previous messages from server when the component mounts
    useEffect(() => {

        // fetch  the messages from the server
        fetch('https://dbsf.herokuapp.com/api/get_messages', {
            method: 'POST',
            headers: {
                Authorization: 'Token '.concat(token),
                'Content-type': 'application/json'
            },
            body: JSON.stringify({friend: friend})
        })
        .then(res => res.json())
        .then(res => {
            setMessages(res.messages)                          
 
        })
        .catch(res => console.log('Something went wrong with fetching the messages', res))
        return function cleanUp() {
            // close the WebSocket connection when the component unmounts
            chatSocket.close()
           
        }    
    },[])

    // add the message to the messages array when the WebSocket emits an onmessage event
    chatSocket.onmessage = (e) => {
        const data = JSON.parse(e.data)      
        setMessages([...messages, {sender: data.sender, text: data.message, receiver: data.receiver, id: data.id}])
        setText('')
    }

    
    const sendMessage = () => {
        if (text.length > 0 && text.trim().length) {
            chatSocket.send(JSON.stringify({
                sender: current_user,
                receiver: friend,
                message: text
            }))
            setText('')
          
        }
        else {
            setText('')
        }
       
    }
    
    return (
      <KeyboardAvoidingView style={conversationStyles.container} behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={60} >
        <View style={conversationStyles.titleContainter}>
            <Text style={conversationStyles.title}>This is your conversation with {friend}</Text>
        </View>
        <MessageContainer messages={messages}/>
        <View style={conversationStyles.textInputContainer}>
            <TextInput style={conversationStyles.textInput} onChangeText={text => setText(text)} value={text} onSubmitEditing={sendMessage}/> 
            <TouchableOpacity style={{backgroundColor: 'steelblue', padding: 10, borderRadius: 50}} onPress={sendMessage}>
                <FontAwesome name="send" size={24} color="white" />
            </TouchableOpacity>   
        </View>        
      </KeyboardAvoidingView>
    )
}


const MessageContainer = (props) => {

    // create a ref to scroll to end
    const scrollViewRef = useRef()

    return (
        <ScrollView style={conversationStyles.messageContainer} ref={scrollViewRef} onContentSizeChange={() => scrollViewRef.current.scrollToEnd({animated: true})}>
            {props.messages.map(message => <MessageBubble sender={message.sender} key={message.id} text={message.text}/>)}
        </ScrollView>
    )
}

const MessageBubble = (props) => {
    const current_user = useSelector(selectUsername)
    if (props.sender === current_user){
        return (
            <View style={{ flexDirection: 'row-reverse'}}>
                 <View style={conversationStyles.messageBubbleSender}>
                     <Text style={{color: 'white', fontSize: 20}}>{props.text}</Text>
                 </View>
            </View>
         )
    }
    else {
        return(
            <View style={{ flexDirection: 'row-reverse'}}>
                <View style={conversationStyles.messageBubbleReceiver}>
                    <Text style={{color: '#333', fontSize: 20}}>{props.text}</Text>
                </View>
            </View>  
        )
    }
   
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
        
    },
    messageBubbleReceiver: {
        padding: 10,
        borderRadius: 20,
        backgroundColor: 'grey',
        color: 'white',
        alignSelf: 'flex-start',
        maxWidth: 200,
        marginRight: 330,
        margin: 10,
        
    }
})