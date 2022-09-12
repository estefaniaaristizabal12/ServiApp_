import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { Cart } from '../screens/Cart';
import { Details } from '../screens/cartScreens/Details';
import { Orders } from '../screens/cartScreens/Orders';

const StackOrder = createStackNavigator();
export const OrderStack = () => {
    return (
        <StackOrder.Navigator
            screenOptions={{
                headerShown: false,
                animationTypeForReplace: 'pop',
            }}>

            <StackOrder.Screen name="Orders" component={Orders} />
            <StackOrder.Screen name="Details" component={Details} />
            
        </StackOrder.Navigator>
    )
}
