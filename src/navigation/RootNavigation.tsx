import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { AuthStack } from './AuthStack';
import { Home } from '../screens/Home';

export const RootNavigation = () => {
  return (
    <NavigationContainer> 
        <AuthStack/>
    </NavigationContainer>
  )
}
