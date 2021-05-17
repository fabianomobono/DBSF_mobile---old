import * as ImagePicker from 'expo-image-picker'

import { FontAwesome, FontAwesome5 } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { colors, styles } from '../../styles'
import { selectInfo, update_profile_pic } from '../info/infoSlice'
import { useDispatch, useSelector } from 'react-redux'

import { AntDesign } from '@expo/vector-icons';
import { Image } from 'react-native'
import { Platform } from 'react-native'
import { Post } from '../posts/PostsList'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { TouchableWithoutFeedback } from 'react-native'
import { selectToken } from '../status/statusSlice'

export const Profile = ({navigation}) => {

  // variables from the redux store
  const info = useSelector(selectInfo)
  const token = useSelector(selectToken)
  const dispatch = useDispatch()

  //state variables
  const [own_posts, setOwn_posts] = useState([])
  const [newImage, setNewImage] = useState(null)
  const [saveButton, setSaveButton] = useState(false)
  const [fullPic, setFullPic] = useState(false)

  // when the component mounts
  useEffect( () => {
    // ask for permission to grant access to the devices photo library
    (async () => {
      if (Platform.OS !== 'web') {
        var { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
        
        // ask for camera permission
        var { status } = await ImagePicker.requestCameraPermissionsAsync();
        if ( status !== 'granted') {
          alert(('Sorry, we need camera permissions to make this work!'))
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

  // function that opens the camera roll
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setNewImage(result);
      setSaveButton(true)
    }
  }

  // function that opens the camera
  const takePicture = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
    })
    console.log(result)
    if (!result.cancelled) {
      setNewImage(result)
      setSaveButton(true)
    }
  }

  // helper function to prepare the data for the server
  const createFormData = (photo) => {
    const data = new FormData();
  
    data.append("profile_pic", {
      name: info.user.concat('_profile_pic'),
      type: photo.type,
      uri:  Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
       
    });

    return data;
  };
  

  const saveNewProfilePic = () => {
    // check again if the image exists in the local state
    if (newImage) {
      //prepare the image to be send via fetch
      const formdata = createFormData(newImage)
      console.log(formdata)
      // make a post request to save the new image
      fetch('https://dbsf.herokuapp.com/api/update_profile_pic', {
        method: 'POST',
        headers: {
          Authorization: 'Token '.concat(token),
        },
        
        body: formdata
      })
      .then(
        res => res.json()
      )
      .then(res => {
        console.log(res)
        dispatch(update_profile_pic(res.response))
        setSaveButton(false)
      })
      .catch(res => console.log('this is not working yet'))
    }
    else {
      alert(" we couldn't save the image")
    }
  }

  const showFullPic = () => {
    setFullPic(true)
  }


  if(fullPic) {
    return (
      <View>
        <View style={{direction: 'rtl', flexDirection: 'row', backgroundColor: 'black'}}>
          <TouchableOpacity onPress={() => setFullPic(false)}>
            <AntDesign name="close" size={30} color={colors.white} style={styles.close} />
          </TouchableOpacity>
        </View>
        <View style={profileStyle.fullImageBackground}>       
          <Image source={{uri:info.profile_pic}} style={profileStyle.fullImage} />
        </View>
      </View>     
    )   
  }
  else {
    return (   
      <ScrollView>
        <View style={profileStyle.container}>
          <TouchableWithoutFeedback onPress={showFullPic}>
            {
              newImage ? 
              <Image source={{uri:newImage.uri}} style={profileStyle.profile_pic}/>
              : 
              <Image source={{uri:info.profile_pic}} style={profileStyle.profile_pic}/> 
            }
            
          </TouchableWithoutFeedback>
          {
            saveButton &&
            <TouchableOpacity style={profileStyle.saveNewProfilePictureButton} onPress={saveNewProfilePic}>
              <Text style={styles.buttonText}>Save new Profile Pic</Text>
            </TouchableOpacity>
          }
          <View style={profileStyle.updateProfilePicView}>
            <TouchableOpacity style={profileStyle.updateProfilePicButton} onPress={takePicture}>
              <FontAwesome5 name="camera" size={30} color={colors.grey} />
            </TouchableOpacity>
            <TouchableOpacity style={profileStyle.updateProfilePicButton} onPress={pickImage}>
              <FontAwesome name="photo" size={30} color={colors.grey} />
            </TouchableOpacity>
          </View>       
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
              author={t.author} 
              profile_pic={info.profile_pic}
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
  
}

export const profileStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  title: {
    textAlign: 'center',
    backgroundColor: colors.DBSFred,
    fontSize: 30,
    color: colors.darkGrey
  },
  profile_pic: {
    margin: 20,
    width: 200,
    height: 200,
    borderRadius: 100,
    borderColor: colors.powderBlue,
    borderWidth: 4,
  },
  text: {
    color: colors.grey,
    fontSize: 15,
    padding: 10,
    fontWeight: 'bold'
  },
  updateProfilePicView: {
    flexDirection: 'row',
    padding: 20,
  },
  updateProfilePicButton: {
    padding: 20,
    paddingTop: 0
  },
  saveNewProfilePictureButton: {
    backgroundColor: colors.DBSFBlue,
    padding: 20,
    borderRadius: 50,
  },
  fullImageBackground: {
    backgroundColor: colors.black,
    height: 600,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  fullImage: {
    marginTop: -100,
    width: 300,
    height: 300,
  }
})