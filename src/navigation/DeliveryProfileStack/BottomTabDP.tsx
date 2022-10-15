import React from 'react'

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Colors } from '../../constants/colors';
import { FontAwesome5 } from '@expo/vector-icons';
import { RestProfile } from '../../screens/restScreens/RestProfile';
import { ReviewRest } from '../../screens/restProfileScreens/ReviewRest';
import { OrdersRest } from '../../screens/restProfileScreens/OrdersRest';
import { ProductsRest } from '../../screens/restProfileScreens/ProductsRest';
import { DeliveryStack } from './DeliveryStack';
import { OrdersDelivStack } from './OrdersDelivStack';
import { ProfileDeliv } from '../../screens/delivProfileScreens/ProfileDeliv';



const BtTap = createMaterialBottomTabNavigator();
export const BottomTabDP = () => {
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

                        case 'ProfileDeliv':
                            iconName = 'user'
                            break;
                    }

                    return <FontAwesome5 name={iconName} size={20} color={color} />

                }
            })}>

            <BtTap.Screen name="Home" options={{ title: 'Inicio' }} component={DeliveryStack} />
            <BtTap.Screen name="OrdersDelivStack" options={{ title: 'Domicilios finalizados' }} component={OrdersDelivStack} />
            <BtTap.Screen name="ProfileDeliv" options={{ title: 'Perfil' }} component={ProfileDeliv} />


        </BtTap.Navigator>
    )
}
