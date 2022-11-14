import React from 'react'

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { Colors } from '../../constants/colors'
import { FontAwesome5 } from '@expo/vector-icons'
import OrdersRestStack from './OrdersRestStack'
import RequestsRestStack from './RequestsRestStack'
import ProfileRStack from './ProfileRStack'

const BtTap = createMaterialBottomTabNavigator()
export default function BottomTabRP({ route, navigation }) {
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
              iconName = 'th-list'
              break

            case 'RequestsRestStack':
              iconName = 'clipboard-list'
              break

            case 'ProfileDStack':
              iconName = 'user'
              break
          }

          return <FontAwesome5 name={iconName} size={20} color={color} />
        }
      })}
    > 
    <BtTap.Screen
        name="RequestsRestStack"
        options={{ title: 'Solicitudes' }}
        component={RequestsRestStack}
      />
      <BtTap.Screen
        name="Home"
        options={{ title: 'Ordenes' }}
        component={OrdersRestStack}
      />
     
      <BtTap.Screen
        name="ProfileDStack"
        options={{ title: 'Perfil' }}
        component={ProfileRStack}
      />
    </BtTap.Navigator>
  )
}
