import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Requests from '../../screens/restaurant/Requests'

const StackOrderD = createStackNavigator()

export default function RequestsRestStack() {
  return (
    <StackOrderD.Navigator
      screenOptions={{
        headerShown: false,
        animationTypeForReplace: 'pop'
      }}
    >
      <StackOrderD.Screen name="Requests" component={Requests} />
    </StackOrderD.Navigator>
  )
}
