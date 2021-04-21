import React, { useEffect, useState } from 'react' 
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { useSelector } from 'react-redux'
import { selectInfo } from '../info/infoSlice'
import { styles } from '../../styles'
import { Image } from 'react-native'
import { selectToken } from '../status/statusSlice'
import { Post } from '../posts/PostsList'

export const Profile = () => {
  const info = useSelector(selectInfo)
  const token = useSelector(selectToken)
  console.log(info.user)
  const [own_posts, setOwn_posts] = useState([])

  useEffect( () => {
    fetch('https://dbsf.herokuapp.com/api/one_persons_posts', {
      method: 'POST',
      headers: {
         Authorization: 'Token '.concat(token),
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
      body: JSON.stringify({friend: info.user}) 
    }).then(res => res.json()).then(r => setOwn_posts(r.posts.posts)).catch(r => console.log('something went wrong'))
    
  }, [])
  return (
    <ScrollView>
      <View style={profileStyle.container}>
        <Text style={profileStyle.title}>
          This is goint to be the profile page !!
        </Text>
        <Image source={{uri:info.profile_pic}}  style={profileStyle.profile_pic}/>
        <View>
          <Text style={profileStyle.text}>Name: {info.first} {info.last}</Text>
          <Text style={profileStyle.text}>Email: {info.email}</Text>
          <Text style={profileStyle.text}>Date of Birth: {info.dob}</Text>
        </View>
      </View>
      <View >
        {own_posts.length ? own_posts.map(t => 
          <Post
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

const profileStyle = StyleSheet.create({
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