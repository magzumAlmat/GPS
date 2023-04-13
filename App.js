import React,{useState,useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';
import VerifyEmailScreen from './components/VerifyEmailScreen';
import {firebase} from './firebase';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import WaitingScreen from './components/WaitingScreen';

const Stack = createStackNavigator();

const App = () => {
  const [initializing,setinitializing]=useState(true)
  const [user,setUser]=useState()

  const onAuthStateChanged=(user)=>{
    setUser(user);
    if (initializing) setinitializing(false)
  }

  useEffect(()=>{
    const subscriber=firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  },[])
  if (initializing) return null

  if(!user){
    return(
      <Stack.Navigator>
        <Stack.Screen 
        name="Login"
        component={Login}
        options={{
          headerTitle:()=><Header name='Bug Ninza'/> ,
          headerStyle:{
            height:150,
            borderBottomLeftRadius:50,
            borderBottomRightRadius:50,
            elevation:25
          }
        }}
          />
       
    <Stack.Screen 
        name="Registration"
        component={RegisterScreen}
        options={{
          headerTitle:()=><Header name='Bug Ninza'/> ,
          headerStyle:{
            height:150,
            borderBottomLeftRadius:50,
            borderBottomRightRadius:50,
            elevation:25
          }
        }}
          />
      </Stack.Navigator>
    )
  }

return(
<Stack.Navigator>
  <Stack.Screen 
    name="Dashboard"
    component={Dashboard}
    options={{
      headerTitle:()=><Header name='Dashboard'/> ,
      headerStyle:{
        height:150,
        borderBottomLeftRadius:50,
        borderBottomRightRadius:50,
        elevation:25
      }
    }}
  />
  <Stack.Screen 
    name="VerifyEmailScreen"
    component={VerifyEmailScreen}
    options={{
      headerTitle:()=><Header name='VerifyEmailScreen'/> ,
      headerStyle:{
        height:150,
        borderBottomLeftRadius:50,
        borderBottomRightRadius:50,
        elevation:25
      }
    }}>

    </Stack.Screen>

    <Stack.Screen 
    name="WaitingScreen"
    component={WaitingScreen}
    options={{
      headerTitle:()=><Header name='WaitingScreen'/> ,
      headerStyle:{
        height:150,
        borderBottomLeftRadius:50,
        borderBottomRightRadius:50,
        elevation:25
      }
    }}>

    </Stack.Screen>
</Stack.Navigator>



);

};

export default ()=>{
  return(
    <NavigationContainer>
      <App/>
    </NavigationContainer>
  )
};
