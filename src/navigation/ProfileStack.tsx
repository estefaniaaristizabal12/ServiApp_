import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Account from '../screens/user/userScreens/Account'
import Profile from '../screens/user/userScreens/Profile'

const StackOrder = createStackNavigator()
export const ProfileStack = () => {
  return (
    <StackOrder.Navigator
      screenOptions={{
        headerShown: false,
        animationTypeForReplace: 'pop'
      }}
    >
      <StackOrder.Screen name="Profile" component={Profile} />
      <StackOrder.Screen name="Account" component={Account} />
    </StackOrder.Navigator>
  )
}
