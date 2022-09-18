import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Colors } from '../constants/colors'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { Image } from 'react-native-animatable'
import carrito from '../constants/carrito';
import CardCart from '../components/CardCart';

export const Cart = ({ navigation }) => {
  return (
    <View style={{ flex: 1, flexDirection: "column", backgroundColor: Colors.secondary }}>

      <View style={styles.superior}>
        <View style={{ flex: 0.3, marginBottom: 35 }}>
          <TouchableOpacity onPress={() => navigation.navigate('TopTab')} style={styles.btnAtas}>
            <Ionicons name="arrow-back" size={25} color={Colors.grey} />
          </TouchableOpacity>

        </View>
        <View style={{ flex: 0.6, alignItems: "center", marginBottom: 30 }}>
          <Text style={styles.textCarrito} > Tu  Carrito </Text>

        </View>
        <View style={{ flex: 0.3, alignItems: "flex-end", marginBottom: 30, marginRight: 20, }}>
          <TouchableOpacity>
            <Text style={styles.textVaciar} > Vaciar </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ flex: 0.85, backgroundColor: "white", borderTopLeftRadius: 30, borderTopRightRadius: 30 }}>
        <View style={{ flex: 0.1, flexDirection: "row", marginTop: 10, borderBottomColor: "#E7E7E7", borderBottomWidth: 1 }}>

          <View style={{ flex: 0.2, alignItems: "flex-end", justifyContent: "center" }}>
            <Image
              style={{ width: 45, height: 45, marginTop: 7, borderRadius: 5 }}
              source={require('../../assets/italiano.jpg')}
            />

          </View>

          <View style={{ flex: 0.8, justifyContent: "center", marginLeft: 5 }}>
            <Text style={{ fontSize: 22, fontWeight: 'bold', alignContent: 'center', marginLeft: 10, color: "black" }}> El Italiano</Text>
          </View>
        </View>
        <View style={{ flex: 0.8, flexDirection: "column" }}>
          <FlatList
            data={carrito}
            renderItem={({ item }) => (
              <CardCart
                title={item.title}
                precio={item.precio}
                image={item.image}
                cantidad={item.cantidad}
              />
            )}
          />


        </View>

        <View style={{ flex: 0.13, flexDirection: "row",borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: Colors.gray}}>

          <View style={{ flex: 0.5, justifyContent: "center" }}>
            <Text style={styles.textSubTotal}>Subtotal</Text>
            <Text style={styles.textSPrecio}>$18.000</Text>

          </View>
          <View style={{ flex: 0.5, justifyContent: "center", alignItems: "center" }}>
            <TouchableOpacity style={styles.btnIrPago}>
              <Text style={styles.textBtnPago}> Ir a pagar</Text>
            </TouchableOpacity>

          </View>

        </View>

      </View>



      {/* <View style={{ flex: 0.32}}>
      </View>

      <View style={{ flex: 0.68, borderTopLeftRadius: 30, borderTopRightRadius: 30, backgroundColor: "white" }}>
      </View> */}

    </View>
  )
}

const styles = StyleSheet.create({
  superior: {
    flex: 0.15,
    flexDirection: "row",
    alignItems: "flex-end",

  },
  textCarrito: {
    fontSize: 25,
    fontWeight: 'bold',
    color: "white"
  },
  textVaciar: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "#7ED957"
  },
  btnAtas: {
    marginLeft: 25,
    backgroundColor: '#E7E7E7',
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    height: 30,
    width: 30
  },
  textSubTotal: {
    fontSize: 17,
    color: "#6D6D6D",
    marginLeft: 25

  },
  textSPrecio: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "black",
    marginLeft: 25,
    marginTop: 5
  },
  btnIrPago: {
    backgroundColor: Colors.primary,
    borderRadius:50
  },
  textBtnPago: {
    fontSize: 18,
    marginLeft: 12,
    marginRight: 12,
    fontWeight: 'bold',
    color: "white", 
    paddingHorizontal:30,
    paddingVertical:15
  }



});