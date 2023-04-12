import React, { useState } from 'react';
import { View, TextInput, Button ,TouchableOpacity,StyleSheet,Text} from 'react-native';
import {firebase} from '../firebase';
import { useNavigation } from '@react-navigation/native';
import { async } from '@firebase/util';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation=useNavigation()


  loginUser=async(email,password)=>{
    try{
      await firebase.auth().signInWithEmailAndPassword(email,password)
    } catch(error){
      alert('Вы еще не зарегистрированы!')
    }
   
  }
  return(
    <View style={styles.container}>
        <Text > Login </Text>
    
    <View style={{marginTop:40}}>
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
        secureTextEntry={true}      />
      
      <TouchableOpacity
      onPress={()=>loginUser(email,password)} 
      style={styles.button}>
        <Text style={{fontWeight:'bold',fontSize:22}}>Login Button!</Text>
      </TouchableOpacity>



      <TouchableOpacity
      style={styles.button}
      onPress={()=>navigation.navigate('Registration')} 
      
    >
      <Text style={{fontWeight:'bold',fontSize:22}} > Registration</Text>



      </TouchableOpacity>
      </View>
    </View>
)
}//end of Login

//   const handleLogin = () => {
//     firebase
//       .auth()
//       .signInWithEmailAndPassword(email, password)
//       .then(userCredential => {
//         console.log(userCredential.user.uid);
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   };


//   );
// };

export default Login;

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