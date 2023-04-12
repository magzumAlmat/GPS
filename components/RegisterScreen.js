import React, { useState } from 'react';
import { View, TextInput, Button ,TouchableOpacity,StyleSheet} from 'react-native';
import {firebase} from '../firebase';
import { useNavigation } from '@react-navigation/native';

const RegisterScreen = (props) => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname,setFirstname]= useState('');
  const [lasttname,setLastname]= useState('');
  
  const handleRegister = async (props,email,password,firstname,lasttname) => {
    try {
      // const { user } = await firebase.auth().createUserWithEmailAndPassword(email, password);
      // await user.sendEmailVerification();
      // navigation.navigate('VerifyEmail');

      await firebase.auth().createUserWithEmailAndPassword(email,password)
      .then(()=>{
        firebase.auth().currentUser.sendEmailVerification({
          handleCodeInApp:true,
          url:"db111-f1c86.firebaseapp.com"
        })
      })
      alert('Verification email sent!')

      .then(()=>{
        firebase.firestore().collection('users')
        .doc(firebase.auth().currentUser.uid)
        .set({
          firstname,
          lasttname,
          email,
          // lat,
          // long,
        })
      })
    } catch (error) {
      alert('error!')
    }
  };

  return (
    <View>
      <Text>
        Register Here
      </Text>
      <TextInput
        placeholder="First Name"
  
        onChangeText={(firstname)=>setFirstname(firstname)}
        autoCapitalize='none'
        autoCorrect={false}
        style={styles.TextInput}
      />


    <TextInput
        placeholder="Last Name"
     
        onChangeText={(lasttname)=>setLastname(lasttname)}
        autoCapitalize='none'
        autoCorrect={false}
        style={styles.TextInput}
      />


      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.TextInput}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button
        title="Register"
        onPress={()=>handleRegister(email,password,firstname,lasttname)}
      />
    </View>
  );
};

export default RegisterScreen;
