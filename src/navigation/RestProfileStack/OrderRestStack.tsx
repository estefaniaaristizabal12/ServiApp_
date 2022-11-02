import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import OrdersRest from '../../screens/restProfileScreens/OrdersRest'
import ProductsRest from '../../screens/restProfileScreens/ProductsRest'
import ChangeStatusOrderRest from '../../screens/restProfileScreens/ChangeStatusOrderRest'

const StackOrderRest = createStackNavigator()
export default function OrderRestStack() {
  return (
    <StackOrderRest.Navigator
      screenOptions={{
        headerShown: false,
        animationTypeForReplace: 'pop'
      }}
    >
      <StackOrderRest.Screen name="OrderRest" component={OrdersRest} />
      <StackOrderRest.Screen name="ChangeStatusOrderRest" component={ChangeStatusOrderRest} />
      <StackOrderRest.Screen name="ProductsRest" component={ProductsRest} />
    </StackOrderRest.Navigator>
  )
}
