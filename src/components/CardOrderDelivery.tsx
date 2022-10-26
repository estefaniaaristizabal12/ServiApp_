import * as React from 'react';
import { View, StyleSheet, Image, Text, Pressable } from 'react-native';
import { Colors } from '../constants/colors';
import { CustomCard } from './CustomCard';


export const CardOrderDelivery = (props) => {
  const order = props.item;

  return (
    <Pressable onPress={props.onPress}>
      <CustomCard style={{ flexDirection: "row", alignItems: "center", backgroundColor: "#fff", borderRadius: 15, paddingHorizontal: 10, paddingVertical: 20 }}>
        <View style={{ flex: 2, marginLeft: 15, marginRight: 8 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={{ fontWeight: "500", color: Colors.black, fontSize: 18 }}>{order.Total} $</Text>
            <Text style={{ fontWeight: "400", color:  Colors.LIGHTGREY, fontSize: 13 }}>No. {order?.id.substring(0,5)}</Text>
          </View>
          <View style={{ marginTop: 9, backgroundColor:order.Estado=='4'?"#FEF7EC":"#F0F9F1", width: 84, height: 24, alignItems: "center", borderRadius: 5, justifyContent: "center" }}>
            <Text style={{ color:order.Estado=='4'?'#F2AB58':'#4CAF50', fontWeight: "400", fontSize: 13 }}>{order.Estado == '4'? 'Entregado' : 'En Curso'}</Text>
          </View>
          <View style={{ width: 300, height: 2, backgroundColor: "rgba(217, 217, 217, 0.4)", marginTop: 16, alignItems: "center" }}></View>
          <View style={{ width: 197, height: 88, marginLeft:16 , marginTop:16}}>
            <View style={{ flexDirection: "row"}}>
              <Image source={require('../../assets/iconMapsInicio2.png')} style={{ width: 26, height: 26, marginLeft: 10, marginRight: 12 }} />
              <Text style={{ fontWeight: "500", color: "#2F2E36", fontSize: 17, marginTop: 3 }}>{order?.Restaurante?.Nombre}</Text>
            </View> 
            <View style={{ flexDirection: "row"}}>
              <View style={{ width: 2, height: 25, marginLeft: 21, marginRight: 27, marginTop: 3, backgroundColor: "rgba(217, 217, 217, 0.4)"}} />
              <Text style={{ fontWeight: "400", color: "#B8B8B8", fontSize: 16,  marginTop: 4 }}>U Javeriana </Text>
            </View>
            <View style={{ flexDirection: "row", marginTop: 4}}>
              <Image source={require('../../assets/IconMapsFinal.png')} style={{   height: 29, width: 23, marginLeft: 10, marginRight: 14}} />
              <Text style={{ fontWeight: "500", color: "#2F2E36", fontSize: 17, marginTop: 3}}>{order?.Direccion}</Text>
            </View> 
            
          </View>

        </View>
      </CustomCard>
    </Pressable>);
}

const styles = StyleSheet.create({

});