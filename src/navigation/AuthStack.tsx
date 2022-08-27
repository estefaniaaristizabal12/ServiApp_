import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { LogIn } from '../screens/authScreens/LogIn';
import { SignIn } from '../screens/authScreens/SignIn';
import { Splash } from '../screens/authScreens/Splash';

const Stack = createStackNavigator();
export const AuthStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                animationTypeForReplace: 'pop',
            }}>
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="LogIn" component={LogIn} />
            <Stack.Screen name="SignIn" component={SignIn} />
        </Stack.Navigator>
    )
}
