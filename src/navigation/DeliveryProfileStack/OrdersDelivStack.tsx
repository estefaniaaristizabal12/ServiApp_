import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Orders from '../../screens/domiciliary/Orders'
import ChangeStatusOrder from '../../screens/domiciliary/ChangeStatusOrder'

const StackOrderRest = createStackNavigator()
export default function OrdersDelivStack() {
  return (
    <StackOrderRest.Navigator
      screenOptions={{
        headerShown: false,
        animationTypeForReplace: 'pop'
      }}
    >
      <StackOrderRest.Screen name="Order" component={Orders} />
      <StackOrderRest.Screen name="ChangeStatusOrder" component={ChangeStatusOrder} />
    </StackOrderRest.Navigator>
  )
}
