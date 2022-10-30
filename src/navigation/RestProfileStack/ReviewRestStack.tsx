import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ReviewRest from '../../screens/restProfileScreens/ReviewRest'
import ReviewOrder from '../../screens/restProfileScreens/ReviewOrder'
import ProductsRest from '../../screens/restProfileScreens/ProductsRest'

const StackReviewRest = createStackNavigator()
export default function ReviewRestStack() {
  return (
    <StackReviewRest.Navigator
      screenOptions={{
        headerShown: false,
        animationTypeForReplace: 'pop'
      }}
    >
      <StackReviewRest.Screen name="ReviewRest" component={ReviewRest} />
      <StackReviewRest.Screen name="ReviewOrder" component={ReviewOrder} />
      <StackReviewRest.Screen name="ProductsRestR" component={ProductsRest} />
    </StackReviewRest.Navigator>
  )
}
