import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import OrdersDeliv from '../../screens/delivProfileScreens/ordersDelivery/OrdersDeliv'
import InfoOrdersDeliv from '../../screens/delivProfileScreens/ordersDelivery/InfoOrdersDeliv'
import ProfileDeliv from '../../screens/delivProfileScreens/ProfileDeliv'
import  AccountDeliv  from '../../screens/delivProfileScreens/AccountDeliv'

const StackProfile = createStackNavigator()

export default function ProfileDStack({ route, navigation }) {
  return (
    <StackProfile.Navigator
      screenOptions={{
        headerShown: false,
        animationTypeForReplace: 'pop'
      }}
    >
      <StackProfile.Screen name="ProfileDeliv" component={ProfileDeliv} />
      <StackProfile.Screen name="AccountDeliv" component={AccountDeliv} />
    </StackProfile.Navigator>
  )
}
