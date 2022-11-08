import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Colors } from '../../../constants/colors'
import { Ionicons } from '@expo/vector-icons'
import { Image } from 'react-native-animatable'
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import CardCart from '../../../components/CardCart'
import * as AsyncStorage from '../../../services/AsyncStorage'
import { useIsFocused } from '@react-navigation/native'
import { normalize } from '../../../../FontNormalize'
import { images } from '../../../../images'
import * as UserService from '../../../services/UserService'
import { BottomSheetModalProvider, BottomSheetModal } from '@gorhom/bottom-sheet';



const { width, height } = Dimensions.get('screen')
export const Cart = ({ navigation }) => {
  const isFocused = useIsFocused()
  const { top: paddingTop } = useSafeAreaInsets()

  // Botón de modificación
  const [count, setCount] = useState(1)
  const onPressPlus = () => setCount(prevCount => prevCount + 1)
  const onPressRest = () => setCount(prevCount => prevCount - 1)

  const [cart, setCart] = React.useState<any>(null)
  const [total, setTotal] = React.useState(0)
  const [vacio, setVacio] = React.useState(true)
  const [user, setUser] = React.useState<any>(null)
  const [delivery, setDelivery] = React.useState<any>(null)
  const bottomSheetModalRef = React.useRef(null)
  const [isOpen, setIsOpen] = React.useState(false)
  
  const snapPoints = ['90%']
  function handlePresentModal() {
    bottomSheetModalRef.current?.present()
    setTimeout(() => {
      setIsOpen(true)
    }, 100)
  }


  React.useEffect(() => {
    if (isFocused) {
      getUser()
    }
  }, [isFocused])

  const getUser = async () => {
    AsyncStorage.getUser()
      .then(data => {
        setUser(data)
        getCart(data)
        UserService.getUser(data.uid)
          .then(uInf => {
            setDelivery(uInf.DomicilioCarro)
          })
      })
      .catch(error => {
        console.error(error)
      })
  }

  const currencyFormat = (num: number) => {
    if (!num) return '$0,00'
    return '$' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

  const getTotal = (cart: any) => {
    const total = cart?.Productos?.reduce((acum: number, element: any) => {
      return acum + element?.Precio * element?.Cantidad
    }, 0)
    return total
  }

  const getCart = async (user: any) => {
    UserService.getCart(user?.uid)
      .then(data => {
        if (JSON.stringify(data) === '{}') {
          setCart(null)
          setTotal(0)
          setVacio(true)
          return
        }
        setCart({ ...data })
        setTotal(getTotal(data))
        setVacio(false)
      })
      .catch(error => {
        console.error('getCart: ', error)
      })
  }

  const clearCart = async () => {
    UserService.clearCart(user?.uid)
      .then(data => {
        console.log('clearCart:', data)
      })
      .catch(error => console.error('clearCart:', error))
    setCart({})
    setTotal(0)
    setVacio(true)
    setDelivery(null)
  }

  const removeProdCart = async (id: any) => {
    UserService.removeProdCart(id, user?.uid)
      .then(data => {
        console.log('removeProdCart:', data)
      })
      .catch(error => {
        // alert("No se pudo eliminar el producto")
        console.error('removeProdCart:', error)
      })

    const newCartProducts = cart.Productos.filter((p: any) => {
      return p.id != id
    })
    const newCart = { ...cart, ...{ Productos: newCartProducts } }
    if (newCart.Productos.length == 0) {
      setVacio(true)
      setCart({})
      setTotal(0)
      return
    }
    setTotal(getTotal(newCart))
    setCart(newCart)
  }

  return (
    <BottomSheetModalProvider>

      <View
        style={{
          flex: 1,
          paddingTop,
          flexDirection: 'column',
          backgroundColor: Colors.grey
        }}
      >
        <View style={styles.superior}>
          <View style={{ flex: 0.2, marginBottom: 30, alignItems: 'center', }}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.btnAtas}
            >
              <Ionicons name='arrow-back' size={25} color={Colors.grey} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 0.6,
              alignItems: 'center',
              marginBottom: 30
            }}
          >
            <Text style={styles.textCarrito}>Tu Carrito </Text>
          </View>
          <View
            style={{
              flex: 0.2,
              alignItems: 'center',
              marginBottom: 30,
            }}
          >
            {!vacio ? (
              <TouchableOpacity
                style={styles.btnVaciar}
                onPress={() => {
                  clearCart()
                }}
              >
                <Ionicons name="md-trash-bin" size={20} color={Colors.grey} />
                {/* <Text style={styles.textVaciar}> Vaciar </Text> */}
              </TouchableOpacity>
            ) : (
              <Text></Text>
            )}
          </View>
        </View>

        <View
          style={{
            flex: 0.9,
            backgroundColor: 'white',
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30
          }}
        >
          <View
            style={{
              flex: 0.1,
              flexDirection: 'row',
              marginTop: 10,
              borderBottomColor: '#E7E7E7',
              borderBottomWidth: 1
            }}
          >
            <View
              style={{
                flex: 0.2,
                alignItems: 'flex-end',
                justifyContent: 'center'
              }}
            >
              <Image
                style={{
                  width: 45,
                  height: 45,
                  marginTop: 7,
                  borderRadius: 5
                }}
                source={{ uri: cart?.Restaurante?.Imagen }}
              />
            </View>

            <View
              style={{
                flex: 0.8,
                justifyContent: 'center',
                marginLeft: 5
              }}
            >
              <Text
                style={{
                  fontSize: normalize(22),
                  fontWeight: 'bold',
                  alignContent: 'center',
                  marginLeft: 10,
                  color: 'black'
                }}
              >
                {' '}
                {cart?.Restaurante?.Nombre}
                {' '}
                {!vacio ? delivery ? " - (Domicilio)" : " - (Recoger en Tienda)" : ""}
              </Text>
            </View>
          </View>
          <View style={{ flex: 0.8, flexDirection: 'column' }}>
            {!vacio ? (
              // <ScrollView>
              <View>
                <FlatList
                  data={cart?.Productos}
                  renderItem={({ item }) => (
                    <CardCart
                      title={item.Nombre}
                      precio={item.Precio}
                      image={item.Imagen}
                      cantidad={item.Cantidad}
                      id={item.id}
                      removeProdCart={removeProdCart}
                    />
                  )}
                />
                
                <View style={{ borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: Colors.gray, marginTop: 10 }}>
                  <Text style={{ fontSize: normalize(20), fontWeight: 'bold', color: 'black', marginLeft: 20, marginTop: 20 }}>Podrías combinar tu pedido con...</Text>

                  <FlatList
                    horizontal
                    data={cart?.Productos}
                    //ocultar scroll
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                      <TouchableOpacity style={styles.add} onPress={handlePresentModal}>
                        <Image
                          style={{
                            width: 100,
                            height: 60,
                            alignSelf: "center",
                            borderRadius : 15
                          }}
                          source={{ uri: item.Imagen }}
                        />
                        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.text} >{item.Nombre}</Text>
                        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.precio} >${item.Precio}</Text>
                      </TouchableOpacity>
                    )}
                  />
                  <BottomSheetModal
                    ref={bottomSheetModalRef}
                    index={0}
                    snapPoints={snapPoints}
                    backgroundStyle={{
                      borderRadius: 50
                    }}
                    onDismiss={() => setIsOpen(false)}
                  >
                    <View style={{flex:1}}>


                      <View style={styles.componente2}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                          <View style={{ flex: 0.8 }}>
                            <Text
                              numberOfLines={2}
                              ellipsizeMode="tail"
                              style={styles.tituloProd}
                            >
                              Nombre prod
                              {/* {selectedProduct?.Nombre} */}
                            </Text>
                            <Text
                              numberOfLines={3}
                              ellipsizeMode="tail"
                              style={styles.descrProd}
                            >
                              Esta es la descripcion completa de este producto de servicios de alimentacion
                              {/* {selectedProduct?.Descripcion} */}
                            </Text>
                            <Text style={styles.preProd}> $
                              5000
                              {/* {selectedProduct?.Precio} */}
                            </Text>
                          </View>
                          <View style={{ flex: 0.3 }}>
                            <Image
                              style={styles.logo}
                              source={require('../../../../assets/mastercardI.png')}
                            // source={{ uri: selectedProduct?.Imagen }}
                            />
                          </View>
                        </View>
                      </View>
                      <View
                        style={{
                          backgroundColor: 'white',
                          flex: 0.07,
                          flexDirection: 'row',
                          borderTopWidth: StyleSheet.hairlineWidth,
                          borderTopColor: '#E7E7E7'
                        }}
                      >
                        <View style={styles.btnModificar}>
                          <TouchableOpacity onPress={onPressRest}>
                            <Text style={styles.textBtn}>-</Text>
                          </TouchableOpacity>
                          <Text style={styles.textBtn}> {count}</Text>
                          <TouchableOpacity onPress={onPressPlus}>
                            <Text style={styles.textBtn}>+</Text>
                          </TouchableOpacity>
                        </View>
                        <View style={styles.btnACarro}>
                          <TouchableOpacity
                            onPress={() => {
                              // addProdCart(
                              //   selectedProduct?.id,
                              //   count,
                              //   selectedRestaurant?.id,
                              //   delivery ? 1 : 0,
                              //   user?.uid
                              // )
                            }}
                          >
                            <Text style={styles.textBtnCarro}>
                              Agregar $5.000
                              {/* {selectedProduct?.Precio}{' '} */}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>


                  </BottomSheetModal>
                </View>
              {/* </ScrollView> */}
              </View>

       

            ) : (
              <View style={{ alignItems: 'center' }}>
                <Image
                  style={{
                    width: 230,
                    height: 230,
                    marginTop: 35,
                    borderRadius: 5
                  }}
                  source={images.vacio}
                />
                <Text
                  style={{
                    fontSize: normalize(20),
                    fontWeight: 'bold',
                    color: Colors.grey1
                  }}
                >
                  {' '}
                  Carro de compras vacío{' '}
                </Text>
              </View>
            )}
          </View>

          <View
            style={{
              flex: 0.13,
              flexDirection: 'row',
              borderTopWidth: StyleSheet.hairlineWidth,
              borderTopColor: Colors.gray,
              marginTop: 200
            }}
          >
            <View style={{ flex: 0.5, justifyContent: 'center' }}>
              <Text style={styles.textSubTotal}>Subtotal</Text>
              <Text style={styles.textSPrecio}>{currencyFormat(total)}</Text>
            </View>
            <View
              style={{
                flex: 0.5,
                justifyContent: 'center',
                alignItems: 'center',
                margin : 5
              }}
            >
              {!vacio ? (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Checkout', {
                      cart: cart,
                      total: total,
                      reorder: false
                    })
                  }
                  style={styles.btnIrPago}
                >
                  <Text style={styles.textBtnPago}>Ir a pagar</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={styles.btnIrPagoV}>
                  <Text style={styles.textBtnPago}>Ir a pagar</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </View>
    </BottomSheetModalProvider>
  )
}

