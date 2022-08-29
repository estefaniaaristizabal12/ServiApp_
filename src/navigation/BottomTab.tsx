import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../constants/colors';
import { Cart } from '../screens/Cart';
import { TopTab } from './TopTab';
import { Profile } from '../screens/Profile';
import { FontAwesome5 } from '@expo/vector-icons';
import { Orders } from '../screens/Orders';


const BtTap = createBottomTabNavigator();

export default function BottomTab() {
    const navigation = useNavigation();

    return (

        <BtTap.Navigator
            initialRouteName="TopTab" //OJO
            screenOptions={({ route }) => ({
                tabBarActiveTintColor: Colors.secondary,
                headerTitleAlign: 'center',
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

                    return <FontAwesome5 name={iconName} size={25} color={Colors.secondary} style={{ marginLeft: 15 }} />

                }
            })}>

            <BtTap.Screen name="Home" options={{ title: 'Home' }} component={TopTab} />
            <BtTap.Screen name="Cart" options={{ title: 'Cart' }} component={Cart} />
            <BtTap.Screen name="Orders" options={{ title: 'Orders' }} component={Orders} />
            <BtTap.Screen name="Profile" options={{ title: 'Perfil' }} component={Profile} />


        </BtTap.Navigator>

    )


}