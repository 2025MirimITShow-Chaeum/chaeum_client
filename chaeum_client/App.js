import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TimerProvider } from './contexts/TimerContext';
import './firebase';

import LoginScreen from './screens/LoginScreen';
import NameScreen from './screens/NameScreen';
import ProfileImageScreen from './screens/ProfileImageScreen';
import HomeScreen from './screens/HomeScreen';
import TimerScreen from './screens/TimerScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <TimerProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Name" component={NameScreen} />
          <Stack.Screen name="ProfileImage" component={ProfileImageScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Timer" component={TimerScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </TimerProvider>
  );
}
