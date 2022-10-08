import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import React from 'react'
import { Colors } from '../../constants/colors';
import { FontAwesome5 } from '@expo/vector-icons';
import { RestProfile } from '../../screens/restScreens/RestProfile';
import { ReviewRest } from '../../screens/restProfileScreens/ReviewRest';
import { OrdersRest } from '../../screens/restProfileScreens/OrdersRest';

const BtTap = createMaterialBottomTabNavigator();

export const BottomTabRP = () => {
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

                        case 'Review':
                            iconName = 'clipboard-list'
                            break;

                        case 'Profile':
                            iconName = 'user'
                            break;
                    }

                    return <FontAwesome5 name={iconName} size={20} color={color} />

                }
            })}>

            <BtTap.Screen name="Home" options={{ title: 'Inicio' }} component={OrdersRest} />
            <BtTap.Screen name="Review" options={{ title: 'Historial pedidos' }} component={ReviewRest} />
            <BtTap.Screen name="Profile" options={{ title: 'Perfil' }} component={RestProfile} />


        </BtTap.Navigator>
    )
}
