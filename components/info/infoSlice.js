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
    }
  }
})


export const { update_info, add_post } = infoSlice.actions
export const selectInfo = state => state.info.info
export const selectUsername = state => state.info.info.user
export const selectProfile_pic = state => state.info.info.profile_pic
export default infoSlice.reducer