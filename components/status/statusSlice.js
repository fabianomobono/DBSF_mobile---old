import { createSlice } from '@reduxjs/toolkit'


export const statusSlice = createSlice({
  name: 'status',
  initialState: {
    token: null
  }, 
  reducers: {
    login_token: (state, action) => {
      console.log(action)
      state.token = action.payload
    },
    logout: state => {
      state.token = null
    }
  }
})


export const { login_token, logout } = statusSlice.actions
export const selectToken = state => state.status.token
export default statusSlice.reducer