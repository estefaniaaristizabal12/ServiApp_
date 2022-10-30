import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { LogIn } from '../screens/authScreens/LogIn'
import { SignIn } from '../screens/authScreens/SignIn'
import { Splash } from '../screens/authScreens/Splash'
import BottomTab from './BottomTab'
import RecoverPassword from '../screens/authScreens/RecoverPassword'
import BottomTabDP from './DeliveryProfileStack/BottomTabDP'
import BottomTabRP from './RestProfileStack/BottomTabRP'

const Stack = createStackNavigator()
export const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animationTypeForReplace: 'pop'
      }}
    >
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="LogIn" component={LogIn} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="RecoverPassword" component={RecoverPassword} />
      <Stack.Screen name="BottomTab" component={BottomTab} />
      <Stack.Screen name="BottomTabDP" component={BottomTabDP} />
      <Stack.Screen name="BottomTabRP" component={BottomTabRP} />
    </Stack.Navigator>
  )
}
