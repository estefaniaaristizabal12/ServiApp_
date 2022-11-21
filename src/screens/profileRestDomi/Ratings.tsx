import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native'
import { Colors } from '../../constants/colors'
// import { Ionicons } from '@expo/vector-icons';
import SegmentedControl from '@react-native-segmented-control/segmented-control'
import * as React from 'react'
import { CardOrderNew } from '../../components/CardOrderNew'
// import { BottomSheetModal, BottomSheetModalProvider, BottomSheetFlatList } from '@gorhom/bottom-sheet';
import {
  BottomSheetModal,
  BottomSheetModalProvider
} from '@gorhom/bottom-sheet'
import { useIsFocused } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { CardOrderBottom } from '../../components/CardOrderBottom'
import { firebaseConfig } from '../firebaseConfig'

import { getDatabase } from 'firebase/database'
import * as AsyncStorage from '../../services/AsyncStorage'
import * as UserService from '../../services/UserService'
import * as RestaurantService from '../../services/RestaurantService'

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getDatabase(app)

const Ratings = ({ navigation, route }) => {
  const [tabIndex, setTabIndex] = React.useState(0)
  const isFocused = useIsFocused()
  const bottomSheetModalRef = React.useRef(null)
  const [isOpen, setIsOpen] = React.useState(false)
  const [orders, setOrders] = React.useState<any>([])
  const [user, setUser] = React.useState<any>(null)
  const [rest, setRest] = React.useState<any>(null)
  const [totals, setTotals] = React.useState<any>(null)
  const [selectedOrder, setSelectedOrder] = React.useState<any>(null)
  const [ordersQ, setOrdersQ] = React.useState<any>({
    q0: [],
    q1: [],
    q2: []
  })
  const [domiciliary, setDomiciliary] = React.useState<any>(null)

  const snapPoints = ['80%']

  React.useEffect(() => {
    if (isFocused) {
      console.log('Ratings', route.params.domiciliary)
      setDomiciliary(route.params.domiciliary)
      AsyncStorage.getUser()
        .then(user => {
          setUser(user)
          getOrders(user)
          if (user.Rol == 'Restaurante') getRestaurant(user.Restaurante)
        })
        .catch(error => console.error(error))
    }
  }, [isFocused])

  const getRestaurant = async (idRest: any) => {
    const rest = await RestaurantService.getRestaurant(idRest).catch(error =>
      console.error(error)
    )
    setRest(rest)
  }

  const getOrders = async (user: any) => {
    const role = domiciliary == true ? 'Domiciliario' : 'Restaurante'
    UserService.getOrders(role, 2, role == "Domiciliario"? user.uid: user.Restaurante)
      .then(data => {
        let q0 = []
        let q1 = []
        let q2 = []
        data.forEach((order: any) => {
          order.Fecha = new Date(order.Fecha).toLocaleDateString('es-ES')
          if (JSON.stringify(order.Resena) == '{}') return
          if (0 <= order.Resena.Calificacion && order.Resena.Calificacion <= 3)
            q0.push(order)
          else if (
            3 <= order.Resena.Calificacion &&
            order.Resena.Calificacion <= 4
          )
            q1.push(order)
          else q2.push(order)
          order.RestauranteImagen = order.Restaurante.Imagen
        })
        const newOrdersQ = {
          q0: q0,
          q1: q1,
          q2: q2
        }
        const newOrdersQtotal = {
          q0: q0.length,
          q1: q1.length,
          q2: q2.length
        }
        console.log('_--------_-', newOrdersQtotal)
        setOrdersQ(newOrdersQ)
      })
      .catch(error => {
        console.error('getOrders: ', error)
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
          {user?.Rol == 'Restaurante'
            ? 'Restaurante ' + user?.Restaurante! + ','
            : user?.nombrecliente! + ', '}
        </Text>
        <Text
          style={{
            fontSize: 30,
            fontWeight: '900',
            color: Colors.black,
            letterSpacing: 0.5
          }}
        >
          Calificaciones
        </Text>
      </View>
    )
  }

  const SegmentedCont = () => {
    return (
      <View style={styles.box}>
        <SegmentedControl
          values={['0-3 ☆', '3-4 ☆', '5 ☆']}
          selectedIndex={0}
          style={{ height: 40, backgroundColor: '#DAF7FE' }}
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
          marginTop: 20,
          overflow: 'hidden',
          marginBottom: 10,
          marginHorizontal: 5
        }}
      >
        <FlatList
          data={
            tabIndex == 0 ? ordersQ.q0 : tabIndex == 1 ? ordersQ.q1 : ordersQ.q2
          }
          style={{ height: Dimensions.get('window').height / 2 + 80 }}
          ItemSeparatorComponent={() => (
            <View style={{ marginVertical: -5 }}></View>
          )}
          renderItem={({ item }) => (
            <CardOrderNew item={item} onPress={() => {}} />
          )}
          keyExtractor={item => item.id}
        />
      </View>
    )
  }

  const renderBodyBotton = () => {
    return (
      <View
        style={{
          marginTop: 20,
          overflow: 'hidden',
          marginBottom: -20,
          marginHorizontal: 5,
          width: '100%'
        }}
      >
        <FlatList
          // data={CRYPTOCURRENCIES}
          data={
            selectedOrder
              ? Object.keys(selectedOrder?.Carro).map(key => {
                  return {
                    id: key,
                    ...selectedOrder?.Carro[key]
                  }
                })
              : []
          }
          // data={selectedOrder? Object.values(selectedOrder?.Carro): []}

          style={{ height: Dimensions.get('window').height / 2 }}
          ItemSeparatorComponent={() => (
            <View style={{ marginVertical: -5 }}></View>
          )}
          renderItem={({ item }) => (
            <CardOrderBottom item={item} onPress={handlePresentModal} />
          )}
          keyExtractor={(item: any) => item.id}
        />
      </View>
    )
  }

  return (
    <BottomSheetModalProvider>
      <View
        style={[
          styles.container,
          { backgroundColor: isOpen ? 'gray' : '#fff' }
        ]}
      >
        {/* Header */}
        {renderHeader()}

        {/* Segmented Control */}
        {SegmentedCont()}

        {/* Body */}
        {renderBody()}

        {/* <Button title="Present Modal" onPress={handlePresentModal} /> */}
        <StatusBar style='auto' />

        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          backgroundStyle={{ borderRadius: 50 }}
          onDismiss={() => setIsOpen(false)}
        >
          <View style={styles.contentContainer}>
            <Text style={[styles.title, { marginBottom: 20, marginTop: 10 }]}>
              {/* Pedido #{selectedOrder?.id.substring(0, 5)} */}
            </Text>
            <Text style={styles.description}>
              Pedido Domicilio | Edificio Ingenieria
            </Text>
            {renderBodyBotton()}
            {/* {renderBodyProfile()} */}
          </View>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%'
    // backgroundColor: '#F5F8FF',
  },
  headerbar: {
    paddingTop: 80,
    paddingBottom: 2,
    paddingHorizontal: 30,
    flexDirection: 'column',
    // backgroundColor: "#fff",
    marginBottom: 20
  },
  box: {
    marginHorizontal: 18,
    marginVertical: 18
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 15
  },
  title: {
    fontWeight: '900',
    letterSpacing: 0.5,
    fontSize: 18
  },
  description: {
    color: '#56636F',
    fontSize: 13,
    fontWeight: 'normal',
    width: '100%',
    textAlign: 'center'
  },
  iconAceptar: {
    borderRadius: 50,
    color: '#C2FBB7'
  },
  iconRechazar: {
    borderRadius: 50,
    color: '#FE9186'
  }
})

export default Ratings
