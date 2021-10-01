import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppLoading from 'expo-app-loading';
import AuthProvider from './src/contexts/auth';

import CreateNote from './src/screens/CreateNote';
import Notes from './src/screens/Notes/index';
import UserName from './src/screens/UserName';

import { useFonts } from 'expo-font';

const { Navigator, Screen } = createStackNavigator();

export default function App() {

  const [ loaded ] = useFonts({
    Montserrat: require('./assets/fonts/Montserrat-Regular.ttf'),
    MontMedium: require('./assets/fonts/Montserrat-Medium.ttf'),
    MontSemiBold: require('./assets/fonts/Montserrat-SemiBold.ttf'),
    Karla: require('./assets/fonts/Karla-Regular.ttf'),
  })

  if(!loaded) {
    return <AppLoading/>
  }

  return (
    <NavigationContainer>
      <AuthProvider>
        <Navigator
          screenOptions={{
            headerShown: false
          }}
        >
          <Screen
            name='Notes'
            component={Notes}
          />
          <Screen
            name='UserName'
            component={UserName}
          /> 
          <Screen
            name='CreateNote'
            component={CreateNote}
          />
        </Navigator>
      </AuthProvider>
    </NavigationContainer>
  );
}
