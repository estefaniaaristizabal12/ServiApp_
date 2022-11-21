import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Orders from '../../screens/restaurant/Orders'
import ChangeStatusOrder from '../../screens/restaurant/ChangeStatusOrder'
import { ListProductsR } from '../../screens/restaurant/ListProductsR'
import ChangeStatusOrderPickup from '../../screens/restaurant/ChangeStatusOrderPickup'

const StackDelivery = createStackNavigator()

export default function OrdersRestStack({ route, navigation }) {
  return (
    <StackDelivery.Navigator
      screenOptions={{
        headerShown: false,
        animationTypeForReplace: 'pop'
      }}
    >
      <StackDelivery.Screen name="Orders" component={Orders} />
      <StackDelivery.Screen
        name="ChangeStatusOrder"
        component={ChangeStatusOrder}
      />
      <StackDelivery.Screen
        name="ChangeStatusOrderPickup"
        component={ChangeStatusOrderPickup}
      />
      <StackDelivery.Screen name="ListProductsR" component={ListProductsR} />
    </StackDelivery.Navigator>
  )
}
