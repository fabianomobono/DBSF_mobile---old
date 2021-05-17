import React from 'react'
import { SectionList, Text, StyleSheet, View } from 'react-native'


const contacts = [
  {title: 'D', data: ['Devan', "Dennis", "decathlon"]},
  {title: 'E', data: ['Ell', 'Elisa', 'Tue madre']},
]

export const Section = () => {
  return (
    <SectionList
      style={s.container}
      sections={contacts}
      renderItem={({item}) =><Text style={s.item}>{item}</Text>}
      renderSectionHeader={({section}) =><Text style={s.sectionHeader}>{section.title}</Text>}
      keyExtractor={(item, index) => index}
      />
  )
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)'
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    color: 'rgba(25,34,120,1)'
  }
})

export const Flex = (props) => {
  const elements = []
  for (i = 0; i < props.number; i++){
    elements.push(<View style={{backgroundColor: 'red'}}></View>)
  }
  
  console.log(elements)

  return (
    <View style={{flex: 1, padding: 20}}>
     {elements.map(item => 
      <View style={{backgroundColor: 'red',
                    height: 100, borderBottomColor: 'black',
                     borderBottomWidth: 20}}></View>)}
     
    </View>

  )
}