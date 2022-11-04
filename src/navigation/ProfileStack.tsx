import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Account from '../screens/user/userScreens/Account'
import Profile from '../screens/user/userScreens/Profile'
import MyCard from '../screens/user/MyCard'

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
      <StackOrder.Screen name="MyCard" component={MyCard} />

    </StackOrder.Navigator>
  )
}
