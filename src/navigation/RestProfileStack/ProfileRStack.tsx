import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import OrdersDeliv from '../../screens/delivProfileScreens/ordersDelivery/OrdersDeliv'
import InfoOrdersDeliv from '../../screens/delivProfileScreens/ordersDelivery/InfoOrdersDeliv'
import ProfileDeliv from '../../screens/delivProfileScreens/ProfileDeliv'
import  AccountDeliv  from '../../screens/delivProfileScreens/AccountDeliv'
import EditProfile from '../../screens/delivProfileScreens/EditProfile'

const StackProfile = createStackNavigator()

export default function ProfileRStack({ route, navigation }) {
  return (
    <StackProfile.Navigator
      screenOptions={{
        headerShown: false,
        animationTypeForReplace: 'pop'
      }}
    >
      <StackProfile.Screen name="ProfileDeliv" component={ProfileDeliv} />
      <StackProfile.Screen name="EditProfile" component={EditProfile} />
      <StackProfile.Screen name="AccountDeliv" component={AccountDeliv} />
    </StackProfile.Navigator>
  )
}
