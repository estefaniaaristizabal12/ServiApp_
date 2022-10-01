import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Colors } from '../constants/colors'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { Image } from 'react-native-animatable'
import carrito from '../constants/carrito';
import CardCart from '../components/CardCart';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { firebaseConfig } from './firebaseConfig';
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);




export const Cart = ({ navigation }) => {
  const { top: paddingTop } = useSafeAreaInsets();

  const [cart, setCart] = React.useState([]);


  React.useEffect(() => {
    getCart();
  }, []);

const getCart = async () => {
  const response = await fetch('http://54.226.101.30/api/usuarios/cart'+ '/?uid='+ auth.currentUser.uid, { method: 'GET' });
  const data = await response.json();
  setCart(data);
};



  return (
    <View style={{ flex: 1, paddingTop, flexDirection: "column", backgroundColor: Colors.grey }}>

      <View style={styles.superior}>
        <View style={{ flex: 0.3, marginBottom: 30 }}>
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

      <View style={{ flex: 0.9, backgroundColor: "white", borderTopLeftRadius: 30, borderTopRightRadius: 30 }}>
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
            data={cart}
            renderItem={({ item }) => (
              <CardCart
                title={item.Nombre}
                // precio={item.precio}
                image={item.Imagen}
                // cantidad={item.cantidad}
              />
            )}
          />


        </View>

        <View style={{ flex: 0.13, flexDirection: "row", borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: Colors.gray }}>

          <View style={{ flex: 0.5, justifyContent: "center" }}>
            <Text style={styles.textSubTotal}>Subtotal</Text>
            <Text style={styles.textSPrecio}>$18.000</Text>

          </View>
          <View style={{ flex: 0.5, justifyContent: "center", alignItems: "center" }}>
            <TouchableOpacity onPress={() => navigation.navigate('MyCard')} style={styles.btnIrPago}>
              <Text style={styles.textBtnPago}>Ir a pagar</Text>
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
  textCarrito: {
    fontSize: 25,
    fontWeight: 'bold',
    color: "white"
  },
  textVaciar: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "#4DA537"
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
    backgroundColor: Colors.primary1,
    borderRadius: 50
  },
  textBtnPago: {
    fontSize: 18,
    marginLeft: 12,
    marginRight: 12,
    fontWeight: 'bold',
    color: "white",
    paddingHorizontal: 30,
    paddingVertical: 15
  }



});