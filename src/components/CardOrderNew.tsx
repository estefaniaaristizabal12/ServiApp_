import * as React from 'react';
import { View, StyleSheet, Image, Text, Pressable } from 'react-native';
import { Colors } from '../constants/colors';
import { CustomCardNew } from './CustomCardNew';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';


export const CardOrderNew = (props) => {

  let { name, cryptobalance, actualbalance, decreased, percentage, difference, imgsrc } = props.item;

  return (
    <Pressable onPress={props.onPress}>
      <CustomCardNew style={{ backgroundColor: "#fff", borderRadius: 10, paddingVertical: 20 }}>

        <View style={{ flexDirection: "row", justifyContent: "space-between", marginRight: 20}}>
        <View style={{ marginTop: -10, backgroundColor: decreased ? "#FEF7EC" : "#F0F9F1", width: 84, height: 24, alignItems: "center", borderRadius: 5, justifyContent: "center", marginLeft:15 }}>
          <Text style={{ color: decreased ? '#F2AB58' : '#4CAF50', fontWeight: "400", fontSize: 13 }}>Active</Text>
        </View>
           <Ionicons name="alert-circle-outline" size={20} style={styles.icon}></Ionicons>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View>
            <Image style={{ height: 60, width: 60 }} source={imgsrc}></Image>
          </View>
          <View style={{ flex: 2, marginLeft: 15, marginRight: 8 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text style={{ fontWeight: "600", color: Colors.LIGHTBLACK }}>Pedido Estefania A</Text>
              <Text>No. 122332</Text>
            </View>
            <View style={{ flexDirection: "row", marginTop: 5, justifyContent: "space-between" }}>
              <Text style={{ color: Colors.LIGHTGREY, fontWeight: "600" }}>$12.500</Text>
              <Text style={{ color: decreased ? Colors.RED : Colors.GREEN, fontWeight: "600" }}>15 Min</Text>
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