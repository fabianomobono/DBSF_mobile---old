import { StyleSheet } from 'react-native'



export const colors = {
  magenta: 'magenta',
  DBSFred: 'rgba(255, 0, 0, 0.15)',
  DBSFBlue: '#1aa1f0',
  DDSBGreen: 'rgba(0, 255, 0, 0.1)',
  white: 'white',
  black: 'black',
  silver: 'silver',
  grey: 'grey',
  lightGrey: '#ddd',
  goToColor: 'rgba(52,52,52,0.1)',
  darkGrey: '#222',
  lightGreen: 'rgba(101, 239, 101, 0.9)',
  lightRed: "rgba(255, 50, 101, 0.8)",
  lightSilver : 'rgba(0, 0, 0, 0.1)',
  powderBlue: 'powderblue',
}


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
      borderColor: colors.white
    },
    textInput: {
      borderColor: colors.grey,
      borderWidth: 1,
      backgroundColor: colors.white,
      fontSize: 20,
      padding: 10,
      marginTop: 10,
      width: 350,
      textAlign: 'center',
      borderRadius: 20,
      
    },
    button: {
      backgroundColor: colors.DBSFBlue,
      width: 350,
      padding: 10,
      borderRadius: 20,
      marginTop: 10,
      alignItems: 'center'
    },
    centerText: {
      fontSize: 20,
      color: colors.silver,
      textAlign: 'center',
      
    },
    hide: {
      display: 'none'
    },
    textInputTouch: {
      borderColor: colors.grey,
      borderWidth: 1,
      backgroundColor: colors.white,
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
      color: colors.grey
    },
    buttonText: {
      color: colors.white,
      fontSize: 15,
      fontWeight: 'bold'
    },
    close: {
     padding: 20,
    },
    
  });


  