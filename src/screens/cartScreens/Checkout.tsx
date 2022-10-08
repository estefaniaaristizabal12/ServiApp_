import React from 'react'
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../../constants/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons, FontAwesome5, FontAwesome, MaterialIcons } from '@expo/vector-icons';

export const Checkout = ({ navigation }) => {
  const { top: paddingTop } = useSafeAreaInsets();
  let condicion = 2;
  return (
    <View style={{ flex: 1, paddingTop, flexDirection: "column", backgroundColor: Colors.grey }}>
      <View style={styles.superior}>
        <View style={{ flex: 0.1, marginBottom: 30 }}>
          <TouchableOpacity onPress={() => navigation.navigate('Cart')} style={styles.btnAtas}>
            <Ionicons name="arrow-back" size={25} color={Colors.grey} />
          </TouchableOpacity>

        </View>
        <View style={{ flex: 0.8, alignItems: "center", marginBottom: 30 }}>
          <Text style={styles.textCheckOut} > Tu  Pedido </Text>

        </View>
      </View>

      <View style={{ flex: 0.9, backgroundColor: "white", borderTopLeftRadius: 30, borderTopRightRadius: 30 }}>
        <View style={{ flex: 0.35, marginTop: 30, marginLeft: 7, marginRight: 7, borderBottomColor: "#E7E7E7", borderBottomWidth: 1 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 8 }}> Modalidad del pedido </Text>
          <View style={{ flexDirection: "row", marginTop: 10, marginLeft: 8 }}>
            {condicion == 1 ?
              <View style={{ flex: 0.65, flexDirection: "row", alignItems: 'center' }}>
                <MaterialIcons name="delivery-dining" size={24} color="black" />
                <Text style={{ fontSize: 17, marginLeft: 5 }}> |   Servicio a domicilio</Text>
              </View>
              : <View style={{ flex: 0.65, flexDirection: "row", alignItems: 'center' }}>
                <FontAwesome5 name="store-alt" size={20} color="black" />
                <Text style={{ fontSize: 17, marginLeft: 5 }}> |   Recoger en tienda</Text>
              </View>}

            <View style={{ flex: 0.35, alignItems: 'center' }}>
              <TouchableOpacity onPress={() => navigation.navigate('CartStack')} style={styles.btnCambio}>
                <Text style={styles.textBtnCambio}>Cambiar</Text>
              </TouchableOpacity>
            </View>


          </View>

          <View style={{ flex: 0.65, marginTop: 40, marginLeft: 8 }}>
            {condicion == 1 ?
              <View style={{ flex: 0.65, flexDirection: "row", alignItems: 'center' }}>
                <Image
                  style={{ width: 120, height: 80, borderRadius: 20, borderColor: Colors.gray, borderWidth: 0.5, marginLeft: 5 }}
                  source={require('../../../assets/mapa.jpg')}
                />
                <View style={{ flexDirection: "column", marginLeft: 15 }}>
                  <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Información</Text>
                  <Text style={{ fontSize: 15, color: Colors.grey1, marginTop: 5 }}>Edificio de ingeniería, piso 2</Text>
                  <TouchableOpacity onPress={() => navigation.navigate('CartStack')} style={styles.btnCambioUbi}>
                    <Text style={{ fontSize: 15, marginLeft: 12, marginRight: 12, fontWeight: 'bold', color: "white", }}>Cambiar ubicación</Text>
                  </TouchableOpacity>

                </View>

              </View>
              : <View style={{ flex: 0.65, flexDirection: "row", alignItems: 'center' }}>
                <Image
                  style={{ width: 120, height: 80, borderRadius: 20, borderColor: Colors.gray, borderWidth: 0.5, marginLeft: 5 }}
                  source={require('../../../assets/frutera.png')}
                />
                <View style={{ flexDirection: "column", marginLeft: 15 }}>
                  <Text style={{ fontSize: 20, fontWeight: 'bold' }}>La Frutera</Text>
                  <Text style={{ fontSize: 15, color: Colors.grey1, marginTop: 5 }}>Edificio 54, ..</Text>

                </View>


              </View>}

          </View>

        </View>

        <View style={{ flex: 0.23, marginTop: 20, marginLeft: 7, marginRight: 7, borderBottomColor: "#E7E7E7", borderBottomWidth: 1 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 8 }}> Método de pago</Text>
          <TouchableOpacity style={{ flexDirection: "row", alignItems: 'center', marginTop: 30 }} onPress={() => navigation.navigate('AddCard')}>
            <View style={{ flex: 0.8, flexDirection: "row" }}>
              <TouchableOpacity style={styles.btnTarjeta}>
                <Image
                  style={{ width: 40, height: 40, borderRadius: 20 }}
                  source={require('../../../assets/tarjeta.png')}
                />
              </TouchableOpacity>
              <View style={{ flexDirection: "column", marginLeft: 15 }}>
                <Text style={{ fontSize: 19, fontWeight: 'bold' }}>Tarjeta</Text>
                <Text style={{ fontSize: 15, color: Colors.grey1, marginTop: 5, fontWeight: 'bold' }}>****4035</Text>
              </View>

            </View>
            <View style={{ flex: 0.2, alignItems: 'center' }}>
              <Ionicons style={{ alignContent: 'flex-end' }} name="chevron-forward-outline" size={25} color="black" />
            </View>
          </TouchableOpacity>

        </View>

        <View style={{ flex: 0.29, marginTop: 20, marginLeft: 7, marginRight: 7 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 8 }}> Resumen</Text>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <View style={{ flex: 0.7, justifyContent: "center" }}>
              <Text style={styles.costos}>Costo de los productos</Text>

            </View>
            <View style={{ flex: 0.3, marginLeft: 10, justifyContent: "center", alignItems: "flex-end", paddingRight: 30 }}>
              <Text style={styles.valores}>$17.000</Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <View style={{ flex: 0.7, justifyContent: "center" }}>
              <Text style={styles.costos}>Costo de envío</Text>

            </View>
            <View style={{ flex: 0.3, marginLeft: 10, justifyContent: "center", alignItems: "flex-end", paddingRight: 30 }}>
              <Text style={styles.valores}>$3.000</Text>
            </View>
          </View>

        </View>

        <View style={{ flex: 0.13, flexDirection: "row", borderTopColor: "#E7E7E7", borderTopWidth: 1}}>

          <View style={{ flex: 0.60, flexDirection: "column", justifyContent: 'center' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginLeft: 20, color: Colors.grey1 }}>Total a pagar</Text>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 22, marginTop: 2 }}>$18.000</Text>
          </View>

          <View style={styles.btnPedido}>
            <TouchableOpacity onPress={() => { navigation.navigate('Cart') }}>
              <Text style={styles.textPedido}> Realizar pedido </Text>
            </TouchableOpacity>
          </View>

        </View>

      </View>

    </View>
  )
}
const styles = StyleSheet.create({
  superior: {
    flex: 0.1,
    flexDirection: "row",
    alignItems: "flex-end",
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
  textCheckOut: {
    fontSize: 25,
    fontWeight: 'bold',
    color: "white"
  },
  btnCambio: {
    backgroundColor: Colors.primary1,
    borderRadius: 50
  },
  textBtnCambio: {
    fontSize: 15,
    marginLeft: 12,
    marginRight: 12,
    fontWeight: 'bold',
    color: "white",
    padding: 10
  },
  btnCambioUbi: {
    backgroundColor: Colors.primary,
    borderRadius: 50,
    padding: 4,
    marginTop: 6,
    alignItems: "center"
  },
  btnTarjeta: {
    marginLeft: 10,
    backgroundColor: "#E7EDF1",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    height: 50,
    width: 50,

  },
  costos: {
    fontSize: 17,
    color: "black",
    padding: 10,
  },
  valores: {
    fontSize: 18,
    color: "black",
    padding: 10,
    fontWeight: 'bold',
  },
  btnPedido: {
    backgroundColor: Colors.primary1,
    borderRadius: 30,
    margin: 15,
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textPedido: {
    fontSize: 18,
    marginLeft: 12,
    marginRight: 12,
    fontWeight: 'bold',
    color: "white"

  },

});