import { Ionicons } from '@expo/vector-icons'
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import {
  Alert,
  FlatList, Image, StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { normalize } from '../../../../FontNormalize'
import AcompProd from '../../../components/AcompProd'
import { Colors } from '../../../constants/colors'
import * as AsyncStorage from '../../../services/AsyncStorage'
import * as UserService from '../../../services/UserService'
import { firebaseConfig } from '../../firebaseConfig'
import { CheckBox } from 'react-native-elements'

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export const Product = ({ navigation, route }) => {
  const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(0)
  const { top: paddingTop } = useSafeAreaInsets()
  const [count, setCount] = useState(1)
  const onPressPlus = () => setCount(prevCount => prevCount + 1)
  const onPressRest = () => setCount(prevCount => prevCount - 1)

  const [selectedProduct, setSelectedProduct] = React.useState<any>(null)
  const [selectedRestaurant, setSelectedRestaurant] = React.useState<any>(null)
  const [additions, setAdditions] = React.useState<any>(null)
  const [selectedAdditions, setSelectedAdditions] = React.useState<any>([])
  const [delivery, setDelivery] = React.useState<any>(null)
  const [user, setUser] = React.useState<any>(null)

  // const {cambioNombre} = useContext(CartContext);

  useEffect(() => {
    AsyncStorage.getUser().then((user) => {
      setUser(user)
    })
    let { selectedProduct, selectedRestaurant, additions, delivery } =
      route.params

    selectedProduct && setSelectedProduct(selectedProduct)
    selectedRestaurant && setSelectedRestaurant(selectedRestaurant)
    additions && setAdditions(additions)
    delivery && setDelivery(delivery)
  }, [])

  const addAddition = (prod: any) => {
    if (selectedAdditions.includes(prod)) {
      const newAdds = selectedAdditions.filter((add: any) => {
        return add != prod
      })
      setSelectedAdditions(newAdds)
      console.log("newAdds", newAdds)
      return
    }
    setSelectedAdditions([...selectedAdditions, prod])
    console.log("newAdds", [...selectedAdditions, prod])
  }

  const addProdCart = async () => {
    const prodId = selectedProduct?.id
    const cant = count
    const restId = selectedRestaurant?.id
    const deliv = delivery ? 1 : 0
    const uid = user?.uid
    console.log(prodId, cant, restId, deliv, uid)

    await UserService.addProdCart(prodId, cant, restId, deliv, uid)
      .then(res => {
        if (res.status == 302) {
          Alert.alert(res.msg)
        }
      })
      .catch(error => console.error("addprod", error))
    if (selectedAdditions.length > 0) {
      for (const add of selectedAdditions) {
        console.log("adduid", add)
        await UserService.addProdCart(add, 1, restId, deliv, uid)
          .then((res) => {
            if (res.status == 302) {
              Alert.alert(res.msg)
            }
            console.log(res)
          })
          .catch(error => console.error("addaddition", error))
      }
    }
    navigation.navigate('CartStack', { screen: 'Cart' })
  }

  return (
    <View
      style={{
        flex: 1,
        paddingTop,
        flexDirection: 'column',
        backgroundColor: Colors.grey
      }}
    >
      <View style={{ flex: 0.08, alignItems: 'center' }}>
        {/* <Button title="cambioNombre" onPress={cambioNombre}/> */}

        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ flex: 0.5 }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Restaurant')}
              style={styles.btnAtas}
            >
              <Ionicons name="arrow-back" size={25} color={Colors.gray} />
            </TouchableOpacity>
          </View>

          <View
            style={{
              flex: 0.5,
              alignItems: 'flex-end',
              marginRight: 25
            }}
          >
            <TouchableOpacity
              onPress={() => navigation.navigate('CartStack')}
              style={styles.btnAtas}
            >
              <Ionicons name="cart" size={22} color={Colors.gray} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.componente2}>
        <View style={{ flex: 0.2, flexDirection: 'row' }}>
          <View style={{ flex: 0.7 }}>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={styles.tituloProd}
            >
              {selectedProduct?.Nombre}
            </Text>
            <Text
              numberOfLines={3}
              ellipsizeMode="tail"
              style={styles.descrProd}
            >
              {selectedProduct?.Descripcion}
            </Text>
            <Text style={styles.preProd}> $ {selectedProduct?.Precio}</Text>
          </View>
          <View style={{ flex: 0.3, alignItems: 'center', justifyContent: "center" }}>
            <Image
              style={styles.logo}
              source={{ uri: selectedProduct?.Imagen }}
            />
          </View>
        </View>



        {((selectedProduct?.Categoria != 6) && (selectedProduct?.Categoria != 3)) ?
          <View style={{ flex: 0.8, backgroundColor: "white" }}>
            <View
              style={{
                flex: 0.15,
                flexDirection: 'row',
                borderBottomWidth: StyleSheet.hairlineWidth,
                borderBottomColor: '#E7E7E7',
                borderTopWidth: StyleSheet.hairlineWidth,
                borderTopColor: '#E7E7E7',
                marginTop: 20
              }}
            >
              <View style={{ flex: 0.7 }}>
                <Text style={styles.acompanamientos}>Acompaña tu órden con</Text>
              </View>
              <View style={{ flex: 0.3, paddingRight: 10 }}>
                <Text style={styles.sugerido}>Sugerido</Text>
              </View>
            </View>
            <View style={{ flex: 0.85 }}>
              <FlatList
                data={additions}
                renderItem={({ item }) => (
                  <AcompProd
                    title={item.Nombre}
                    precio={item.Precio}
                    id={item.id}
                    addAddition={addAddition}
                  />
                )}

              />
              {/* <Text> Hola {checked}</Text> */}
              {/* {checked==true? <Text> Hola</Text>: <Text> Perro hpta</Text>} */}
            </View>
          </View> :
          <Text></Text>
        }

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
              addProdCart()
            }}
          >
            <Text style={styles.textBtnCarro}>
              Agregar ${selectedProduct?.Precio}{' '}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  logo: {
    width: '100%',
    height: 120,
    borderRadius: 10,
    marginLeft: 3
  },
  componente2: {
    flex: 0.92,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: 'white',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15
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
  acompanamientos: {
    fontSize: normalize(18),
    marginTop: 25,
    fontWeight: 'bold'
  },
  sugerido: {
    backgroundColor: 'rgba(204, 44, 42, 0.42)',
    fontSize: normalize(15),
    padding: 5,
    borderRadius: 5,
    marginTop: 20,
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: 'rgba(204, 44, 42, 0.42)',
    overflow: 'hidden',
    textAlign: 'center',
    color: '#CC2C2A'
  },
  boton: {
    height: 55,
    borderRadius: 15,
    width: '100%',
    backgroundColor: '#CC2C2A',
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  sortBtn: {
    width: 50,
    height: 50,
    marginLeft: 10,
    backgroundColor: Colors.primary1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
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
  btnAtas: {
    marginLeft: 25,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    height: 30,
    width: 30
  },
  categoriesListContainer: {
    paddingVertical: 30,
    alignItems: 'center',
    paddingHorizontal: 20
  },
  categoryBtn: {
    height: 45,
    width: 165,
    marginRight: 7,
    borderRadius: 30,
    alignItems: 'center',
    paddingHorizontal: 5,
    flexDirection: 'row'
  },
  categoryBtnImgCon: {
    height: 35,
    width: 35,
    backgroundColor: Colors.white1,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  item: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    marginVertical: 6,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E7E7E7'
  },
  titulo: {
    fontSize: normalize(18),
    color: '#000000'
  },
  precio: {
    fontSize: normalize(17),
    fontWeight: 'bold',
    marginTop: 10
  }
})
