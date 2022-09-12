import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { Cart } from '../screens/Cart';
import { Profile } from '../screens/userScreens/Profile';
import { FontAwesome5 } from '@expo/vector-icons';
import { Orders } from '../screens/cartScreens/Orders';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { RestStack } from './RestStack';
import { OrderStack } from './OrderStack';

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

                        case 'OrdersStack':
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
            <BtTap.Screen name="OrdersStack" options={{ title: 'Ordenes' }} component={OrderStack} />
            <BtTap.Screen name="Profile" options={{ title: 'Perfil' }} component={Profile} />


        </BtTap.Navigator>

    )


}