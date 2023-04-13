
import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet,Button } from 'react-native';
import Device from 'expo-device';
import MapView ,{Marker}from 'react-native-maps';
import * as Location from 'expo-location';
import {firebase} from '../firebase';
import { getAuth, isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import RegisterScreen from './RegisterScreen';


const Dashboard = () =>{
  const [name,setName] =useState('')

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [showText,setShowText]= useState(false)
  const a='hi from dashboard'
  const {user} =  firebase.auth().currentUser

    
  const updateLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      // Handle permission denied
      return;
    }
  
    let { coords } = await Location.getCurrentPositionAsync({});
    setLocation(coords);
    
    firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).update({
        lat:location.latitude,
        long:location.longitude,
        updatedAt:new Date(),
        // long,
      })
  }
  updateLocation()
  

  useEffect(() => {
    const interval = setInterval(() => {
      updateLocation();
    }, 300000);

  
    return () => clearInterval(interval);
  },
  
//   firebase.firestore().collection('users')
//   .doc(firebase.a)
  
  []);


  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
    
  }

  handleMarkerPress = () => {
    setShowText(true)
 
  };


  // const myArr = JSON.parse(text.coords)
  // console.log('text=' ,myArr)

//   const user = firebase.auth().currentUser;
//   console.log('user= ',user.emailVerified)
//   if (user.emailVerified) {
//     console.log('Dashboard-  Email verified');
    
//   } else {
//     console.log('Dashboard-    Email not verified');
//   }

    return(
        

        <View style={styles.container}>
         <Button title="SOS" onPress={() => 
      
            // firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).update({
            // lat:location.latitude,
            // long:location.longitude,
            // updatedAt:new Date(),
            updateLocation()
            // long,
        
        } />
        

        <MapView style={styles.map} initialRegion={{
                    latitude: 43.238949, // Almaty latitude
                    longitude: 76.889709, // Almaty longitude
                    latitudeDelta: 0.0722,
                    longitudeDelta: 0.0321,
                }}>
            {location && <Marker coordinate={location}  onPress={this.handleMarkerPress}/>}
        </MapView>

        {showText && <Text style={styles.text}>Marker was clicked!1111eergg</Text>}
        <View style={styles.button}>
        <Button title="Signout" onPress={() => firebase.auth().signOut()} />
        </View>
       
        </View>
     

    )
}

export default Dashboard


const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    paragraph: {
      fontSize: 18,
      textAlign: 'center',
    },
    map: {
      width: '100%',
      height: '80%',
    },
  });
  