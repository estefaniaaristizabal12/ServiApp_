import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { Restaurant } from '../screens/restScreens/Restaurant';
import { Product } from '../screens/restScreens/Product';
import { TopTab } from './TopTab';
import  {Cart}  from '../screens/Cart';
import { RestProfile } from '../screens/restScreens/RestProfile';
import AddCard from '../screens/AddCard';

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
            <StackRest.Screen name="AddCard" component={AddCard} />
            <StackRest.Screen name="Profile" component={RestProfile} />
        </StackRest.Navigator>
    )
}
