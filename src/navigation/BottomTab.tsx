import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../constants/colors';
import { Pressable } from 'react-native';


const BtTap = createBottomTabNavigator();

export default function BottomTab() {
    const navigation = useNavigation();

    return (
        <BtTap.Navigator
            initialRouteName="TopTab" //OJO
            screenOptions={{
                tabBarActiveTintColor: Colors.secondary,
                headerTitleAlign: 'center',
            }}>


            {/* <BtTap.Screen
                name="TopTab"
                // component={MyTopTab}
                options={{
                    headerLeft: () => (
                        <Pressable onPress={() => navigation.openDrawer()}>
                            <FontAwesome
                                name="align-left"
                                size={25}
                                color={Colors.secondary}
                                style={{ marginLeft: 15 }}
                            />
                        </Pressable>
                    ),
                    headerRight: () => (
                        <Pressable onPress={() => navigation.navigate('Cart')}>
                            <FontAwesome5
                                name="shopping-cart"
                                size={22}
                                color={Colors.secondary}
                                style={{ marginRight: 15 }}
                            />
                        </Pressable>
                    ),
                    tabBarLabel: 'incio',
                    tabBarIcon: ({ color }) => (
                        <FontAwesome name="home" size={30} color={color} />
                    ),
                }}
            /> */}

        </BtTap.Navigator>

    )


}