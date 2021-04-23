import React, { useEffect, useState } from 'react' 
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { useSelector } from 'react-redux'
import { selectInfo } from '../info/infoSlice'
import { styles } from '../../styles'
import { Image } from 'react-native'
import { selectToken } from '../status/statusSlice'
import { Post } from '../posts/PostsList'
import * as ImagePicker from 'expo-image-picker'
import { Platform } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native'

export const Profile = ({navigation}) => {

  // variables from the redux store
  const info = useSelector(selectInfo)
  const token = useSelector(selectToken)
  

  //state variables
  const [own_posts, setOwn_posts] = useState([])
  const [newImage, setNewImage] = useState(null)

  // when the component mounts
  useEffect( () => {
    // ask for permission to grant access to the devices photo library
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();

    fetch('https://dbsf.herokuapp.com/api/one_persons_posts', {
      method: 'POST',
      headers: {
         Authorization: 'Token '.concat(token),
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
      body: JSON.stringify({friend: info.user}) 
    }).then(res => res.json()).then(r => setOwn_posts(r.posts.posts)).catch(r => console.log('something went wrong'))
    
    // aske permission to access the camera
    
  }, [])


  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setNewImage(result.uri);
    }
  }


  return (
    <ScrollView>
      <View style={profileStyle.container}>
        <TouchableWithoutFeedback onPress={pickImage}>
          {
            newImage ? 
            <Image source={{uri:newImage}} style={profileStyle.profile_pic}/>
            : 
            <Image source={{uri:info.profile_pic}} style={profileStyle.profile_pic}/> 
          }
          
        </TouchableWithoutFeedback>
       
        <View>
          <Text style={profileStyle.text}>Name: {info.first} {info.last}</Text>
          <Text style={profileStyle.text}>Email: {info.email}</Text>
          <Text style={profileStyle.text}>Date of Birth: {info.dob}</Text>
        </View>
      </View>
      <View >
        {own_posts.length ? own_posts.map(t => 
          <Post
            navigation={navigation}
            id={t.id}
            key={t.id}
            text={t.text} 
            author={t.author } 
            profile_pic={t.author_picture}
            date={t.date} 
          />
          )
          :
          <View style={profileStyle.container}>
            <Text style={styles.empty_list_message}>{info.user} has not written any posts yet...check back later</Text>
          </View>
        }
      </View>
    </ScrollView>
    
  )
}

export const profileStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  title: {
    textAlign: 'center',
    backgroundColor: 'red',
    fontSize: 30,
    color: '#444'
  },
  profile_pic: {
    margin: 20,
    width: 200,
    height: 200,
    borderRadius: 100,
    borderColor: 'powderblue',
    borderWidth: 4,
  },
  text: {
    color: '#777',
    fontSize: 15,
    padding: 10,
    fontWeight: 'bold'
  }
})