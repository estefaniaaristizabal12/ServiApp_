import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { AuthStack } from './AuthStack';
import { BottomTabRP } from './RestProfileStack/BottomTabRP';

export const RootNavigation = () => {
  return (
    <NavigationContainer> 
        {/* <AuthStack/> */}
        <BottomTabRP/>
    </NavigationContainer>
  )
}
