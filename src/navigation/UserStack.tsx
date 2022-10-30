import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { Profile } from '../screens/userScreens/Profile'
import { Account } from '../screens/userScreens/Account'
import { Transaction } from '../screens/userScreens/Transaction'
import { Support } from '../screens/userScreens/Support'
import { AboutUs } from '../screens/userScreens/AboutUs'

export const UserStack = () => {
  const StackUser = createStackNavigator()
  return (
    <StackUser.Navigator
      screenOptions={{
        headerShown: false,
        animationTypeForReplace: 'pop'
      }}
    >
      <StackUser.Screen name="Profile" component={Profile} />
      <StackUser.Screen name="Account" component={Account} />
      <StackUser.Screen name="Transaction" component={Transaction} />
      <StackUser.Screen name="Support" component={Support} />
      <StackUser.Screen name="AboutUs" component={AboutUs} />
    </StackUser.Navigator>
  )
}
