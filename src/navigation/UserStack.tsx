import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { Profile } from '../screens/user/userScreens/Profile'
import { Account } from '../screens/user/userScreens/Account'
import { Transaction } from '../screens/user/userScreens/Transaction'
import { Support } from '../screens/user/userScreens/Support'
import { AboutUs } from '../screens/user/userScreens/AboutUs'

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
