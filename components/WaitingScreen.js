import { View,Text,StyleSheet,Button } from "react-native";
import React from "react";
import {firebase} from '../firebase';
const WaitingScreen=(props)=>{
    return(
        <View>
            <Text>Вам на почту отправлено сообщение.</Text>
            <Text>Перейдите по ссылке для верификации вашей почты.</Text>
            <Text>{props.name}</Text>
            <View style={styles.button}>
                <Button title="Signout" onPress={() => firebase.auth().signOut()} />
            </View>
        </View>
    )
}

export default WaitingScreen

const styles = StyleSheet.create({
    screen: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontSize: 25,
    },
    button: {
      marginTop: 30,
    },
  });