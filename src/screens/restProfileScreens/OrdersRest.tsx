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
  } from 'react-native';
  import { Colors } from '../../constants/colors';
  // import { Ionicons } from '@expo/vector-icons';
  import * as React from 'react';
  import SegmentedControl from '@react-native-segmented-control/segmented-control';
  import { CardOrderDelivery } from '../../components/CardOrderDelivery';
  import { useIsFocused } from "@react-navigation/native";
  import * as UserService from '../../services/UserService';
  import * as AsyncStorage from '../../services/AsyncStorage';
  import { initializeApp } from 'firebase/app';
  import { firebaseConfig } from '../firebaseConfig';
  const app = initializeApp(firebaseConfig);
  import { getDatabase, onValue, ref, update } from 'firebase/database'
  const db = getDatabase(app);
  
  
  
  const InitialMenu = ({ navigation }) => {
  
    const [tabIndex, setTabIndex] = React.useState(0);
    const isFocused = useIsFocused()
    const [orders, setOrders] = React.useState<any>([]);
    const [delivery, setDelivery] = React.useState<any>([]);
    const [user, setUser] = React.useState<any>(null);
  
    React.useEffect(() => {
      if (isFocused) {
        getOrders();
        getUser();
      }
    }, [isFocused]);
  
    const getOrders = async () => {
      UserService.getOrders("Restaurante", 2, "-1")
        .then(data => {
          let orders = []
          let delivery = []
          data.map((order: any) => {
            order.Fecha = new Date(order.Fecha).toLocaleDateString('es-ES')
            const statusRef = ref(db, 'ordenes/' + order.id);
            onValue(statusRef, (snapshot) => {
              const data = snapshot.val();
              order.Estado = (data.estado);
            });
            if (order.Estado == -1) {
              return
            }
            if (order.Domicilio == "1") {
              delivery.push(order)
            } else {
              orders.push(order)
            }
          })
          // console.log(delivery.length)
          setOrders(orders)
          setDelivery(delivery)
        })
        .catch(error => {
          console.error("getOrders: ", error)
        });
    };
  
  
    const getUser = async () => {
      AsyncStorage.getUser()
        .then(data => {
          setUser(data);
        })
        .catch((error) => {
          console.error(error)
        });
    }
  
    const CRYPTOCURRENCIES = [
      {
        id:1,
        name:"Processed",
        cryptobalance:"3.5290123123 BTC",
        actualbalance:"$19.53",
        percentage:"+ 4.32%",
        difference:"$ 5.44",
        decreased:true,
        imgsrc: require('../../../assets/salad.png'),
      },
      {
        id:2,
        name:"Active",
        cryptobalance:"3.5290123123 ETH",
        actualbalance:"$19.53",
        percentage:"+ 4.32%",
        difference:"$ 5.44",
        decreased:false,
        imgsrc: require('../../../assets/salad.png'),
      },
    ];
  
    const renderHeader = () => {
      return (
        <View style={styles.headerbar}>
          <Text style={{ fontSize: 25, fontWeight: "300", color: Colors.black , letterSpacing: 0.5}}>Hola,</Text>
          <Text style={{ fontSize: 30, fontWeight: "900", color: Colors.black,letterSpacing: 0.5 }}>{user?.nombrecliente}</Text>
        </View>
      );
    };
  
    const SegmentedCont = () => {
      return (
        <View style={styles.box}>
          <SegmentedControl
            values={['Recogida', 'Domiciliario']}
            selectedIndex={0}
            style={{ height: 38 }}
            onChange={(event) => {
              setTabIndex(event.nativeEvent.selectedSegmentIndex);
            }}
          />
        </View>
      );
    };
  
    const renderBody = () => {
      return(
        <View style={{marginTop:10,backgroundColor:"#F5F8FF",overflow:"hidden",marginBottom:100}}>
          <FlatList
            data={tabIndex == 1 ? delivery : orders}
            style={{height:(Dimensions.get('window').height/2)+60}}
            ItemSeparatorComponent = {()=><View style={{marginVertical:8}}></View>}
            renderItem={({item})=> <CardOrderDelivery item={item} /> }
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            
         />
        </View>
      );
    };
  
  
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
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      height: "100%",
      backgroundColor: '#F5F8FF',
    },
    headerbar: {
      paddingTop: 80,
      paddingBottom: 20,
      paddingHorizontal: 30,
      flexDirection: "column",
      backgroundColor: "#fff",
      marginBottom: 20
    },
    box: {
      marginHorizontal: 16,
      marginVertical: 16,
    },
  });
  
  
  
  export default InitialMenu;