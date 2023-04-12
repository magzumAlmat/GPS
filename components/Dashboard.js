
import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import Device from 'expo-device';
import MapView ,{Marker}from 'react-native-maps';
import * as Location from 'expo-location';

const Dashboard=()=>{
  const [name,setName] =useState('')

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [showText,setShowText]= useState(false)
  const updateLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      // Handle permission denied
      return;
    }
  
    let { coords } = await Location.getCurrentPositionAsync({});
    setLocation(coords);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      updateLocation();
    }, 1000);

  
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


    return(
        <View style={styles.container}>



  <MapView style={styles.map} initialRegion={{
            latitude: 43.238949, // Almaty latitude
            longitude: 76.889709, // Almaty longitude
            latitudeDelta: 0.0722,
            longitudeDelta: 0.0321,
          }}>
    {location && <Marker coordinate={location}  onPress={this.handleMarkerPress}/>}
  </MapView>
  {showText && <Text style={styles.text}>Marker was clicked!1111eergg</Text>}

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
      height: '100%',
    },
  });
  