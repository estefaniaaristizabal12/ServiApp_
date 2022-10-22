import * as React from 'react';
import { View, StyleSheet, Image, Text, Pressable } from 'react-native';
import { Colors } from '../constants/colors';
import { CustomCardNew } from './CustomCardNew';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export const CardOrderBottom = (props) =>{

  let { name, cryptobalance, actualbalance, decreased, percentage, difference, imgsrc } = props.item;

  return (
    <Pressable onPress={props.onPress}>
      <CustomCardNew style={{ backgroundColor: "#fff", borderRadius: 10}}>

        <View style={{ flexDirection: "row", alignItems: "center" }}>

          <View style={{ flex: 2, marginLeft: 15, marginRight: 8, marginTop: 10 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text style={{ fontWeight: "600", color: Colors.LIGHTBLACK }}>Pescadito</Text>
              <Text>No. 122332</Text>
            </View>
            <View style={{ flexDirection: "row", marginTop: 5, justifyContent: "space-between", marginBottom: 10 }}>
              <Text style={{ color: Colors.LIGHTGREY, fontWeight: "600" }}>$12.500</Text>
              <Text style={{ color: decreased ? Colors.RED : Colors.GREEN, fontWeight: "600" }}>x 5</Text>
            </View>
          </View>
        </View>
      </CustomCardNew>
    </Pressable>);
}



const styles = StyleSheet.create({
  icon:
  {
    color: "#3ca3e1",
  },

});