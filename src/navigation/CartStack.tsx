import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import AddCard from '../screens/cartScreens/AddCard';
import { Cart } from '../screens/cartScreens/Cart';
import { Checkout } from '../screens/cartScreens/Checkout';
import MyCard from '../screens/MyCard';

const StackCart = createStackNavigator();
export const CartStack = () => {
    return (
        <StackCart.Navigator
            screenOptions={{
                headerShown: false,
                animationTypeForReplace: 'pop',
            }}>

            <StackCart.Screen name="Checkout" component={Checkout} />
            <StackCart.Screen name="Cart" component={Cart} />
            <StackCart.Screen name="MyCard" component={MyCard} />
            <StackCart.Screen name="AddCard" component={AddCard} />

        </StackCart.Navigator>
    )
}