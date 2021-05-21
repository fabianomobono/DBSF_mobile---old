import { StyleSheet } from 'react-native'

export const colors = {
  black: 'black',
  darkGrey: '#222',
  DBSFBlue: '#1aa1f0',
  DBSFred: 'rgba(255, 0, 0, 0.15)',
  DBSFGreen: 'rgba(0, 255, 0, 0.1)',
  goToColor: 'rgba(52,52,52,0.1)',
  grey: 'grey',
  lightGreen: 'rgba(101, 239, 101, 0.9)',
  lightGrey: '#ddd',
  lightRed: "rgba(255, 50, 101, 0.8)",
  lightSilver: 'rgba(0, 0, 0, 0.1)',
  magenta: 'magenta',
  powderBlue: 'powderblue',
  silver: 'silver',
  white: 'white'
}


export const styles = StyleSheet.create({
    button: {
      alignItems: 'center',
      backgroundColor: colors.DBSFBlue,
      borderRadius: 20,
      marginTop: 10,
      padding: 10,
      width: 350
    },
    buttonDisabled: {
      alignItems: 'center',
      backgroundColor: colors.grey,
      borderRadius: 20,
      marginTop: 10,
      padding: 10,
      width: 350
    },
    buttonText: {
      color: colors.white,
      fontSize: 15,
      fontWeight: 'bold'
    },
    centerText: {
      color: colors.silver,
      fontSize: 20,
      textAlign: 'center'
    },
    close: {
      padding: 20
    },
    container: {
      alignItems: 'center',
      backgroundColor: '#ddd',
      flex: 1,
      height: '100%',
      justifyContent: 'flex-end',
      paddingBottom: 100,
      width: '100%'
    },
    datePicker: {
      marginLeft: 121,
      padding: 20,
      width: 90
    },
    empty_list_message: {
      color: colors.grey,
      fontSize: 20,
      margin: 20,
      padding: 10
    },
    hide: {
      display: 'none'
    },
    loginImage: {
      borderColor: colors.white,
      borderRadius: 200,
      borderWidth: 3,
      height: 200,
      marginTop: 20,
      width: 200
    },
    smallImage: {
      borderRadius: 50,
      height: 50,
      margin: 5,
      width: 50
    },
    textInput: {
      backgroundColor: colors.white,
      borderColor: colors.grey,
      borderRadius: 20,
      borderWidth: 1,
      fontSize: 20,
      marginTop: 10,
      padding: 10,
      textAlign: 'center',
      width: 350
    },
    textInputTouch: {
      backgroundColor: colors.white,
      borderColor: colors.grey,
      borderRadius: 20,
      borderWidth: 1,
      fontSize: 20,
      marginTop: 10,
      padding: 10,
      width: 350
    },
    title: {
      color: '#999',
      fontSize: 30,
      paddingTop: 20
    }
  });


  