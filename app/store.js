import { configureStore } from '@reduxjs/toolkit'
import statusReducer from '../components/status/statusSlice'
import infoReducer from '../components/info/infoSlice'


export default configureStore({
  reducer: {
    status: statusReducer,
    info: infoReducer
  }
})