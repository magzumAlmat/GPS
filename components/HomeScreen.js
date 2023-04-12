import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import firebase from '../firebase';

const HomeScreen = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      setUser(user);
    });

    return unsubscribe;
  }, []);

  if (!user) {
    return <Text>Please log in</Text>;
  }

  if (!user.emailVerified) {
    return (
      <View>
        <Text>Please verify your email address</Text>
        <Button
          title="Resend verification email"
          onPress={() => user.sendEmailVerification()}
        />
      </View>
    );
  }

  return <Text>Welcome, {user.email}</Text>;
};

export default HomeScreen;
