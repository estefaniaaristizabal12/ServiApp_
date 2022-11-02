import {
  View,
  Text,
  BackHandler,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Button
} from 'react-native'
import { Colors } from '../../constants/colors'
// import { Ionicons } from '@expo/vector-icons';
import * as React from 'react'
import SegmentedControl from '@react-native-segmented-control/segmented-control'
import { CardOrderNew } from '../../components/CardOrderNew'
// import { BottomSheetModal, BottomSheetModalProvider, BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { StatusBar } from 'expo-status-bar'
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetFlatList
} from '@gorhom/bottom-sheet'
import { CardOrderBottom } from '../../components/CardOrderBottom'
import { useIsFocused } from '@react-navigation/native'
import * as UserService from '../../services/UserService'
import * as AsyncStorage from '../../services/AsyncStorage'
import * as NotificationService from '../../services/NotificationService'
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { firebaseConfig } from '../firebaseConfig'

import { CustomCardNew } from '../../components/CustomCardNew'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
import {
  getDatabase,
  onChildAdded,
  onChildChanged,
  onChildRemoved,
  onValue,
  orderByChild,
  query,
  ref,
  update
} from 'firebase/database'
import { Alert } from 'react-native'
const db = getDatabase(app)

const AccountDeliv = ({ navigation }) => {
  const [tabIndex, setTabIndex] = React.useState(0)
  const isFocused = useIsFocused()
  const bottomSheetModalRef = React.useRef(null)
  const [isOpen, setIsOpen] = React.useState(false)
  const [orders, setOrders] = React.useState<any>([])
  const [user, setUser] = React.useState<any>(null)
  const [totals, setTotals] = React.useState<any>(null)
  const [selectedOrder, setSelectedOrder] = React.useState<any>(null)


  const snapPoints = ['80%']

  const CRYPTOCURRENCIES = [
    {
      id: 1,
      name: 'Processed',
      cryptobalance: '3.5290123123 BTC',
      actualbalance: '$19.53',
      percentage: '+ 4.32%',
      difference: '$ 5.44',
      decreased: true,
      imgsrc: require('../../../assets/salad.png')
    },
    {
      id: 2,
      name: 'Active',
      cryptobalance: '3.5290123123 ETH',
      actualbalance: '$19.53',
      percentage: '+ 4.32%',
      difference: '$ 5.44',
      decreased: false,
      imgsrc: require('../../../assets/salad.png')
    },
    {
      id: 3,
      name: 'Processed',
      cryptobalance: '3.5290123123 BTC',
      actualbalance: '$19.53',
      percentage: '+ 4.32%',
      difference: '$ 5.44',
      decreased: true,
      imgsrc: require('../../../assets/salad.png')
    },
    {
      id: 4,
      name: 'Active',
      cryptobalance: '3.5290123123 ETH',
      actualbalance: '$19.53',
      percentage: '+ 4.32%',
      difference: '$ 5.44',
      decreased: false,
      imgsrc: require('../../../assets/salad.png')
    }
  ]

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
          Mirador,
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

  // const SegmentedCont = () => {
  //   return (
  //     <View style={styles.box}>
  //       <View style={{ flexDirection: 'column', alignItems: 'center' }}>
  //         <Text
  //           style={{
  //             color: '#4CAF50',
  //             fontWeight: '400',
  //             fontSize: 15,
  //             marginBottom: 2,
  //             marginTop: 10
  //           }}
  //         >
  //           Pedidos
  //         </Text>
  //         <Text
  //           style={{
  //             color: '#4CAF50',
  //             fontWeight: '400',
  //             fontSize: 15,
  //             marginBottom: 10
  //           }}
  //         >
  //           {totals?.total}
  //         </Text>
  //       </View>
  //       <View style={{ flexDirection: 'column', alignItems: 'center' }}>
  //         <Text
  //           style={{
  //             color: '#4CAF50',
  //             fontWeight: '400',
  //             fontSize: 15,
  //             marginBottom: 2,
  //             marginTop: 10
  //           }}
  //         >
  //           Domiciliario
  //         </Text>
  //         <Text
  //           style={{
  //             color: '#4CAF50',
  //             fontWeight: '400',
  //             fontSize: 15,
  //             marginBottom: 10
  //           }}
  //         >
  //           {totals?.del}
  //         </Text>
  //       </View>
  //       <View style={{ flexDirection: 'column', alignItems: 'center' }}>
  //         <Text
  //           style={{
  //             color: '#4CAF50',
  //             fontWeight: '400',
  //             fontSize: 15,
  //             marginBottom: 2,
  //             marginTop: 10
  //           }}
  //         >
  //           Recogida
  //         </Text>
  //         <Text
  //           style={{
  //             color: '#4CAF50',
  //             fontWeight: '400',
  //             fontSize: 15,
  //             marginBottom: 10
  //           }}
  //         >
  //           {totals?.pick}
  //         </Text>
  //       </View>
  //     </View>
  //   )
  // }

  const SegmentedCont = () => {
    return (
      <View style={styles.box}>
        <SegmentedControl
          values={['0-3 ☆', '3-4 ☆', '5 ☆']}
          selectedIndex={0}
          style={{ height: 40, backgroundColor: "#DAF7FE" }}
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
          data={Object.values(orders)}
          style={{ height: Dimensions.get('window').height / 2 + 80 }}
          ItemSeparatorComponent={() => (
            <View style={{ marginVertical: -5 }}></View>
          )}
          renderItem={({ item }) => (
            <CardOrderNew
              item={item}
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
        {/* {renderBody()} */}

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

export default AccountDeliv
