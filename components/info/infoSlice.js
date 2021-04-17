import { createSlice } from '@reduxjs/toolkit'


export const infoSlice = createSlice({
  name: 'info',
  initialState: {
    info: {}
  }, 
  reducers: {
    update_info: (state, action) => {
      state.info = action.payload
      
    },
    remove_info: (state) => {
      state.info = null
    }
  }
})


export const { update_info } = infoSlice.actions
export const selectInfo = state => state.info.info
export default infoSlice.reducer