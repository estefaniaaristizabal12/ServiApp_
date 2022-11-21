import {
  Dimensions, FlatList, Image,
  StyleSheet, Text, View
} from 'react-native'
import { Colors } from '../../constants/colors'
// import { Ionicons } from '@expo/vector-icons';
import * as React from 'react'
import { CardOrderNew } from '../../components/CardOrderNew'
// import { BottomSheetModal, BottomSheetModalProvider, BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { Ionicons } from '@expo/vector-icons'
import {
  BottomSheetModal,
  BottomSheetModalProvider
} from '@gorhom/bottom-sheet'
import { useIsFocused } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import {
  getDatabase,
  onChildAdded,
  onChildChanged,
  onChildRemoved, orderByChild,
  query,
  ref,
  update
} from 'firebase/database'
import { Alert } from 'react-native'
import { images } from '../../../images'
import { CardOrderBottom } from '../../components/CardOrderBottom'
import { CustomCardNew } from '../../components/CustomCardNew'
import * as AsyncStorage from '../../services/AsyncStorage'
import * as NotificationService from '../../services/NotificationService'
import * as UserService from '../../services/UserService'
import { firebaseConfig } from '../firebaseConfig'
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getDatabase(app)

const Requests = ({ navigation }) => {
  const isFocused = useIsFocused()
  const bottomSheetModalRef = React.useRef(null)
  const [isOpen, setIsOpen] = React.useState(false)
  const [orders, setOrders] = React.useState<any>({})
  const [ordersIds, setOrdersIds] = React.useState<any>(new Set())
  const [user, setUser] = React.useState<any>(null)
  const [totals, setTotals] = React.useState<any>({
    total: 0,
    del: 0,
    pick: 0
  })
  const [selectedOrder, setSelectedOrder] = React.useState<any>(null)

  const snapPoints = ['80%']

  React.useEffect(() => {
    if (isFocused) {
      console.log('ReviewRest')
      AsyncStorage.getUser()
        .then(user => {
          setUser(user)
          getNotAcceptedOrders(user)
        })
        .catch(error => console.error(error))
    }
  }, [isFocused])

  const getNotAcceptedOrders = async (user: any) => {
    UserService.getRejectedOrders(user?.uid).then((data: any) => {
      const rejected = new Set(data)
      const dbRef = query(ref(db, 'Ordenes/'), orderByChild('timestamp'))
      let ordersRt = {}
      onChildAdded(dbRef, order => {
        const newOrder = { id: order.key, ...order.val() }
        if (
          newOrder.Estado != 0 ||
          !newOrder.Domicilio ||
          rejected.has(newOrder.id)
        )
          return
        ordersRt[order.key] = newOrder
        setOrders(ordersRt)
        countOrders(ordersRt)
      })
      onChildChanged(dbRef, order => {
        const newOrder = { id: order.key, ...order.val() }
        if (
          newOrder.Estado != 0 ||
          !newOrder.Domicilio ||
          rejected.has(newOrder.id)
        )
          delete ordersRt[order.key]
        else ordersRt[order.key] = newOrder
        setOrders(ordersRt)
        countOrders(ordersRt)
      })
      onChildRemoved(dbRef, order => {
        delete ordersRt[order.key]
        setOrders(ordersRt)
        countOrders(ordersRt)
      })
      countOrders(ordersRt)
    })
  }

  const countOrders = (orders: any) => {
    let newTotals = { total: 0, del: 0, pick: 0 }
    if ('{}' == JSON.stringify(orders)) {
      setTotals(newTotals)
      return
    }
    newTotals.total = Object.values(orders).length
    Object.values(orders).forEach((order: any) => {
      order.Domicilio ? newTotals.del++ : newTotals.pick++
    })
    setTotals(newTotals)
  }

  const selectOrder = async (order: any) => {
    UserService.getOrder(order.id)
      .then((data: any) => {
        setSelectedOrder(data)
      })
      .catch((error: any) => {
        console.error(error)
      })
  }

  const acceptOrder = () => {
    UserService.acceptOrder(selectedOrder?.id, user.uid)
      .then((data: any) => {
        console.log(data)
        const statusRef = ref(db, 'Ordenes/' + selectedOrder?.id)
        update(statusRef, {
          Estado: 1
        })
        //send notification to user
        UserService.getUser(selectedOrder?.Usuario).then((orderUser: any) => {
          NotificationService.sendOrderStatusUpdate(
            orderUser.DeviceToken,
            '¡El domiciliario va a recoger tu pedido! 👌'
          )
            .then(data => console.log(data))
            .catch(error => console.error(error))
        })
      })
      .catch((error: any) => {
        console.error(error)
      })
    setSelectedOrder(null)
    setIsOpen(false)
    Alert.alert('Orden aceptada')
    bottomSheetModalRef.current.close()
  }

  const rejectOrder = () => {
    UserService.rejectOrder(selectedOrder?.id, user.uid)
      .then((data: any) => {
        console.log(data)
      })
      .catch((error: any) => {
        console.error(error)
      })
    setSelectedOrder(null)
    setIsOpen(false)
    Alert.alert('Orden rechazada')
    bottomSheetModalRef.current.close()
    // ERROR:
    navigation.navigate('Orders')
  }

  function handlePresentModal() {
    bottomSheetModalRef.current?.present()
    setTimeout(() => {
      setIsOpen(true)
    }, 100)
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
          Hola domiciliario
        </Text>
        <Text
          style={{
            fontSize: 30,
            fontWeight: '900',
            color: Colors.black,
            letterSpacing: 0.5
          }}
        >
          {user?.nombrecliente}
        </Text>

        <Text
          style={{
            fontSize: 18,
            fontWeight: '200',
            color: Colors.black,
            letterSpacing: 0.5,
            marginTop:15
          }}>
          Acá encontrarás los pedidos disponibles</Text>
      </View>
    )
  }

  const SegmentedCont = () => {
    return (
      <View style={styles.box}>
        <View style={{ flexDirection: 'column', alignItems: 'center' }}>
          <Text
            style={{
              color: '#4CAF50',
              fontWeight: '400',
              fontSize: 15,
              marginBottom: 2,
              marginTop: 10
            }}
          >
            Pedidos
          </Text>
          <Text
            style={{
              color: '#4CAF50',
              fontWeight: '400',
              fontSize: 15,
              marginBottom: 10
            }}
          >
            {totals?.total}
          </Text>
        </View>
        <View style={{ flexDirection: 'column', alignItems: 'center' }}>
          <Text
            style={{
              color: '#4CAF50',
              fontWeight: '400',
              fontSize: 15,
              marginBottom: 2,
              marginTop: 10
            }}
          >
            Domiciliario
          </Text>
          <Text
            style={{
              color: '#4CAF50',
              fontWeight: '400',
              fontSize: 15,
              marginBottom: 10
            }}
          >
            {totals?.del}
          </Text>
        </View>
        <View style={{ flexDirection: 'column', alignItems: 'center' }}>
          <Text
            style={{
              color: '#4CAF50',
              fontWeight: '400',
              fontSize: 15,
              marginBottom: 2,
              marginTop: 10
            }}
          >
            Recogida
          </Text>
          <Text
            style={{
              color: '#4CAF50',
              fontWeight: '400',
              fontSize: 15,
              marginBottom: 10
            }}
          >
            {totals?.pick}
          </Text>
        </View>
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
          data={Object.values(orders)}
          style={{ height: Dimensions.get('window').height / 2 + 80 }}
          ItemSeparatorComponent={() => (
            <View style={{ marginVertical: -5 }}></View>
          )}
          renderItem={({ item }) => (
            <CardOrderNew
              item={item}
              onPress={() => {
                selectOrder(item)
                handlePresentModal()
              }}
            />
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
          // data={selectedOrder!}
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

  const renderBodyProfile = () => {
    return (
      <View
        style={{
          overflow: 'hidden',
          marginBottom: 30,
          marginHorizontal: 5,
          width: '100%'
        }}
      >
        <CustomCardNew style={{ backgroundColor: '#fff', borderRadius: 10 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                flex: 2,
                marginLeft: 15,
                marginRight: 8,
                marginTop: 20
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }}
              >
                <Image
                  source={images.robot}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 50,
                    marginBottom: 30
                  }}
                />
                <View
                  style={{
                    flexDirection: 'column',
                    marginTop: 3
                  }}
                >
                  <Text
                    style={{
                      fontWeight: '600',
                      color: Colors.LIGHTBLACK,
                      marginBottom: 5
                    }}
                  >
                    {selectedOrder?.UsuarioInfo.nombrecliente}
                  </Text>
                  <Text
                    style={{
                      color: Colors.LIGHTGREY,
                      fontWeight: '600'
                    }}
                  >
                    {selectedOrder?.Direccion}
                  </Text>
                </View>
                <Ionicons
                  name="checkmark-circle-sharp"
                  size={40}
                  style={styles.iconAceptar}
                  onPress={() => {
                    acceptOrder()
                  }}
                ></Ionicons>
                <Ionicons
                  name="close-circle-sharp"
                  size={40}
                  style={styles.iconRechazar}
                  onPress={() => {
                    rejectOrder()
                  }}
                ></Ionicons>
              </View>
            </View>
          </View>
        </CustomCardNew>
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
        <StatusBar style="auto" />

        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          backgroundStyle={{ borderRadius: 50 }}
          onDismiss={() => setIsOpen(false)}
        >
          <View style={styles.contentContainer}>
            <Text style={[styles.title, { marginBottom: 20, marginTop: 10 }]}>
              Pedido #{selectedOrder?.id.substring(0, 5)}
            </Text>
            <Text style={styles.description}>
              Pedido{' '}
              {selectedOrder?.Domicilio == '1' ? 'Domicilio' : 'Recogida'} |{' '}
              {selectedOrder?.Direccion}
            </Text>
            {renderBodyBotton()}
            {renderBodyProfile()}
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
    paddingBottom: 10,
    paddingHorizontal: 30,
    flexDirection: 'column',
    // backgroundColor: "#fff",
    marginBottom: 20
  },
  box: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginHorizontal: 36,
    backgroundColor: '#F0F9F1',
    borderRadius: 12
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

export default Requests
