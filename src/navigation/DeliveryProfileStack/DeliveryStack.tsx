import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { InitialMenu } from '../../screens/delivProfileScreens/deliveryHome/InitialMenu';
import { CurrentOrder } from '../../screens/delivProfileScreens/deliveryHome/CurrentOrder';
import { OrderList } from '../../screens/delivProfileScreens/deliveryHome/OrderList';



const StackDelivery = createStackNavigator();

export const DeliveryStack = () => {
    return (
        <StackDelivery.Navigator
            screenOptions={{
                headerShown: false,
                animationTypeForReplace: 'pop',
            }}>

            <StackDelivery.Screen name="InitialMenu" component={InitialMenu} />
            <StackDelivery.Screen name="CurrentOrder" component={CurrentOrder} />
            <StackDelivery.Screen name="OrderList" component={OrderList} />

        </StackDelivery.Navigator>
    )
}
