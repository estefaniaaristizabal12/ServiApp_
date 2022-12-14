import { AntDesign, Ionicons } from '@expo/vector-icons'
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import React, { useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { normalize } from '../../../../FontNormalize'
import { images } from '../../../../images'
import { Colors } from '../../../constants/colors'
import * as UserService from '../../../services/UserService'
import { firebaseConfig } from '../../firebaseConfig'

export const ServiceOrder = ({ navigation, route }) => {
  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app)

  const [defaultRating, setDefaultRating] = useState(0)
  const [comment, setComment] = useState('')
  const [maxRating, setmaxRating] = useState([1, 2, 3, 4, 5])

  //Botones de seleccion
  const [click1, setClick1] = useState(false)
  const [click2, setClick2] = useState(false)
  const [click3, setClick3] = useState(false)
  const [click4, setClick4] = useState(false)
  const [click5, setClick5] = useState(false)
  const [click6, setClick6] = useState(false)
  const [click7, setClick7] = useState(false)
  const [click8, setClick8] = useState(false)


  const [order, setOrder] = React.useState<any>(null)

  const cambio = () =>{
    setClick1(false);
    setClick2(false);
    setClick3(false);
    setClick4(false);
    setClick5(false);
    setClick6(false);
    setClick7(false);
    setClick8(false);
  }

  const rateOrder = async () => {
    navigation.navigate('OrdersStack', { screen: 'Orders' })
    UserService.rateOrder(
      order.id,
      defaultRating,
      comment,
      auth.currentUser.uid
    )
      .then(data => {
        console.log(data)
      })
      .catch(error => console.error(error))
  }

  React.useEffect(() => {
    let { order } = route.params
    order.Fecha = new Date(order.Fecha).toLocaleString('es-ES')
    order && setOrder(order)
    if (order.Resena?.Calificacion) setDefaultRating(order.Resena.Calificacion)
  }, [])

  const renderSendRateButton = () => {
    if (defaultRating == 0 || (comment == '' && defaultRating != 5)) {
      return (
        <View
          style={{
            flex: 0.2,
            justifyContent: 'center',
            alignContent: 'center'
          }}
        >
          <TouchableOpacity
            style={{
              marginHorizontal: 2,
              marginRight: 3,
              alignItems: 'center',
              backgroundColor: Colors.grey,
              borderRadius: 50
            }}
          >
            <Text
              style={{
                fontSize: normalize(22),
                fontWeight: 'bold',
                color: 'white',
                padding: 15
              }}
            >
              {defaultRating == 1 || defaultRating == 2
                ? 'Reportar inconveniente'
                : 'Enviar rese??a'}
            </Text>
          </TouchableOpacity>
        </View>
      )
    } else {
      return (
        <View
          style={{
            flex: 0.2,
            justifyContent: 'center',
            alignContent: 'center'
          }}
        >
          <TouchableOpacity
            style={{
              marginHorizontal: 2,
              marginRight: 3,
              alignItems: 'center',
              backgroundColor: Colors.primary1,
              borderRadius: 50
            }}
            onPress={() => {
              rateOrder()
            }}
          >
            <Text
              style={{
                fontSize: normalize(22),
                fontWeight: 'bold',
                color: 'white',
                padding: 15
              }}
            >
              {defaultRating == 1 || defaultRating == 2
                ? 'Reportar inconveniente'
                : 'Enviar rese??a'}
            </Text>
          </TouchableOpacity>
        </View>
      )
    }
  }

  const { top: paddingTop } = useSafeAreaInsets()
  return (
    <View
      style={{
        flex: 1,
        paddingTop,
        flexDirection: 'column',
        backgroundColor: Colors.grey
      }}
    >
      <View style={{ flex: 0.2 }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('OrdersStack', { screen: 'Orders' })}
          style={styles.btnAtas}
        >
          <Ionicons name="arrow-back" size={25} color={Colors.gray} />
        </TouchableOpacity>

        <Text style={styles.textoInicio}>Restaurante La Central{order?.Restaurante?.Nombre}</Text>
        <Text style={styles.textoFecha}>{order?.Fecha}</Text>
      </View>
      <View
        style={{
          flex: 0.8,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          backgroundColor: 'white',
          padding: 10
        }}
      >
        <View style={{ flex: 0.1, justifyContent: 'center' }}>
          <Text style={styles.titServicio}>??C??mo te pareci?? el servicio?</Text>
        </View>

        <View style={styles.calification}>
          {maxRating.map((item, key) => {
            return (
              <TouchableOpacity
                activeOpacity={0.7}
                key={item}
                onPress={() => {
                  cambio()
                  setDefaultRating(item)
                  setComment('')
                }}
              >
                {item <= defaultRating ? (
                  <AntDesign
                    style={{ marginHorizontal: 3 }}
                    name="star"
                    size={40}
                    color={
                      ((defaultRating == 5 || defaultRating == 4) &&
                        '#7ED957') ||
                      (defaultRating == 3 && '#FFBD59') ||
                      ((defaultRating == 2 || defaultRating == 1) && 'red')
                    }
                  />
                ) : (
                  <AntDesign
                    style={{ marginHorizontal: 3 }}
                    name="staro"
                    size={40}
                    color={
                      ((defaultRating == 5 || defaultRating == 4) &&
                        '#7ED957') ||
                      (defaultRating == 3 && '#FFBD59') ||
                      ((defaultRating == 2 || defaultRating == 1) && 'red')
                    }
                  />
                )}
              </TouchableOpacity>
            )
          })}
        </View>

        <View style={styles.calification2}>
          {defaultRating == 1 && (
            <View style={{ flex: 1, flexDirection: 'column' }}>
              <View style={{ flex: 0.2 }}>
                <Text style={styles.tituloRese}>??Oh no!, ??Algo sali?? mal?</Text>
              </View>

              <View style={{ flex: 0.8, flexDirection: 'row' }}>
                <View style={{ flex: 0.33, alignItems: 'center' }}>
                  <TouchableOpacity
                    style={click1?styles.background1:styles.background2}
                    onPress={() => {
                      cambio()
                      setClick1(true)
                      setComment('Tard?? mucho en llegar')
                      
                    }}
                  >
                    <Image
                      style={{ height: 50, width: 50 }}
                      source={images.tiempoT}
                    />
                    <Text style={styles.descripcionRese}>
                      Tard?? mucho en llegar
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{ flex: 0.33, alignItems: 'center' }}>
                  <TouchableOpacity
                    style={click2?styles.background1:styles.background2}
                    onPress={() => {
                      cambio()
                      setClick2(true)
                      setComment('Producto en p??simo estado')
                    }}
                  >
                    <Image
                      style={{ height: 50, width: 50 }}
                      source={images.productMal}
                    />
                    <Text style={styles.descripcionRese}>
                      Producto en p??simo estado
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{ flex: 0.33, alignItems: 'center' }}>
                  <TouchableOpacity
                    style={click3?styles.background1:styles.background2}
                    onPress={() => {
                      cambio()
                      setClick3(true)
                      setComment('Producto incompleto')
                    }}
                  >
                    <Image
                      style={{ height: 50, width: 50 }}
                      source={images.incompleto}
                    />
                    <Text style={styles.descripcionRese}>
                      Producto incompleto
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}

          {(defaultRating == 2 || defaultRating == 3) && (
            <View style={{ flex: 1, flexDirection: 'column' }}>
              <View style={{ flex: 0.2 }}>
                <Text style={styles.tituloRese}>??Oh!, ??Algo sali?? mal?</Text>
              </View>

              <View style={{ flex: 0.8, flexDirection: 'row' }}>
                <View style={{ flex: 0.33, alignItems: 'center' }}>
                  <TouchableOpacity
                    style={click4?styles.background1:styles.background2}
                    onPress={() => {
                      cambio()
                      setClick4(true)
                      setComment('Tard?? en llegar')
                    }}
                  >
                    <Image
                      style={{ height: 50, width: 50 }}
                      source={images.tiempoT}
                    />

                    <Text style={styles.descripcionRese}>Tard?? en llegar</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ flex: 0.33, alignItems: 'center' }}>
                  <TouchableOpacity
                    style={click5?styles.background1:styles.background2}
                    onPress={() => {
                      cambio()
                      setClick5(true)
                      setComment('Producto en mal estado')
                    }}
                  >
                    <Image
                      style={{ height: 50, width: 50 }}
                      source={images.productRegular}
                    />
                    <Text style={styles.descripcionRese}>
                      Producto en mal estado
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{ flex: 0.33, alignItems: 'center' }}>
                  <TouchableOpacity
                    style={click6?styles.background1:styles.background2}
                    onPress={() => {
                      cambio()
                      setClick6(true)
                      setComment('Producto incompleto')
                    }}
                  >
                    <Image
                      style={{ height: 50, width: 50 }}
                      source={images.incompletoR}
                    />
                    <Text style={styles.descripcionRese}>
                      Producto incompleto
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
          {defaultRating == 4 && (
            <View style={{ flex: 1, flexDirection: 'column' }}>
              <View style={{ flex: 0.2 }}>
                <Text style={styles.tituloRese}>
                  ??Bien! Pero a??n falta una estrella...
                </Text>
              </View>
              {/* <Text>Recomendaci??n:</Text> */}
              <View style={{ flex: 0.8, flexDirection: 'row' }}>
                <View style={{ flex: 0.5, alignItems: 'center' }}>
                  <TouchableOpacity
                    style={click7?styles.background1:styles.background2}
                    onPress={() => {
                      cambio()
                      setClick7(true)
                      setComment('Ser m??s r??pidos')
                    }}
                  >
                    <Image
                      style={{ height: 50, width: 50 }}
                      source={images.rapidez}
                    />
                    <Text style={styles.descripcionRese}>Ser m??s r??pidos</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ flex: 0.5, alignItems: 'center' }}>
                  <TouchableOpacity
                    style={click8?styles.background1:styles.background2}
                    onPress={() => {
                      cambio()
                      setClick8(true)
                      setComment('Ser m??s cuidadosos con los productos')
                    }}
                  >
                    <Image
                      style={{ height: 50, width: 50 }}
                      source={images.cuidadosos}
                    />
                    <Text style={styles.descripcionRese}>
                      Ser m??s cuidadosos con los productos
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
          {defaultRating == 5 && (
            <Text style={styles.tituloRese}>
              ??Excelente! Tuviste un gran servicio
            </Text>
          )}
        </View>

        {renderSendRateButton()}
      </View>

      {/* <Button title="Calificar" onPress={() => rateOrder(count)} /> */}
    </View>
  )
}
const styles = StyleSheet.create({
  textoInicio: {
    fontSize: normalize(30),
    fontWeight: 'bold',
    color: 'white',
    marginTop: 30,
    marginLeft: 20
  },
  textoFecha: {
    fontSize: normalize(18),
    color: 'white',
    marginTop: 10,
    marginLeft: 20,
    fontStyle: 'italic'
  },
  btnAtas: {
    marginLeft: 20,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    height: 30,
    width: 30
  },
  estrella: {
    marginHorizontal: 10,
    fontSize: normalize(10)
  },
  titServicio: {
    fontSize: normalize(22),
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 20
  },
  calification: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flex: 0.15,
    alignItems: 'center',
    marginLeft: 20
  },
  calification2: {
    justifyContent: 'flex-start',
    flexDirection: 'column',
    borderTopColor: Colors.grey1,
    borderTopWidth: 0.3,
    flex: 0.55
  },
  tituloRese: {
    fontSize: normalize(20),
    fontWeight: 'bold',
    color: 'black',
    marginTop: 20,
    marginLeft: 20
  },
  descripcionRese: {
    fontSize: normalize(18),
    color: 'black',
    marginTop: 10
  },
  background1:{
    backgroundColor:"#E6F1B9",
    marginHorizontal: 2,
    alignItems: 'center',
    padding:10,
    borderRadius:5
  },
  background2:{
    backgroundColor:"white",
    marginHorizontal: 2,
    alignItems: 'center',
    padding:10,
    borderRadius:5
  }

})
