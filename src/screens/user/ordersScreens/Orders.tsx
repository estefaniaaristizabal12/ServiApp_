import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
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

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export const Orders = ({ navigation }) => {
  const isFocused = useIsFocused()
  const { top: paddingTop } = useSafeAreaInsets()

  const [orders, setOrders] = React.useState<any>([])
  const [user, setUser] = React.useState<any>(null)
  
  React.useEffect(() => {
    getUser()
    if (isFocused) {
      getOrders()
    }
  }, [isFocused])

  const getUser = async () => {
    AsyncStorage.getUser()
      .then(data => {
        setUser(data)
      })
      .catch(error => {
        console.error(error)
      })
  }

  const getOrders = async () => {
    UserService.getOrders('Usuario', 2, user?.uid)
      .then(data => {
        const newData = data.map((order: any) => {
          order.Fecha = new Date(order.Fecha).toLocaleDateString('es-ES')
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
      <View style={{ flex: 0.2 }}>
        <Text style={styles.textoInicio}>Historial de</Text>
        <Text style={styles.textoInicio2}>pedidos</Text>
        <Text style={styles.textoDescripcion}>
          Encuentra aquí tus pedidos y servicios anteriores
        </Text>
      </View>

      <View
        style={{
          flex: 0.8,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          backgroundColor: 'white'
        }}
      >
        <FlatList
          data={orders}
          renderItem={({ item }) => (
            <CardOrder item={item} navigation={navigation} />
          )}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  textoInicio: {
    fontSize: normalize(35),
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
    marginLeft: 20
  },
  textoInicio2: {
    fontSize: normalize(35),
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 20
  },
  textoDescripcion: {
    marginLeft: 20,
    marginTop: 20,
    fontSize: normalize(18),
    color: 'white'
  }
})
