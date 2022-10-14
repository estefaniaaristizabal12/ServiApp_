import React from 'react'
import { normalize } from '../../FontNormalize';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../constants/colors';
import { Ionicons, MaterialCommunityIcons, MaterialIcons, FontAwesome, FontAwesome5 } from '@expo/vector-icons';

const { width, height } = Dimensions.get("screen");

// { numeroOrden, fecha, modalidad, total, estado }
export const CartOrderRestFin = () => {

  let servicio = 1;
  return (
    <View style={style.card}>

      <View style={{ flexDirection: "column" }}>
        <View style={{ alignItems: 'center', borderBottomColor: Colors.gray, borderBottomWidth: 0.5 }}>
          <Text style={{ padding: 5, fontSize: normalize(22), fontWeight: "bold" }}> Órden #2222</Text>
        </View>

        <View style={{ flexDirection: "column" }}>
          <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
            <View style={{ flexDirection: "row", flex: 0.6 }}>
              <MaterialCommunityIcons name="calendar-clock" size={20} color={Colors.grey1} />
              <Text style={{ padding: 5, fontSize: normalize(18), color: Colors.grey1 }}>13/10/2022  15:20</Text>
            </View>

            <TouchableOpacity style={{ flexDirection: "row", flex: 0.5, backgroundColor: Colors.secondary1, justifyContent: "center", borderRadius: 20 }}>
              <Text style={{ padding: 5, fontSize: normalize(18), fontWeight: "bold", color: "white" }}>Ver productos</Text>
            </TouchableOpacity>

          </View>

          <View style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}>
            <Text style={{ padding: 5, fontSize: normalize(20), fontWeight: "bold" }}>Modalidad:  </Text>

            {servicio == 1 ?
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <MaterialIcons name="delivery-dining" size={22} color="#50ac31" />
                <Text style={{ padding: 5, fontSize: normalize(18) }}> Servicio a domicilio</Text>
              </View>

              : <View style={{ flexDirection: "row", alignItems: "center" }}>
                <FontAwesome5 name="store" size={18} color="#930452" />
                <Text style={{ padding: 5, fontSize: normalize(18) }}> Recoger en tienda</Text>
              </View>}

          </View>

          <View style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}>
            <View style={{ flexDirection: "row", flex: 0.5 }}>
              <Text style={{ padding: 5, fontSize: normalize(20), fontWeight: "bold" }}>Total:</Text>
              <Text style={{ padding: 5, fontSize: normalize(19), fontWeight: "bold" }}>$5000 </Text>
            </View>
            <View style={{ flexDirection: "row", flex: 0.5, alignItems:"center"}}>
              <FontAwesome name="circle" size={15} color="#d20728" />
              <Text style={{ padding: 5, fontSize: normalize(18), fontWeight: "bold" }}>Finalizado</Text>

            </View>


          </View>

          <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 5, backgroundColor: Colors.grey, borderRadius: 20, marginHorizontal: 20 }}>
            <FontAwesome name="star-half-empty" size={22} color="white" />
            <Text style={{ padding: 5, fontSize: normalize(18), fontWeight: "bold", color: "white", marginVertical: 3 }}>Ver calificación </Text>

          </TouchableOpacity>

        </View>
      </View>

    </View>
  )
}


const style = StyleSheet.create({
  card: {
    marginVertical: 10,
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: width / 1.1,
    marginHorizontal: 20,
    borderRadius: 20,

    height: height / 4.5,

    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 1.5,
  },

  textFecha: {

  },

  cardTitle: {
    fontWeight: "bold",
    fontSize: normalize(20),
    marginLeft: 10,
  },

  cardLocation: {
    fontSize: normalize(14),
    color: "#777",
    marginLeft: 10,
  },

  cardDescription: {
    fontSize: normalize(15),
    marginVertical: 8,
    marginLeft: 10,
  },

  cardImage: {
    flex: 0.3,
  },
});

export default CartOrderRestFin;