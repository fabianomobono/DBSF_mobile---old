import React from 'react'
import { View, Text, TouchableOpacity, Button} from 'react-native'

export const Cat = (props) => {
  const [isHungry, setIsHungry] = React.useState(true)
  return (
    <View>
      <Text>
          I am {props.name}!
      </Text>
      <TouchableOpacity onPress={() => setIsHungry(false)} style={{backgroundColor: 'steelblue' , color: 'white', alignContent: 'center', padding: 20}} >
        <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold', padding: 20, backgroundColor: 'green', textAlign: 'center'}}>
          {isHungry ? "Feed me": 'I am full'}
        </Text>
      </TouchableOpacity> 
    </View>
  )
}
