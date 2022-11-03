import React from 'react'
import { AuthStack } from './AuthStack'
import BottomTabDP from './DeliveryProfileStack/BottomTabDP'
import BottomTabRP from './RestProfileStack/BottomTabRP'
import { ServiceOrder } from '../screens/user/ordersScreens/ServiceOrder'
import { NavigationContainer } from '@react-navigation/native'

export const RootNavigation = () => {
  return (
    <NavigationContainer>
      <AuthStack />
      {/* <BottomTabRP/> */}
      {/* <BottomTabDP/> */}
    </NavigationContainer>
  )
}
