import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react'
import { Colors } from '../constants/colors';
import { PickUp } from '../screens/PickUp';
import { Delivery } from '../screens/Delivery';

const Tab = createMaterialTopTabNavigator();
export const TopTab = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarIndicatorStyle: { backgroundColor: Colors.primary },
            }}
        >
            <Tab.Screen name="Inicio" component={Delivery} />
            <Tab.Screen name="Recomendaciones" component={PickUp} />
        </Tab.Navigator>
    )
}
