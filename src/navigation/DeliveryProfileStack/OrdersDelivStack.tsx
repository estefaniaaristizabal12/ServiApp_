import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import  OrdersDeliv  from '../../screens/delivProfileScreens/ordersDelivery/OrdersDeliv';
import  InfoOrdersDeliv  from '../../screens/delivProfileScreens/ordersDelivery/InfoOrdersDeliv';




const StackOrderD = createStackNavigator();

export default function OrdersDelivStack() {
    return (
        <StackOrderD.Navigator
            screenOptions={{
                headerShown: false,
                animationTypeForReplace: 'pop',
            }}>

            <StackOrderD.Screen name="OrdersDeliv" component={OrdersDeliv} />
            <StackOrderD.Screen name="InfoOrdersDeliv" component={InfoOrdersDeliv} />
        </StackOrderD.Navigator>
    )
}
