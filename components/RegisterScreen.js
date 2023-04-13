import React, { useState ,useEffect} from 'react';
import { TouchableOpacity,StyleSheet} from 'react-native';
import {firebase} from '../firebase';
import { useNavigation } from '@react-navigation/native';
import { Platform, Text, View,TextInput,Button} from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import VerifyEmailScreen from './VerifyEmailScreen';
import WaitingScreen from './WaitingScreen';
import Device from 'expo-device';
import * as Location from 'expo-location';
const RegisterScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname,setFirstname]= useState('');
  const [lasttname,setLastname]= useState('');
  


  const [location, setLocation] = useState(null);

  const updateLocation = async () => {

    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      // Handle permission denied
      return;
    }
  
    let { coords } = await Location.getCurrentPositionAsync({});
    setLocation(coords);
  }

 

 
  
  const handleRegister = async (props) => {
    console.log('email = ', email)
    console.log('password = ', password)

      try {
        await updateLocation()
        console.log('location= ',location)
        
        const {user} = await firebase.auth().createUserWithEmailAndPassword(email, password)
        await user.sendEmailVerification()
        .then(()=>{
          firebase.firestore().collection('users').doc(user.uid).set({
            firstname,
            lasttname,
            email,
            password,
            verified:false,
         
  
          })
        })
        navigation.navigate('WaitingScreen')
        return true
      } catch (e) {
        console.log(e)
        return false
      }
   
      
  
  };


  
  return (
   
    <View>


      <Text>
        {/* Register Here */}

     
      </Text>
      <TextInput
        placeholder="First Name"
        onChangeText={(firstname)=>setFirstname(firstname)}
        autoCapitalize='none'
        autoCorrect={false}
        style={styles.textInput}
      />


    <TextInput
        placeholder="Last Name"
        onChangeText={(lasttname)=>setLastname(lasttname)}
        autoCapitalize='none'
        autoCorrect={false}
        style={styles.textInput}
      />


    <TextInput
      style={styles.textInput}
        placeholder="Email"
        onChangeText={ (email)=>setEmail(email) }
        autoCapitalize='none'
        autoCorrect={false}
      />
       <TextInput
        placeholder="Password"
        style={styles.textInput}
        onChangeText={ (password)=>setPassword(password) }
        autoCapitalize='none'
        autoCorrect={false}
        secureTextEntry={true}  />
      

      <TouchableOpacity
       style={styles.button}
        onPress={()=>handleRegister(firstname,lasttname,email,password)}
      
      >
        <Text style={{fontWeight:'bold',fontSize:22}}>Register</Text>
      </TouchableOpacity>


    <Text>
       Email={email}
       </Text>
       <Text> 
       password={password}
      </Text>
    </View>


  );
};

export default RegisterScreen;

const styles=StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    marginTop:100,
  },
  textInput:{
    paddingTop:20,
    paddingBottom:10,
    width:400,
    fontSize:20,
    borderBottomWidth:1,
    borderBottomColor:'#000',
    marginBottom:10,
    textAlign:'center'
  },

  button:{
    marginTop:40,
    height:70,
    width:250,
    backgroundColor:'white',
    alignItems:'center',
  }
  
})