import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import Delivery from '../screens/Delivery'
import { Colors } from '../constants/colors'

export default function HeaderTabs(props) {
  return (
    <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
      <HeaderButton
        text="Delivery"
        btnColor="black"
        textColor="white"
        activeTab={props.activeTab}
        setActiveTab={props.setActiveTab}
      />
      <HeaderButton
        text="Pickup"
        btnColor="white"
        textColor="black"
        activeTab={props.activeTab}
        setActiveTab={props.setActiveTab}
      />
    </View>
  )
}

const HeaderButton = props => (
  <TouchableOpacity
    style={{
      backgroundColor:
        props.activeTab === props.text ? Colors.secondary : 'white',
      paddingVertical: 6,
      paddingHorizontal: 16,
      borderRadius: 30
    }}
    onPress={() => {
      props.setActiveTab(props.text)
      // console.log(props.text)
    }}
  >
    <Text
      style={{
        color: props.activeTab === props.text ? 'white' : 'black',
        fontSize: 15,
        fontWeight: '900'
      }}
    >
      {props.text}
    </Text>
  </TouchableOpacity>
)
