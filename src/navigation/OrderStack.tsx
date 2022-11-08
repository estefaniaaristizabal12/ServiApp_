import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Orders } from '../screens/user/ordersScreens/Orders'
import { Details } from '../screens/user/ordersScreens/Details'
import { HelpOrder } from '../screens/user/ordersScreens/HelpOrder'
import { ListProducts } from '../screens/user/ordersScreens/ListProducts'
import { ServiceOrder } from '../screens/user/ordersScreens/ServiceOrder'
import { Checkout } from '../screens/user/cartScreens/Checkout'
import AddCard from '../screens/user/cartScreens/AddCard'
import Confirmation from '../screens/user/Confirmation'
import StatusOrder from '../screens/user/restScreens/StatusOrder'
import MyCard from '../screens/user/MyCard'

const StackOrder = createStackNavigator()
export const OrderStack = () => {
  return (
    <StackOrder.Navigator
      screenOptions={{
        headerShown: false,
        animationTypeForReplace: 'pop'
      }}
    >
      <StackOrder.Screen name="Orders" component={Orders} />
      <StackOrder.Screen name="Details" component={Details} />
      <StackOrder.Screen name="HelpOrder" component={HelpOrder} />
      <StackOrder.Screen name="ListProducts" component={ListProducts} />
      <StackOrder.Screen name="ServiceOrder" component={ServiceOrder} />

      <StackOrder.Screen name="MyCard" component={MyCard} />
      <StackOrder.Screen name="Checkout" component={Checkout} />
      <StackOrder.Screen name="AddCard" component={AddCard} />
      <StackOrder.Screen name="Confirmation" component={Confirmation} />
      <StackOrder.Screen name="StatusOrder" component={StatusOrder} />
    </StackOrder.Navigator>
  )
}
