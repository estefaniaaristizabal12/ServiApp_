import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Cart } from '../screens/user/cartScreens/Cart'
import Profile from '../screens/user/userScreens/Profile'
import { FontAwesome5 } from '@expo/vector-icons'
import { Orders } from '../screens/user/ordersScreens/Orders'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { RestStack } from './RestStack'
import { OrderStack } from './OrderStack'
import { Colors } from '../constants/colors'
import { CartStack } from './CartStack'
import Account from '../screens/user/userScreens/Account'
import { ProfileStack } from './ProfileStack'
import { ServiceOrder } from '../screens/user/ordersScreens/ServiceOrder'

const BtTap = createMaterialBottomTabNavigator()

export default function BottomTab() {
  const navigation = useNavigation()

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

            case 'CartStack':
              iconName = 'shopping-cart'
              break

            case 'OrdersStack':
              iconName = 'clipboard-list'
              break

            case 'ProfileStack':
              iconName = 'user'
              break
          }

          return <FontAwesome5 name={iconName} size={20} color={color} />
        }
      })}
    >
      <BtTap.Screen
        name="Home"
        options={{ title: 'Inicio' }}
        component={RestStack}
      />
      <BtTap.Screen
        name="CartStack"
        options={{ title: 'Carrito' }}
        component={CartStack}
      />
      {/* <BtTap.Screen name="OrdersStack" options={{ title: 'Ordenes' }} component={ServiceOrder} /> */}
      <BtTap.Screen
        name="OrdersStack"
        options={{ title: 'Ordenes' }}
        component={OrderStack}
      />
      <BtTap.Screen
        name="ProfileStack"
        options={{ title: 'Perfil' }}
        component={ProfileStack}
      />
    </BtTap.Navigator>
  )
}
