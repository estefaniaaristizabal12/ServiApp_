import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import AddCard from '../screens/user/cartScreens/AddCard'
import { Cart } from '../screens/user/cartScreens/Cart'
import { Checkout } from '../screens/user/cartScreens/Checkout'
import MyCard from '../screens/user/MyCard'
import StatusOrder from '../screens/user/restScreens/StatusOrder'
import StatusOrderPickup from '../screens/user/restScreens/StatusOrderPickup'
import { ChangeLocation } from '../screens/user/cartScreens/ChangeLocation'
import Confirmation from '../screens/user/Confirmation'

const StackCart = createStackNavigator()
export const CartStack = () => {
  return (
    <StackCart.Navigator
      screenOptions={{
        headerShown: false,
        animationTypeForReplace: 'pop'
      }}
    >
      <StackCart.Screen name="Cart" component={Cart} />
      <StackCart.Screen name="Checkout" component={Checkout} />
      <StackCart.Screen name="MyCard" component={MyCard} />
      <StackCart.Screen name="AddCard" component={AddCard} />
      <StackCart.Screen name="Confirmation" component={Confirmation} />
      <StackCart.Screen name="StatusOrder" component={StatusOrder} />
      <StackCart.Screen name="StatusOrderPickup" component={StatusOrderPickup} />
      <StackCart.Screen name="ChangeLocation" component={ChangeLocation} />
    </StackCart.Navigator>
  )
}
