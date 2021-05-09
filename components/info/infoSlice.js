import { createSlice } from '@reduxjs/toolkit'
import moment from 'moment';


export const infoSlice = createSlice({
  name: 'info',
  initialState: {
    info: {
      "dob": "",
      "email": "",
      "first": "",
      "friend_requests": [],
      "friends": [],
      "posts": [],
      "last": "",
      "user": "",
     
    }
  }, 
  reducers: {
    update_info: (state, action) => {
      state.info = action.payload   
    },
    remove_info: (state) => {
      state.info = null
    },
    add_post: (state, action) => {
      state.info.posts = [action.payload, ...state.info.posts]
    },
    comment_post: (state, action) => {      
      state.info.posts.find(post => post.id === action.payload.post_id).comments.push(action.payload.comment)  
    },
    update_profile_pic: (state, action) => {
      // change all the profile pic in the posts
      state.info.posts.map(post => {if(post.author === state.info.user){post.author_picture = action.payload}})
      state.info.profile_pic = action.payload
    },
    update_last_message_date(state, action){
      const user = state.info.friends.find(friend => friend.user === action.payload.friend)
      user.last_message_date = action.payload.date
    }
  }
})


export const { update_info, add_post, comment_post, update_profile_pic, update_last_message_date } = infoSlice.actions
export const selectFriendRequests = state => state.info.info.friend_requests
export const selectInfo = state => state.info.info
export const selectUsername = state => state.info.info.user
export const selectProfile_pic = state => state.info.info.profile_pic
export const selectComments = id => state => state.info.info.posts.find(post => post.id === id ).comments
export const selectPosts = state => state.info.info.posts
export default infoSlice.reducer