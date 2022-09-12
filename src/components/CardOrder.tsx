import React, { useEffect } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Text, Image, View, StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("screen");

const CardOrder = ({ title, fecha, image, navigation }) => {
  return (

    // onPress={() => navigation.navigate('Product')}
    <TouchableOpacity style={style.card}>
      <View style={{ flexDirection: "column", flex: 1 }}>
        <View style={{ flexDirection: "row", flex: 0.7 }}>
          <View style={style.cardImage}>
            <Image
              style={{ width: "80%", height: "80%", borderRadius: 20 }}
              source={image}
            />
          </View>
          <View style={{ flex: 0.6, marginHorizontal: 12, overflow: "hidden" }}>
            <Text style={style.cardTitle}>{title}</Text>
            <Text style={style.cardFecha}>{fecha}</Text>
          </View>
        </View>

        <View style={{flex: 0.3, flexDirection: "row" }}>
          <View style={style.btnOrdenes}>
            <TouchableOpacity onPress={() => navigation.navigate('Details')}>
              <Text style={style.textDetalle}>Detalle del pedido</Text>
            </TouchableOpacity>
          </View>
          <View style={style.btnOrdenes}>
            <TouchableOpacity>
              <Text style={style.textAyuda}>Ayuda</Text>
            </TouchableOpacity>
          </View>
        </View>

      </View>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  card: {
    marginVertical: 10,
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: width / 1.1,
    marginHorizontal: 20,
    borderRadius: 20,

    height: height / 7,

    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 1.5,
  },

  cardTitle: {
    fontWeight: "bold",
    fontSize: 20,
    marginLeft: 10,
  },

  cardFecha: {
    fontSize: 14,
    color: "#777",
    marginLeft: 10,
    marginTop:5
  },

  cardImage: {
    flex: 0.3,
    alignContent:'center',
    alignItems:'center'
  },
  textDetalle: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  textAyuda: {
    fontSize: 15,
    fontWeight: 'bold',
    color:"#CC2C2A"
  },
  btnOrdenes: {
    backgroundColor: "#F0F3FA",
    borderRadius: 5,
    margin: 2,
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  
});

export default CardOrder;

