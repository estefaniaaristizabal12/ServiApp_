import {
  Dimensions, FlatList, StyleSheet, Text, View
} from 'react-native'
import { Colors } from '../../constants/colors'
// import { Ionicons } from '@expo/vector-icons';
import SegmentedControl from '@react-native-segmented-control/segmented-control'
import { useIsFocused } from '@react-navigation/native'
import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
import * as React from 'react'
import { CardOrderDelivery } from '../../components/CardOrderDelivery'
import * as AsyncStorage from '../../services/AsyncStorage'
import * as UserService from '../../services/UserService'
import { firebaseConfig } from '../firebaseConfig'
const app = initializeApp(firebaseConfig)
const db = getDatabase(app)

const Orders = ({ navigation, route }) => {
  const [tabIndex, setTabIndex] = React.useState(0)
  const isFocused = useIsFocused()
  const [finished, setFinished] = React.useState<any>([])
  const [delivery, setDelivery] = React.useState<any>([])
  const [user, setUser] = React.useState<any>(null)

  React.useEffect(() => {
    if (isFocused) {
      console.log('OrdersRest')
      AsyncStorage.getUser()
        .then(user => {
          setUser(user)
          getOrders(user)
        })
        .catch(error => console.error(error))
    }
  }, [isFocused])

  const getOrders = async (user: any) => {
    UserService.getOrders('Domiciliario', 1, user.uid)
      .then(data => {
        let delivery = []
        let finished = []
        data.forEach((order: any) => {
          order.Fecha = new Date(order.Fecha).toLocaleDateString('es-ES')
          // const statusRef = ref(db, 'Ordenes/' + order.id);
          // onValue(statusRef, (snapshot) => {
          //   const data = snapshot.val();
          //   order.Estado = (data.estado);
          // });
          order.Finalizado ? finished.push(order) : delivery.push(order)
        })
        setDelivery(delivery)
        setFinished(finished)
      })
      .catch(error => {
        console.error('getOrders: ', error)
      })
  }

  const goToChangeStatusOrder = (order: any) => {
    UserService.getOrder(order.id).then((data: any) => {
      navigation.navigate('ChangeStatusOrder', { order: data })
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
          Hola domi,
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
      </View>
    )
  }

  const SegmentedCont = () => {
    return (
      <View style={styles.box}>
        <SegmentedControl
          values={['Domicilios', 'Finalizados']}
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
          data={tabIndex == 0 ? delivery : finished}
          style={{ height: Dimensions.get('window').height / 2 + 60 }}
          ItemSeparatorComponent={() => (
            <View style={{ marginVertical: 8 }}></View>
          )}
          renderItem={({ item }) => 
          <CardOrderDelivery 
            item={item} 
            onPress={() => {
              goToChangeStatusOrder(item)
            }}
          />}
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
