import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Requests from '../../screens/domiciliary/Requests'

const StackReviewRest = createStackNavigator()
export default function RequestsDelivStack() {
  return (
    <StackReviewRest.Navigator
      screenOptions={{
        headerShown: false,
        animationTypeForReplace: 'pop'
      }}
    >
      <StackReviewRest.Screen name="Requests" component={Requests} />
    </StackReviewRest.Navigator>
  )
}
