import React from 'react'
import { FlatList, StyleSheet, Text, View, Image } from 'react-native';
import CardOrder from '../../../components/CardOrder'
import { Colors } from '../../../constants/colors'
// import orders from '../../constants/orders'
import { useIsFocused } from '@react-navigation/native'
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { normalize } from '../../../../FontNormalize'
import * as AsyncStorage from '../../../services/AsyncStorage'
import * as UserService from '../../../services/UserService'
import { firebaseConfig } from '../../firebaseConfig'
import { images } from '../../../../images';

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export const Orders = ({ navigation }) => {
  const isFocused = useIsFocused()
  const { top: paddingTop } = useSafeAreaInsets()

  const [orders, setOrders] = React.useState<any>([])
  const [user, setUser] = React.useState<any>(null)
  const [vacio, setVacio] = React.useState(true)

  React.useEffect(() => {
    if (isFocused) {
      getUser()
    }
  }, [isFocused])

  const getUser = async () => {
    AsyncStorage.getUser()
      .then(data => {
        setUser(data)
        getOrders(data)
      })
      .catch(error => {
        console.error(error)
      })
  }

  const getOrders = async (user: any) => {
    UserService.getOrders('Usuario', 2, user.uid)
      .then(data => {
        // console.log(JSON.stringify(data) )
        if (JSON.stringify(data) === '[]') {
          setVacio(true)
        } else {
          setVacio(false)
        }

        const newData = data.map((order: any) => {
          order.FechaFormated = new Date(order.Fecha).toLocaleDateString('es-ES')
          return order
        })
        setOrders(newData)
      })
      .catch(error => {
        console.error('getOrders: ', error)
      })
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
      <View style={{ flex: 0.13, justifyContent:"center"}}>
        <Text style={styles.textoInicio}>Historial de Pedidos</Text>
        {/* <Text style={styles.textoDescripcion}>
          Encuentra aquí tus pedidos y servicios anteriores
        </Text> */}
      </View>



      <View
        style={{
          flex: 0.87,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          backgroundColor: 'white'
        }}
      >
        {!vacio ? (
          <FlatList
            data={orders}
            renderItem={({ item }) => (
              <CardOrder item={item} navigation={navigation} />
            )}
          />

        ) :
          (
            <View style={{ alignItems: 'center' }}>
              <Image
                style={{
                  width: 230,
                  height: 230,
                  marginTop: 35,
                  borderRadius: 5
                }}
                source={images.historialVacio}
              />
              <Text
                style={{
                  fontSize: normalize(20),
                  fontWeight: 'bold',
                  color: Colors.grey1
                }}
              >
                {' '}
                Aún no has realizado alguna compra{' '}
              </Text>
            </View>

          )}

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  textoInicio: {
    fontSize: normalize(30),
    fontWeight: 'bold',
    color: 'white',
    textAlign:"center"
  },
  textoInicio2: {
    fontSize: normalize(25),
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 20
  },
  textoDescripcion: {
    marginLeft: 20,
    marginTop: 10,
    fontSize: normalize(18),
    color: 'white'
  }
})
