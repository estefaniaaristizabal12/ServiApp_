import * as React from 'react';
import { View, StyleSheet, Image, Text, Pressable } from 'react-native';
import { Colors } from '../constants/colors';
import { CustomCardNew } from './CustomCardNew';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export const CardOrderBottom = (props) =>{

  let order = props.item;

  return (
    <Pressable onPress={props.onPress}>
      <CustomCardNew style={{ backgroundColor: "#fff", borderRadius: 10}}>

        <View style={{ flexDirection: "row", alignItems: "center" }}>

          <View style={{ flex: 2, marginLeft: 15, marginRight: 8, marginTop: 10 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text style={{ fontWeight: "600", color: Colors.LIGHTBLACK }}>{order.Nombre}</Text>
              <Text>No. {order.Categoria}</Text>
            </View>
            <View style={{ flexDirection: "row", marginTop: 5, justifyContent: "space-between", marginBottom: 10 }}>
              <Text style={{ color: Colors.LIGHTGREY, fontWeight: "600" }}>${order.Precio}</Text>
              <Text style={{ color:  Colors.GREEN, fontWeight: "600" }}>x {order.Categoria}</Text>
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