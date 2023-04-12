import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import firebase from '../firebase';

const VerifyEmailScreen = ({ route },props) => {
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const { oobCode } = route.params;
    firebase.auth().applyActionCode(oobCode)
      .then(() => {
        setVerified(true);
      })
      .catch(error => {
        // show error message
      });
  }, []);

  if (verified,e) {
      console.log('this is e=  ',e)
      e.preventDefault()
      try {
        addDoc(collection(db, 'users'), {
          email:this.props.email,
          lat:this.props.lat,
          long:this.props.long,
          created: Timestamp.now()
        })
        console.log('Запись юзера создана')
        onClose()
      } catch (err) {
        alert(err)
      }
    
    return <Text>Your email has been verified!</Text>;
  }

  return <Text>Verifying email...</Text>;
};

export default VerifyEmailScreen;
