import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import  InitialMenu  from '../../screens/delivProfileScreens/deliveryHome/InitialMenu';
import  CurrentOrder  from '../../screens/delivProfileScreens/deliveryHome/CurrentOrder';
import  OrderList  from '../../screens/delivProfileScreens/deliveryHome/OrderList';
import ChangeStatusOrder from '../../screens/delivProfileScreens/deliveryHome/ChangeStatusOrder';






const StackDelivery = createStackNavigator();

export default function DeliveryStack({route, navigation}) {
    return (
        <StackDelivery.Navigator
            screenOptions={{
                headerShown: false,
                animationTypeForReplace: 'pop',
            }}>

            <StackDelivery.Screen name="InitialMenu" component={InitialMenu} />
            <StackDelivery.Screen name="ChangeStatusOrder" component={ChangeStatusOrder} />
            <StackDelivery.Screen name="CurrentOrder" component={CurrentOrder} />
            <StackDelivery.Screen name="OrderList" component={OrderList} />

        </StackDelivery.Navigator>
    )
}
