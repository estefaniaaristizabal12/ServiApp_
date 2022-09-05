import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { Restaurant } from '../screens/restScreens/Restaurant';
import { Product } from '../screens/restScreens/Product';
import { TopTab } from './TopTab';
import { Cart } from '../screens/Cart';

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
            <StackRest.Screen name="Cart" component={Cart} />
        </StackRest.Navigator>
    )
}
