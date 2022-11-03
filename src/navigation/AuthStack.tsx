import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { LogIn } from '../screens/auth/LogIn'
import { SignIn } from '../screens/auth/SignIn'
import { Splash } from '../screens/auth/Splash'
import BottomTab from './BottomTab'
import RecoverPassword from '../screens/auth/RecoverPassword'
import BottomTabRP from './RestProfileStack/BottomTabRP'
import BottomTabDP from './DeliveryProfileStack/BottomTabDP'

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
