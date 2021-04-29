import { StyleSheet } from 'react-native'


export const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      height: '100%',
      backgroundColor: '#ddd',
      alignItems: 'center',
      justifyContent: 'flex-end', 
      paddingBottom: 100,
    },
    title: {
      paddingTop: 20,
      fontSize: 30,
      color: '#999'
    },
    loginImage: {
      marginTop: 20,
      width: 200,
      height: 200,
      borderRadius: 200,
      borderWidth: 3,
      borderColor: 'white'
    },
    textInput: {
      borderColor: 'grey',
      borderWidth: 1,
      backgroundColor: 'white',
      fontSize: 20,
      padding: 10,
      marginTop: 10,
      width: 350,
      textAlign: 'center',
      borderRadius: 20,
      
    },
    button: {
      backgroundColor: 'steelblue',
      width: 350,
      padding: 10,
      borderRadius: 20,
      marginTop: 10,
      alignItems: 'center'
    },
    centerText: {
      fontSize: 20,
      color: 'silver',
      textAlign: 'center',
      
    },
    hide: {
      display: 'none'
    },
    textInputTouch: {
      borderColor: 'grey',
      borderWidth: 1,
      backgroundColor: 'white',
      fontSize: 20,
      padding: 10,
      marginTop: 10,
      width: 350,
      borderRadius: 20,
      
    },
    datePicker: {
      padding: 20,
      marginLeft: 121,
      width: 90,
    },
    smallImage: {
      margin: 5,
      width: 50,
      height: 50,
      borderRadius: 50
    },
    empty_list_message: {
      margin: 20,
      fontSize: 20,
      padding: 10,
      color: 'grey'
    },
    buttonText: {
      color: 'white',
      fontSize: 15,
      fontWeight: 'bold'
    }
  });