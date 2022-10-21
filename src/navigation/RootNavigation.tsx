import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { AuthStack } from './AuthStack';
import  BottomTabRP  from './RestProfileStack/BottomTabRP';
import  BottomTabDP  from './DeliveryProfileStack/BottomTabDP';
import { ServiceOrder } from '../screens/ordersScreens/ServiceOrder';

export const RootNavigation = () => {
  return (
    <NavigationContainer> 
        <AuthStack/>
        {/* <BottomTabRP/> */}
        {/* <BottomTabDP/> */}
    </NavigationContainer>
  )
}
