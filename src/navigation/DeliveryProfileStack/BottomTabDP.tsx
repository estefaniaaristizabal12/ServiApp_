import React from 'react'

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Colors } from '../../constants/colors';
import { FontAwesome5 } from '@expo/vector-icons';
import  DeliveryStack  from './DeliveryStack';
import  OrdersDelivStack from './OrdersDelivStack';
import ProfileDStack from './ProfileDStack';




const BtTap = createMaterialBottomTabNavigator();
export default function BottomTabDP({route, navigation}) {

    return (
        <BtTap.Navigator
            initialRouteName="TopTab" //OJO
            sceneAnimationEnabled={true}
            barStyle={{
                backgroundColor: "#ffffff"
            }}

            activeColor={Colors.primary1}
            inactiveColor="#E7E7E7"
            screenOptions={({ route }) => ({
                // tabBarActiveTintColor: Colors.secondary,

                // headerTitleAlign: 'center',
                tabBarIcon: ({ color, focused }) => {

                    let iconName: string = '';
                    switch (route.name) {
                        case 'Home':
                            iconName = "home"
                            break;

                        case 'OrdersDelivStack':
                            iconName = 'clipboard-list'
                            break;

                        case 'ProfileDStack':
                            iconName = 'user'
                            break;
                    }

                    return <FontAwesome5 name={iconName} size={20} color={color} />

                }
            })}>

            <BtTap.Screen name="Home" options={{ title: 'Domicilios' }} component={DeliveryStack} />
            <BtTap.Screen name="OrdersDelivStack" options={{ title: 'Solicitudes' }} component={OrdersDelivStack} />
            <BtTap.Screen name="ProfileDStack" options={{ title: 'Perfil' }} component={ProfileDStack} />


        </BtTap.Navigator>
    )
}
