import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { Restaurant } from '../screens/restScreens/Restaurant';
import { Product } from '../screens/restScreens/Product';
import { Delivery } from '../screens/Delivery';
import { PickUp } from '../screens/PickUp';
import { TopTab } from './TopTab';

const StackRest = createStackNavigator();
export const RestStack = () => {
    return (
        <StackRest.Navigator
            screenOptions={{
                headerShown: false,
                animationTypeForReplace: 'pop',
            }}>

            <StackRest.Screen name="TopTab" component={TopTab} />
            <StackRest.Screen name="Restaurant" component={Restaurant} />
            <StackRest.Screen name="Product" component={Product} />
        </StackRest.Navigator>
    )
}
