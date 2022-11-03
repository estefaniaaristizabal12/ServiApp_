import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Restaurant } from '../screens/user/restScreens/Restaurant'
import { Product } from '../screens/user/restScreens/Product'
import { TopTab } from './TopTab'
import { Cart } from '../screens/user/cartScreens/Cart'
import RestProfile from '../screens/user/restScreens/RestProfile'
import AddCard from '../screens/user/cartScreens/AddCard'
import MyCard from '../screens/user/MyCard'
import Confirmation from '../screens/user/Confirmation'
import Delivery from '../screens/user/Delivery'
import { CartStack } from './CartStack'
import Account from '../screens/user/userScreens/Account'
// import EditProfile from '../screens/userScreens/EditProfile';

const StackRest = createStackNavigator()
export const RestStack = () => {
  return (
    <StackRest.Navigator
      screenOptions={{
        headerShown: false,
        animationTypeForReplace: 'pop'
      }}
    >
      {/* <StackRest.Screen name="TopTab" component={TopTab} /> */}
      <StackRest.Screen
        name="Delivery"
        component={Delivery}
        initialParams={{ delivery: true }}
      />
      <StackRest.Screen name="Restaurant" component={Restaurant} />
      <StackRest.Screen name="Product" component={Product} />
      <StackRest.Screen name="Cart" component={Cart} />
      <StackRest.Screen name="Profile" component={RestProfile} />
      <StackRest.Screen name="Account" component={Account} />
    </StackRest.Navigator>
  )
}
