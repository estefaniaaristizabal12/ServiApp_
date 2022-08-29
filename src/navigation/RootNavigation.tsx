import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { AuthStack } from './AuthStack';

export const RootNavigation = () => {
  return (
    <NavigationContainer> 
        <AuthStack/>
    </NavigationContainer>
  )
}
