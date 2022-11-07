import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Requests from '../../screens/restaurant/Requests'
import Profile from '../../screens/profileRestDomi/Profile'
import Ratings  from '../../screens/profileRestDomi/Ratings'
import EditProfile from '../../screens/profileRestDomi/EditProfile'

const StackProfile = createStackNavigator()

export default function ProfileDStack({ route, navigation }) {
  return (
    <StackProfile.Navigator
      screenOptions={{
        headerShown: false,
        animationTypeForReplace: 'pop'
      }}
    >
      <StackProfile.Screen name="ProfileDelivRest" component={Profile} />
      <StackProfile.Screen name="EditProfile" component={EditProfile} />
      <StackProfile.Screen name="Ratings" component={Ratings} initialParams={{domiciliary: true}}/>
    </StackProfile.Navigator>
  )
}
