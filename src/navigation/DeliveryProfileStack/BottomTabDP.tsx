import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import React from 'react'
import { Colors } from '../../constants/colors'
import { FontAwesome5 } from '@expo/vector-icons'
import RequestsDelivStack from './RequestsDelivStack'
import OrdersDelivStack from './OrdersDelivStack'
import ProfileDelivRest from '../../screens/profileRestDomi/Profile'
import ProfileDStack from './ProfileDStack'

const BtTap = createMaterialBottomTabNavigator()

export default function BottomTabDP({ navigation, route }) {
  return (
    <BtTap.Navigator
      initialRouteName="TopTab" //OJO
      sceneAnimationEnabled={true}
      barStyle={{
        backgroundColor: '#ffffff'
      }}
      activeColor={Colors.primary1}
      inactiveColor="#E7E7E7"
      screenOptions={({ route }) => ({
        // tabBarActiveTintColor: Colors.secondary,

        // headerTitleAlign: 'center',
        tabBarIcon: ({ color, focused }) => {
          let iconName: string = ''
          switch (route.name) {
            case 'Home':
              iconName = 'home'
              break

            case 'RequestsDelivStack':
              iconName = 'clipboard-list'
              break

            case 'Profile':
              iconName = 'user'
              break
          }

          return <FontAwesome5 name={iconName} size={20} color={color} />
        }
      })}
    >
      <BtTap.Screen
        name="Home"
        options={{ title: 'Domicilios' }}
        component={OrdersDelivStack}
      />
      <BtTap.Screen
        name="ReviewRestStack"
        options={{ title: 'Solicitudes' }}
        component={RequestsDelivStack}
      />
      <BtTap.Screen
        name="Profile"
        options={{ title: 'Perfil' }}
        component={ProfileDStack}
      />
    </BtTap.Navigator>
  )
}
