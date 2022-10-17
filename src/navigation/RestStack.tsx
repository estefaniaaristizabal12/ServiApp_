import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { Restaurant } from '../screens/restScreens/Restaurant';
import { Product } from '../screens/restScreens/Product';
import { TopTab } from './TopTab';
import  {Cart}  from '../screens/cartScreens/Cart';
import  RestProfile  from '../screens/restScreens/RestProfile';
import AddCard from '../screens/cartScreens/AddCard';
import MyCard from '../screens/MyCard';
import Confirmation from '../screens/Confirmation';
import Delivery from '../screens/Delivery';
import { CartStack } from './CartStack';
import Account from '../screens/userScreens/Account';
// import EditProfile from '../screens/userScreens/EditProfile';

const StackRest = createStackNavigator();
export const RestStack = () => {
    return (
        <StackRest.Navigator
            screenOptions={{
                headerShown: false,
                animationTypeForReplace: 'pop',
            }}>

            {/* <StackRest.Screen name="TopTab" component={TopTab} /> */}
            <StackRest.Screen name="Delivery" component={Delivery} />
            <StackRest.Screen name="Restaurant" component={Restaurant} />
            <StackRest.Screen name="Product" component={Product} />
            {/* <StackRest.Screen name="Cart" component={Cart} /> */}
            <StackRest.Screen name="Profile" component={RestProfile} />
            <StackRest.Screen name="Account" component={Account} />

        </StackRest.Navigator>
    )
}