const styles = StyleSheet.create({
  superior: {
    flex: 0.1,
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  textCarrito: {
    fontSize: normalize(25),
    fontWeight: 'bold',
    color: 'white'
  },
  textVaciar: {
    fontSize: normalize(20),
    fontWeight: 'bold',
    color: '#4DA537'
  },
  btnAtas: {
    backgroundColor: '#E7E7E7',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    height: 30,
    width: 30
  },
  textSubTotal: {
    fontSize: normalize(17),
    color: '#6D6D6D',
    marginLeft: 25
  },
  textSPrecio: {
    fontSize: normalize(20),
    fontWeight: 'bold',
    color: 'black',
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
    color: 'white',
    paddingHorizontal: 30,
    paddingVertical: 15,
    textAlign: 'center',
    alignItems: 'center',
    marginbottom: 60
  },
  btnVaciar: {
    backgroundColor: '#E7E7E7',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    height: 30,
    width: 30
  },
  add: {
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 5,
    width: width / 3,
    marginHorizontal: 20,
    height: height / 7.2,

  },
  text: {
    fontSize: normalize(17),
    marginTop: 7
  },
  precio: {
    fontWeight: 'bold',
    fontSize: normalize(18),
    marginTop: 7
  },
  tituloProd: {
    marginTop: 20,
    fontSize: normalize(30),
    fontWeight: 'bold'
  },
  descrProd: {
    marginTop: 5,
    fontSize: normalize(18)
  },
  preProd: {
    marginTop: 10,
    fontSize: normalize(20),
    fontWeight: 'bold'
  },
  logo: {
    width: '100%',
    height: 120,
    borderRadius: 10,
    marginLeft: 3
  },
  componente2: {
    flex: 0.90,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: 'white',
    paddingTop: 10,
    paddingBottom: 20,
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 20
  },
  btnModificar: {
    flex: 0.3,
    flexDirection: 'row',
    backgroundColor: '#F0F3FA',
    borderRadius: 5,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textBtn: {
    fontSize: normalize(18),
    marginLeft: 12,
    marginRight: 12,
    fontWeight: 'bold'
  },
  btnACarro: {
    backgroundColor: Colors.primary1,
    borderRadius: 5,
    margin: 8,
    flex: 0.7,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textBtnCarro: {
    fontSize: normalize(18),
    marginLeft: 12,
    marginRight: 12,
    fontWeight: 'bold',
    color: 'white'
  },

})
