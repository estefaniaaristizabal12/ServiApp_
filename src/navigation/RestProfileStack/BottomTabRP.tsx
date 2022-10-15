import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import React from 'react'
import { Colors } from '../../constants/colors';
import { FontAwesome5 } from '@expo/vector-icons';
import ReviewRestStack from './ReviewRestStack';
import OrderRestStack from './OrderRestStack';
import RestProfile from '../../screens/restProfileScreens/RestProfile';

const BtTap = createMaterialBottomTabNavigator();

export default function BottomTabRP() {
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

                        case 'ReviewRestStack':
                            iconName = 'clipboard-list'
                            break;

                        case 'Profile':
                            iconName = 'user'
                            break;
                    }

                    return <FontAwesome5 name={iconName} size={20} color={color} />

                }
            })}>

            <BtTap.Screen name="Home" options={{ title: 'Inicio' }} component={OrderRestStack} />
            <BtTap.Screen name="ReviewRestStack" options={{ title: 'Pedidos finalizados' }} component={ReviewRestStack} />
            <BtTap.Screen name="Profile" options={{ title: 'Perfil' }} component={RestProfile} />


        </BtTap.Navigator>
    )
}
