import React, { useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Colors } from '../../constants/colors'

import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { Image } from 'react-native-animatable'
import carrito from '../../constants/carrito';
import CardCart from '../../components/CardCart';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { firebaseConfig } from '../firebaseConfig';
import restaurant from '../../constants/restaurant';
import * as UserService from '../../services/UserService'
import * as AsyncStorage from '../../services/AsyncStorage'

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

import { useIsFocused } from "@react-navigation/native";
import { normalize } from '../../../FontNormalize'
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { CartContext } from '../../context/cartContext/CartContext';



export const Cart = ({ navigation }) => {
  const isFocused = useIsFocused()
  const { top: paddingTop } = useSafeAreaInsets();

  const [cart, setCart] = React.useState<any>(null);
  const [total, setTotal] = React.useState(0);
  const [vacio, setVacio] = React.useState(true);


  React.useEffect(() => {
    console.log('EJECUTANDO USEFFECT CARRITO');
    if (isFocused) {
      getCart();
    }
  }, [isFocused]);

  function currencyFormat(num: number) {
    if (!num) return '$0,00'
    return '$' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

  const getTotal = (cart: any) => {
    const total = cart?.Productos?.reduce((acum: number, element: any) => {
      return acum + (element?.Precio * element?.Cantidad)
    }, 0);
    return total;
  }

  const getCart = async () => {
    UserService.getCart(auth.currentUser.uid)
      .then(data => {
        if(JSON.stringify(data) === '{}') return 
        setCart({ ...data });
        setTotal(getTotal(data));
        setVacio(false);
      })
      .catch(error => {
        console.error("getCart: ", error)
      });
  };

  const clearCart = async () => {
    UserService.clearCart(auth.currentUser.uid)
      .then(data => {
        console.log("clearCart:", data)
        setCart({})
        setTotal(0)
        setVacio(true);
      })
      .catch(error => console.error("clearCart:", error))
  }




  return (
    <View style={{ flex: 1, paddingTop, flexDirection: "column", backgroundColor: Colors.grey }}>

      <View style={styles.superior}>
        <View style={{ flex: 0.3, marginBottom: 30 }}>
          <TouchableOpacity onPress={() => navigation.navigate('TopTab')} style={styles.btnAtas}>
            <Ionicons name="arrow-back" size={25} color={Colors.grey} />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 0.7, alignItems: "center", marginBottom: 30 }}>
          <Text style={styles.textCarrito} >Tu  Carrito </Text>

        </View>
        <View style={{ flex: 0.3, alignItems: "flex-end", marginBottom: 30, marginRight: 20, }}>
          {!vacio ?
            <TouchableOpacity onPress={() => { clearCart() }}>
              <Text style={styles.textVaciar} > Vaciar </Text>
            </TouchableOpacity>
            : <Text></Text>}
        </View>
      </View>

      <View style={{ flex: 0.9, backgroundColor: "white", borderTopLeftRadius: 30, borderTopRightRadius: 30 }}>
        <View style={{ flex: 0.1, flexDirection: "row", marginTop: 10, borderBottomColor: "#E7E7E7", borderBottomWidth: 1 }}>

          <View style={{ flex: 0.2, alignItems: "flex-end", justifyContent: "center" }}>
            <Image
              style={{ width: 45, height: 45, marginTop: 7, borderRadius: 5 }}
              source={{ uri: cart?.Restaurante?.Imagen }}
            />

          </View>

          <View style={{ flex: 0.8, justifyContent: "center", marginLeft: 5 }}>
            <Text style={{ fontSize: normalize(22), fontWeight: 'bold', alignContent: 'center', marginLeft: 10, color: "black" }}> {cart?.Restaurante?.Nombre}</Text>
          </View>
        </View>
        <View style={{ flex: 0.8, flexDirection: "column" }}>

          {!vacio ?


            <FlatList
              data={cart?.Productos}

              renderItem={({ item }) => (

                <CardCart
                  title={item.Nombre}
                  precio={item.Precio}
                  image={item.Imagen}
                  cantidad={item.Cantidad}
                  id={item.id}
                  uid={auth.currentUser.uid}
                />

              )}

            /> :
            <View style={{ alignItems: 'center' }}>
              <Image
                style={{ width: 230, height: 230, marginTop: 35, borderRadius: 5 }}
                source={require('../../../assets/vacio.png')}
              />
              <Text style={{ fontSize: normalize(20), fontWeight: 'bold', color: Colors.grey1 }}> Carro de compras vacío </Text>
            </View>
          }


        </View>

        <View style={{ flex: 0.13, flexDirection: "row", borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: Colors.gray }}>

          <View style={{ flex: 0.5, justifyContent: "center" }}>
            <Text style={styles.textSubTotal}>Subtotal</Text>
            <Text style={styles.textSPrecio}>{currencyFormat(total)}</Text>
          </View>
          <View style={{ flex: 0.5, justifyContent: "center", alignItems: "center" }}>

            {!vacio ?
              <TouchableOpacity onPress={() => navigation.navigate('Checkout', { cart: cart, total: total })} style={styles.btnIrPago}>
                <Text style={styles.textBtnPago}>Ir a pagar</Text>
              </TouchableOpacity>
              : <TouchableOpacity style={styles.btnIrPagoV}>
                <Text style={styles.textBtnPago}>Ir a pagar</Text>
              </TouchableOpacity>}



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
    fontSize: normalize(25),
    fontWeight: 'bold',
    color: "white"
  },
  textVaciar: {
    fontSize: normalize(20),
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
    fontSize: normalize(17),
    color: "#6D6D6D",
    marginLeft: 25

  },
  textSPrecio: {
    fontSize: normalize(20),
    fontWeight: 'bold',
    color: "black",
    marginLeft: 25,
    marginTop: 5
  },
  btnIrPago: {
    backgroundColor: Colors.primary1,
    borderRadius: 50
  },
  btnIrPagoV: {
    backgroundColor: Colors.grey1,
    borderRadius: 50
  },
  textBtnPago: {
    fontSize: normalize(18),
    marginLeft: 12,
    marginRight: 12,
    fontWeight: 'bold',
    color: "white",
    paddingHorizontal: 30,
    paddingVertical: 15
  }



});
