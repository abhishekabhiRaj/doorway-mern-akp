
import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  Platform,
  Text,
  SafeAreaView,
  View,
} from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/auth/Login';
import { Provider, useSelector } from 'react-redux';
import { store } from './app/store'
import SplashScreen from 'react-native-splash-screen'
import Welcome from './screens/auth/Welcome';
import Application from './screens/application/Application';

const Stack = createNativeStackNavigator();


const App = () => {

  useEffect(()=>{
    if(Platform.OS === 'android'){
      SplashScreen.hide();
    }
  },[])

 

  return (
    <Provider store={store}>
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Application" component={Application} />
    </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  )
}

export default App;

