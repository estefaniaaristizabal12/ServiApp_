import {
  Dimensions, FlatList, StyleSheet, Text, View
} from 'react-native'
import { Colors } from '../../constants/colors'
// import { Ionicons } from '@expo/vector-icons';
import SegmentedControl from '@react-native-segmented-control/segmented-control'
import { useIsFocused } from '@react-navigation/native'
import { initializeApp } from 'firebase/app'
import * as React from 'react'
import { CardOrderDelivery } from '../../components/CardOrderDelivery'
import * as AsyncStorage from '../../services/AsyncStorage'
import * as RestaurantService from '../../services/RestaurantService'
import * as UserService from '../../services/UserService'
import { firebaseConfig } from '../firebaseConfig'
import {
  getDatabase, onValue, ref,
  update
} from 'firebase/database'
const app = initializeApp(firebaseConfig)
const db = getDatabase(app)

const Orders = ({ navigation }) => {
  const [tabIndex, setTabIndex] = React.useState(0)
  const isFocused = useIsFocused()
  const [finished, setFinished] = React.useState<any>([])
  const [orders, setOrders] = React.useState<any>([])
  const [delivery, setDelivery] = React.useState<any>([])
  const [user, setUser] = React.useState<any>(null)

  React.useEffect(() => {
    if (isFocused) {
      console.log('Orders')
      AsyncStorage.getUser()
        .then(user => {
          RestaurantService.getRestaurant(user.Restaurante)
            .then(rest => {
              user.Restaurante = { id: user.Restaurante, ...rest }
            })
            .catch(error => console.error(error))
          setUser(user)
          getOrders(user)
        })
        .catch(error => console.error(error))
    }
  }, [isFocused])

  const getOrders = async (user: any) => {
    UserService.getOrders('Restaurante', 2, user.Restaurante)
      .then(data => {
        let finished = []
        let delivery = []
        let orders = []
        data.forEach((order: any) => {
          order.Fecha = new Date(order.Fecha).toLocaleDateString('es-ES')
          if (order.Aceptado) {
            if (order.Finalizado) finished.push(order)
            else order.Domicilio ? delivery.push(order) : orders.push(order)
          }
        })
        setDelivery(delivery)
        setOrders(orders)
        setFinished(finished)
      })
      .catch(error => {
        console.error('getOrders: ', error)
      })
  }

  const goToChangeStatusOrder = (order: any) => {
    UserService.getOrder(order.id).then((data: any) => {
      console.log(data.Domicilio)
      data.Domicilio
        ? navigation.navigate('ChangeStatusOrder', { order: data })
        : navigation.navigate('ChangeStatusOrderPickup', { order: data })
    })
  }

  const renderHeader = () => {
    return (
      <View style={styles.headerbar}>
        <Text
          style={{
            fontSize: 25,
            fontWeight: '300',
            color: Colors.black,
            letterSpacing: 0.5
          }}
        >
          Órdenes
          {/* Hola Restaurante {user?.Restaurante?.Nombre}, */}
        </Text>
        <Text
          style={{
            fontSize: 30,
            fontWeight: '900',
            color: Colors.black,
            letterSpacing: 0.5
          }}
        >
          En curso
          {/* {user?.nombrecliente} */}
        </Text>
      </View>
    )
  }

  const SegmentedCont = () => {
    return (
      <View style={styles.box}>
        <SegmentedControl
          values={['Recogida', 'Domiciliario', 'Finalizados']}
          selectedIndex={0}
          style={{ height: 38 }}
          onChange={event => {
            setTabIndex(event.nativeEvent.selectedSegmentIndex)
          }}
        />
      </View>
    )
  }

  const renderBody = () => {
    return (
      <View
        style={{
          marginTop: 10,
          backgroundColor: '#F5F8FF',
          overflow: 'hidden',
          marginBottom: 100
        }}
      >
        <FlatList
          data={tabIndex == 1 ? delivery : tabIndex == 2 ? finished : orders}
          style={{ height: Dimensions.get('window').height / 2 + 60 }}
          ItemSeparatorComponent={() => (
            <View style={{ marginVertical: 8 }}></View>
          )}
          renderItem={({ item }) => (
            <CardOrderDelivery
              item={item}
              onPress={() => {
                goToChangeStatusOrder(item)
              }}
            />
          )}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      {renderHeader()}
      <View style={{ marginHorizontal: 20 }}>
        {/* SegmentedControl */}
        {SegmentedCont()}
        {/* Body */}
        {renderBody()}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#F5F8FF'
  },
  headerbar: {
    paddingTop: 80,
    paddingBottom: 20,
    paddingHorizontal: 30,
    flexDirection: 'column',
    backgroundColor: '#fff',
    marginBottom: 20
  },
  box: {
    marginHorizontal: 16,
    marginVertical: 16
  }
})

export default Orders
