import React from 'react'
import { Text, View } from 'react-native'
import { Colors } from '../constants/colors'

export const Cart = () => {
  return (
    <View style={{ flex: 1, flexDirection: "column", backgroundColor: Colors.secondary }}>

      <View style={{ flex: 0.32}}>
      </View>

      <View style={{ flex: 0.68, borderTopLeftRadius: 30, borderTopRightRadius: 30, backgroundColor: "white" }}>
      </View>

    </View>
  )
}
