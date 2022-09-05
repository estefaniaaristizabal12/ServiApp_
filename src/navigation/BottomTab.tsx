
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../constants/colors';
import { Cart } from '../screens/Cart';
import { TopTab } from './TopTab';
import { Profile } from '../screens/Profile';
import { FontAwesome5 } from '@expo/vector-icons';
import { Orders } from '../screens/Orders';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { RestStack } from './RestStack';

const BtTap = createMaterialBottomTabNavigator();

export default function BottomTab() {
    const navigation = useNavigation();

    return (

        <BtTap.Navigator
            initialRouteName="TopTab" //OJO
            sceneAnimationEnabled={true}
            barStyle={{
                backgroundColor: "#ffffff"
            }}

            activeColor="#4F1A24"
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

                        case 'Cart':
                            iconName = 'shopping-cart'
                            break;

                        case 'Orders':
                            iconName = 'clipboard-list'
                            break;

                        case 'Profile':
                            iconName = 'user'
                            break;
                    }

                    return <FontAwesome5 name={iconName} size={20} color={color} />

                }
            })}>

            <BtTap.Screen name="Home" options={{ title: 'Inicio' }} component={RestStack} />
            <BtTap.Screen name="Cart" options={{ title: 'Carrito' }} component={Cart} />
            <BtTap.Screen name="Orders" options={{ title: 'Ordenes' }} component={Orders} />
            <BtTap.Screen name="Profile" options={{ title: 'Perfil' }} component={Profile} />


        </BtTap.Navigator>

    )


}