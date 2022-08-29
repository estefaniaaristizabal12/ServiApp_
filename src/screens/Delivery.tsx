import React from 'react'
import { Text, View } from 'react-native'
import Button from '../components/Button'

export const Delivery = ({ navigation }) => {
  return (
    <View>
      <Button title="Prueba" onPress={() => navigation.navigate('Restaurant')}/>
    </View>
  )
}
