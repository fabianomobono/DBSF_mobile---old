import { createSlice } from '@reduxjs/toolkit'


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
    }
  }
})


export const { update_info, add_post, comment_post } = infoSlice.actions
export const selectInfo = state => state.info.info
export const selectUsername = state => state.info.info.user
export const selectProfile_pic = state => state.info.info.profile_pic
export const selectComments = id => state => state.info.info.posts.find(post => post.id === id ).comments
export default infoSlice.reducer