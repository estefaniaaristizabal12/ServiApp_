import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Requests from '../../screens/restaurant/Requests'
import Profile from '../../screens/profileRestDomi/Profile'
import Ratings  from '../../screens/profileRestDomi/Ratings'
import EditProfile from '../../screens/profileRestDomi/EditProfile'

const StackProfile = createStackNavigator()

export default function ProfileRStack({ route, navigation }) {
  return (
    <StackProfile.Navigator
      screenOptions={{
        headerShown: false,
        animationTypeForReplace: 'pop'
      }}
    >
      <StackProfile.Screen name="Profile" component={Profile} />
      <StackProfile.Screen name="Ratings" component={Ratings} />
      <StackProfile.Screen name="EditProfile" component={EditProfile} />
    </StackProfile.Navigator>
  )
}
