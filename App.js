import 'react-native-gesture-handler';
import React from 'react';
import  store  from './app/store'
import { Provider } from 'react-redux'
import { Whole } from './components/whole/Whole';



export default function App() {
  return(
    <Provider store={store} >
      <Whole />
    </Provider>
  )  
}


