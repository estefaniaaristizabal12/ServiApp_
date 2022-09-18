import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react'
import { Colors } from '../constants/colors';
import  PickUp  from '../screens/PickUp';
import Delivery from '../screens/Delivery';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RestStack } from './RestStack';

const Tab = createMaterialTopTabNavigator();
export const TopTab = () => {

    const { top:paddingTop } = useSafeAreaInsets()

    return (
        <Tab.Navigator
            style={{ paddingTop,backgroundColor: Colors.secondary }}
            screenOptions={{
                tabBarIndicatorStyle: { backgroundColor: Colors.primary },
            }}
        >
            <Tab.Screen name="Domicilio" component={Delivery} />
            <Tab.Screen name="Recoger" component={PickUp} />
        </Tab.Navigator>
    )
}
