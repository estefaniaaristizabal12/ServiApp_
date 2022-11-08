import {
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialIcons
} from '@expo/vector-icons'
import {
  BottomSheetModal,
  BottomSheetModalProvider
} from '@gorhom/bottom-sheet'
import { useIsFocused } from '@react-navigation/native'
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import React from 'react'
import { Image, StyleSheet, Text, TextInput, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import SelectDropdown from 'react-native-select-dropdown'
import { normalize } from '../../../../FontNormalize'
import { images } from '../../../../images'
import { edificios } from '../../../constants/buildings'
import { Colors } from '../../../constants/colors'
import * as AsyncStorage from '../../../services/AsyncStorage'
import * as RestaurantService from '../../../services/RestaurantService'
import * as UserService from '../../../services/UserService'
import { firebaseConfig } from '../../firebaseConfig'

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export const Checkout = ({ navigation, route }) => {
  const isFocused = useIsFocused()
  const { top: paddingTop } = useSafeAreaInsets()
  const snapPoints = ['90%']

  const [selectedCard, setSelectedCard] = React.useState<any>(null)
  const [selectedIdCard, setSelectedIdCard] = React.useState<any>({})
  const [cart, setCart] = React.useState<any>({})
  const [total, setTotal] = React.useState<any>(0)
  const [user, setUser] = React.useState<any>(null)
  const [delivery, setDelivery] = React.useState<any>(null)
  const bottomSheetModalRef = React.useRef(null)
  const [isOpen, setIsOpen] = React.useState(false)
  const [locationDescription, setLocationDescription] = React.useState('')
  const [locationBuilding, setLocationBuilding] = React.useState('')
  const [rest, setRest] = React.useState<any>(null)
  const [reorder, setReorder] = React.useState<any>(null)

  const currencyFormat = (num: number) => {
    if (!num) return '$0,00'
    return '$' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

  const getUser = async () => {
    AsyncStorage.getUser().then(user => {
      UserService.getUser(user.uid)
        .then(data => {
          data.uid = user.uid
          setUser(data)
          return data
        })
        .catch(error => {
          console.error('getUser', error)
        })
    })
  }

  const payCart = () => {
    if (reorder) {
      UserService.reorder(
        reorder.id,
        selectedCard.id,
        user.direccion1,
        auth.currentUser.uid
      )
        .then(data => {
          setReorder(data)
          // console.log('checkout reorder', data)
          navigation.navigate('Confirmation', { order: data })
        })
        .catch(error => console.error('reorder', error))
      return
    }
    UserService.payCart(
      selectedCard.id,
      total,
      user.direccion1,
      auth.currentUser.uid
    )
      .then(data => {
        setReorder(data)
        // console.log('checkout pay cart', data)
        navigation.navigate('Confirmation', { order: data })
      })
      .catch(err => {
        console.error('ERROR AL PAGAR', err)
      })
  }

  React.useEffect(() => {
    // if (!isFocused) return
    getUser().then((user: any) => {
      if (!route.params['reorder']) {
        RestaurantService.getRestaurant(user.RestauranteCarro)
          .then(data => {
            setRest(data)
          })
          .catch(error => console.error('getUser, getRestaurant', error))
      }
    })
    // console.log('reorder=???', route.params['reorder'])
    if (route.params['reorder']) {
      setUser(route.params['reorder'].UsuarioInfo)
      setRest(route.params['reorder'].Restaurante)
      setReorder(route.params['reorder'])

      setSelectedCard(route.params['card'])
      setCart(route.params['reorder'].Carro)
      setTotal(route.params['reorder'].Total)
      setDelivery(route.params['reorder'].Domicilio)
    } else {
      setSelectedCard(route.params['card'])
      setCart(route.params['cart'])
      setTotal(route.params['total'])
      setDelivery(route.params['delivery'])
    }
  }, [isFocused])

  function handlePresentModal() {
    bottomSheetModalRef.current?.present()
    setTimeout(() => {
      setIsOpen(true)
    }, 100)
  }
  const changeUserDirection = () => {
    console.log('changeUserDirection')
    UserService.update(
      user?.nombrecliente,
      locationBuilding + ' ' + locationDescription,
      user?.e_mail,
      user?.Telefono,
      user?.uid
    )
      .then(data => {
        const newUser = { ...user, ...data }
        console.log('newUser: ', newUser)
        AsyncStorage.saveUser(newUser).catch(error => console.error(error))
        setLocationDescription('')
        user.direccion1 = locationBuilding + ' ' + locationDescription
        isOpen && bottomSheetModalRef.current?.close()
      })
      .catch(err => console.error(err))
  }

  // let condicion = 0
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
          <View style={{ flex: 0.1, marginBottom: 30 }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Cart')}
              style={styles.btnAtas}
            >
              <Ionicons name='arrow-back' size={25} color={Colors.grey} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 0.8,
              alignItems: 'center',
              marginBottom: 30
            }}
          >
            <Text style={styles.textCheckOut}> Tu Pedido </Text>
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
              flex: 0.35,
              marginTop: 30,
              marginLeft: 7,
              marginRight: 7,
              borderBottomColor: '#E7E7E7',
              borderBottomWidth: 1
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                marginLeft: 8
              }}
            >
              {' '}
              Modalidad del pedido{' '}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                marginLeft: 8
              }}
            >
              {user?.DomicilioCarro ? (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}
                >
                  <MaterialIcons
                    name='delivery-dining'
                    size={24}
                    color='black'
                  />
                  <Text style={{ fontSize: 17, marginLeft: 5 }}> </Text>
                  <Text style={{ fontSize: 17, marginLeft: 5 }}>
                    {' '}
                    | Servicio a{' '}
                    {user?.DomicilioCarro ? 'domicilio' : 'recoger'}
                  </Text>
                </View>
              ) : (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}
                >
                  <FontAwesome5 name='store-alt' size={20} color='black' />
                  <Text style={{ fontSize: 17, marginLeft: 5 }}> </Text>
                  <Text style={{ fontSize: 17, marginLeft: 5 }}>
                    {' '}
                    | Servicio a{' '}
                    {user?.DomicilioCarro ? 'domicilio' : 'recoger'}
                  </Text>
                </View>
              )}
            </View>

            <View style={{ flex: 0.65, marginTop: 40, marginLeft: 8 }}>
              {user?.DomicilioCarro ? (
                <View
                  style={{
                    flex: 0.65,
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}
                >
                  <Image
                    style={{
                      width: 120,
                      height: 80,
                      borderRadius: 20,
                      borderColor: Colors.gray,
                      borderWidth: 0.5,
                      marginLeft: 5
                    }}
                    source={images.campus}
                  />
                  <View
                    style={{
                      flexDirection: 'column',
                      marginLeft: 15
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: 'bold'
                      }}
                    >
                      Información
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                        color: Colors.grey1,
                        marginTop: 5
                      }}
                    >
                      {user?.DomicilioCarro
                        ? user?.direccion1
                        : rest?.Direccion}
                    </Text>
                    <TouchableOpacity
                      onPress={handlePresentModal}
                      style={styles.btnCambioUbi}
                    >
                      <Text
                        style={{
                          fontSize: 15,
                          marginLeft: 12,
                          marginRight: 12,
                          fontWeight: 'bold',
                          color: 'white'
                        }}
                      >
                        Cambiar ubicación
                      </Text>
                    </TouchableOpacity>

                    <BottomSheetModal
                      ref={bottomSheetModalRef}
                      index={0}
                      snapPoints={snapPoints}
                      backgroundStyle={{
                        borderRadius: 50
                      }}
                      onDismiss={() => setIsOpen(false)}
                    >
                      <View style={styles.contentContainer}>
                        <Text
                          style={[
                            styles.title,
                            {
                              marginBottom: 20,
                              marginTop: 10,
                              alignSelf: 'center'
                            }
                          ]}
                        >
                          Cambia tu ubicación
                        </Text>

                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 20,
                            marginLeft: 15
                          }}
                        >
                          <FontAwesome5
                            name='building'
                            size={15}
                            color={Colors.grey1}
                          />
                          <Text
                            style={{
                              marginLeft: 5,
                              fontSize: normalize(20),
                              color: Colors.grey1
                            }}
                          >
                            Edificio
                          </Text>
                        </View>

                        <SelectDropdown
                          data={edificios}
                          onSelect={(selectedItem, index) => {
                            console.log(selectedItem, index)
                            setLocationBuilding(selectedItem)
                          }}
                          defaultButtonText={'Selecciona un edificio'}
                          buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem
                          }}
                          rowTextForSelection={(item, index) => {
                            return item
                          }}
                          buttonStyle={styles.dropdown1BtnStyle}
                          buttonTextStyle={styles.dropdown1BtnTxtStyle}
                          renderDropdownIcon={isOpened => {
                            return (
                              <FontAwesome
                                name={isOpened ? 'chevron-up' : 'chevron-down'}
                                color={Colors.darkBlue}
                                size={18}
                              />
                            )
                          }}
                          dropdownIconPosition={'right'}
                          dropdownStyle={styles.dropdown1DropdownStyle}
                          rowStyle={styles.dropdown1RowStyle}
                          rowTextStyle={styles.dropdown1RowTxtStyle}
                          selectedRowStyle={styles.dropdown1SelectedRowStyle}
                          search
                          searchInputStyle={
                            styles.dropdown1searchInputStyleStyle
                          }
                          searchPlaceHolder={'Busca aquí'}
                          searchPlaceHolderColor={'darkgrey'}
                          renderSearchInputLeftIcon={() => {
                            return (
                              <FontAwesome
                                name={'search'}
                                color={Colors.darkBlue}
                                size={18}
                              />
                            )
                          }}
                        />

                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 20,
                            marginLeft: 15
                          }}
                        >
                          <MaterialIcons
                            name='description'
                            size={15}
                            color={Colors.grey1}
                          />
                          <Text
                            style={{
                              marginLeft: 5,
                              fontSize: normalize(20),
                              color: Colors.grey1
                            }}
                          >
                            Descripción
                          </Text>
                        </View>

                        <TextInput
                          placeholder='Ingresa una descripción'
                          style={styles.textDescription}
                          value={locationDescription}
                          onChangeText={text => setLocationDescription(text)}
                        />

                        <TouchableOpacity
                          style={styles.btnCambioUbi2}
                          onPress={() => {
                            changeUserDirection()
                          }}
                        >
                          <Text
                            style={{
                              fontSize: normalize(18),
                              fontWeight: 'bold',
                              color: 'white',
                              textAlign: 'center',
                              padding: 10
                            }}
                          >
                            Guardar Cambios
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </BottomSheetModal>
                  </View>
                </View>
              ) : (
                <View
                  style={{
                    flex: 0.65,
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}
                >
                  <Image
                    style={{
                      width: 120,
                      height: 80,
                      borderRadius: 20,
                      borderColor: Colors.gray,
                      borderWidth: 0.5,
                      marginLeft: 5
                    }}
                    source={{ uri: rest?.Imagen }}
                  />
                  <View
                    style={{
                      flexDirection: 'column',
                      marginLeft: 15
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: 'bold'
                      }}
                    >
                      {rest?.Nombre}
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                        color: Colors.grey1,
                        marginTop: 5
                      }}
                    >
                      {rest?.Localización}
                    </Text>
                  </View>
                </View>
              )}
            </View>
          </View>

          <View
            style={{
              flex: 0.23,
              marginTop: 20,
              marginLeft: 7,
              marginRight: 7,
              borderBottomColor: '#E7E7E7',
              borderBottomWidth: 1
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                marginLeft: 8
              }}
            >
              {' '}
              Método de pago
            </Text>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 30
              }}
              onPress={() =>
                navigation.navigate('MyCard', { reorder: reorder })
              }
            >
              <View style={{ flex: 0.8, flexDirection: 'row' }}>
                <TouchableOpacity style={styles.btnTarjeta}>
                  <Image
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20
                    }}
                    source={images.tarjeta}
                  />
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: 'column',
                    marginLeft: 15
                  }}
                >
                  <Text
                    style={{
                      fontSize: 19,
                      fontWeight: 'bold'
                    }}
                  >
                    Tarjeta
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      color: Colors.grey1,
                      marginTop: 5,
                      fontWeight: 'bold'
                    }}
                  >
                    {selectedCard?.NumeroTarjeta
                      ? '*****' +
                        selectedCard?.NumeroTarjeta?.substring(
                          selectedCard?.NumeroTarjeta?.length - 3
                        )
                      : 'Seleccionar tarjeta'}
                  </Text>
                  {/* <Text style={{ fontSize: 15, color: Colors.grey1, marginTop: 5, fontWeight: 'bold' }}>{selectedCard?.NumeroTarjeta}</Text> */}
                </View>
              </View>
              <View style={{ flex: 0.2, alignItems: 'center' }}>
                <Ionicons
                  style={{ alignContent: 'flex-end' }}
                  name='chevron-forward-outline'
                  size={25}
                  color='black'
                />
              </View>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flex: 0.29,
              marginTop: 20,
              marginLeft: 7,
              marginRight: 7
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                marginLeft: 8
              }}
            >
              {' '}
              Resumen
            </Text>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <View style={{ flex: 0.7, justifyContent: 'center' }}>
                <Text style={styles.costos}>Costo de los productos</Text>
              </View>
              <View
                style={{
                  flex: 0.3,
                  marginLeft: 10,
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                  paddingRight: 30
                }}
              >
                <Text style={styles.valores}>{currencyFormat(total)}</Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <View style={{ flex: 0.7, justifyContent: 'center' }}>
                <Text style={styles.costos}>Costo de envío</Text>
              </View>
              <View
                style={{
                  flex: 0.3,
                  marginLeft: 10,
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                  paddingRight: 30
                }}
              >
                <Text style={styles.valores}>$0.00</Text>
              </View>
            </View>
          </View>

          <View
            style={{
              flex: 0.13,
              flexDirection: 'row',
              borderTopColor: '#E7E7E7',
              borderTopWidth: 1
            }}
          >
            <View
              style={{
                flex: 0.6,
                flexDirection: 'column',
                justifyContent: 'center'
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  marginLeft: 20,
                  color: Colors.grey1
                }}
              >
                Total a pagar
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  marginLeft: 22,
                  marginTop: 2
                }}
              >
                {currencyFormat(total)}
              </Text>
            </View>

            {selectedCard ? (
              <View style={styles.btnPedido}>
                <TouchableOpacity
                  onPress={() => {
                    payCart()
                  }}
                >
                  <Text style={styles.textPedido}> Realizar pedido </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.btnPedidoV}>
                <Text style={styles.textPedido}> Realizar pedido </Text>
              </View>
            )}
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
  btnAtas: {
    marginLeft: 25,
    backgroundColor: '#E7E7E7',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    height: 30,
    width: 30
  },
  textCheckOut: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white'
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
    color: 'white',
    padding: 10
  },
  btnCambioUbi: {
    backgroundColor: Colors.primary,
    borderRadius: 50,
    padding: 4,
    marginTop: 15,
    alignItems: 'center'
  },
  btnTarjeta: {
    marginLeft: 10,
    backgroundColor: '#E7EDF1',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    height: 50,
    width: 50
  },
  costos: {
    fontSize: normalize(17),
    color: 'black',
    padding: 10
  },
  valores: {
    fontSize: 18,
    color: 'black',
    padding: 10,
    fontWeight: 'bold'
  },
  btnPedido: {
    backgroundColor: Colors.primary1,
    borderRadius: 30,
    margin: 15,
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnPedidoV: {
    backgroundColor: Colors.grey1,
    borderRadius: 30,
    margin: 15,
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textPedido: {
    fontSize: 16,
    marginLeft: 12,
    marginRight: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white'
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 15
  },
  title: {
    fontWeight: '900',
    letterSpacing: 0.5,
    fontSize: 18
  },
  contenedorDrop: {
    borderRadius: 50
  },
  dropdown1BtnStyle: {
    width: '95%',
    height: 50,
    backgroundColor: Colors.light,
    borderRadius: 15,
    marginTop: 10,
    alignSelf: 'center'
  },
  dropdown1BtnTxtStyle: {
    color: Colors.grey,
    textAlign: 'left',
    fontSize: normalize(16)
  },
  dropdown1DropdownStyle: {
    backgroundColor: '#EFEFEF',
    borderRadius: 15,
    marginTop: 15,
    height: 300
  },
  dropdown1RowStyle: {
    backgroundColor: '#EFEFEF',
    borderBottomColor: '#C5C5C5'
  },
  dropdown1RowTxtStyle: {
    color: '#444',
    textAlign: 'left',
    fontSize: normalize(16)
  },
  dropdown1SelectedRowStyle: { backgroundColor: 'rgba(0,0,0,0.1)' },
  dropdown1searchInputStyleStyle: {
    backgroundColor: '#EFEFEF',
    borderRadius: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#444'
  },
  textDescription: {
    width: '95%',
    height: 50,
    backgroundColor: Colors.light,
    borderRadius: 15,
    marginTop: 10,
    alignSelf: 'center',
    fontSize: normalize(18),
    textAlign: 'left',
    padding: 15,
    color: Colors.grey
  },
  btnCambioUbi2: {
    backgroundColor: Colors.primary,
    borderRadius: 15,
    padding: 4,
    marginTop: 25,
    alignItems: 'center',
    justifyContent: 'center',
    width: '95%',
    alignSelf: 'center'
  }
})
