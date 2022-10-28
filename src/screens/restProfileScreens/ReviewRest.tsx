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
    Button,
  } from 'react-native';
  import { Colors } from '../../constants/colors';
  // import { Ionicons } from '@expo/vector-icons';
  import * as React from 'react';
  import SegmentedControl from '@react-native-segmented-control/segmented-control';
  import { CardOrderNew } from '../../components/CardOrderNew';
  // import { BottomSheetModal, BottomSheetModalProvider, BottomSheetFlatList } from '@gorhom/bottom-sheet';
  import { StatusBar } from "expo-status-bar";
  import { BottomSheetModal, BottomSheetModalProvider, BottomSheetFlatList } from '@gorhom/bottom-sheet';
  import { CardOrderBottom } from '../../components/CardOrderBottom';
  import { useIsFocused } from "@react-navigation/native";
  import * as UserService from '../../services/UserService';
  import * as AsyncStorage from '../../services/AsyncStorage';
  import { initializeApp } from 'firebase/app';
  import { getAuth } from 'firebase/auth';
  import { firebaseConfig } from '../firebaseConfig';
  import { CustomCardNew } from '../../components/CustomCardNew';
  import { Ionicons, MaterialIcons } from '@expo/vector-icons';
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  import { getDatabase, onValue, ref, update } from 'firebase/database'
  import { Alert } from 'react-native';
  const db = getDatabase(app);
  
  
  
  const ReviewRest = ({ navigation }) => {
  
  
  
  
    const isFocused = useIsFocused()
    const bottomSheetModalRef = React.useRef(null);
    const [isOpen, setIsOpen] = React.useState(false);
    const [orders, setOrders] = React.useState<any>([]);
    const [user, setUser] = React.useState<any>(null);
    const [totales, setTotales] = React.useState<any>(null);
    const [selectedOrder, setSelectedOrder] = React.useState<any>(null);
  
    const snapPoints = ["80%"];
  
  
  
  
    React.useEffect(() => {
      if (isFocused) {
        getOrders();
        getUser();
      }
    }, [isFocused]);
  
    const getOrders = async () => {
      UserService.getOrders("Restaurante","2", user.uid)
        .then(data => {
          console.log("asdfsda getorders", data.length)
          const newData = data.map((order: any) => {
            if (order.Estado == -2) {
              return
            }
            order.Fecha = new Date(order.Fecha).toLocaleDateString('es-ES')
            const statusRef = ref(db, 'ordenes/' + order.id);
            onValue(statusRef, (snapshot) => {
              const data = snapshot.val();
              order.Estado = (data.estado);
            });
            return order
          })
          const newOrders = newData.filter((order: any) => order.Estado == 0 && order.Domicilio == "1")
          // const newOrders = newData.filter((order: any) => order)
          let pick = 0;
          let del = 0;
          let total = newOrders.length
          newOrders.map((order: any) => order.Domicilio=="1" ? del++ : pick++)
          setTotales({ total: total, pick: pick, del: del })
          setOrders(newOrders)
        })
        .catch(error => {
          console.error("getOrders: ", error)
        });
    };
  
  
    const getUser = async () => {
      AsyncStorage.getUser()
        .then(data => {
          setUser(data);
          console.log("sdklñfja getUser", data.uid)
        })
        .catch((error) => {
          console.error(error)
        });
    }
  
    const acceptOrder =  () => {
      const statusRef = ref(db, 'ordenes/' + selectedOrder?.id);
      update(statusRef, {
        estado: 1,
      });
      const newOrders = orders.filter((order: any) => order.id !== selectedOrder?.id)
      let pick = totales.pick;
      let del = totales.del;
      let total = totales.total - 1;
      selectedOrder?.Domicilio == "1" ? del-- : pick--
      setTotales({ total: total, pick: pick, del: del })
      setOrders(newOrders)
      setSelectedOrder(null)
      setIsOpen(false)
      Alert.alert("Orden aceptada")
      bottomSheetModalRef.current.close()
      // navigation.navigate("InitialMenu")
    }
  
    const rejectOrder = () => {
        // todo
    //   const statusRef = ref(db, 'ordenes/' + selectedOrder?.id);
    //   update(statusRef, {
    //     estado: -2,
    //   });
    //   const newOrders = orders.filter((order: any) => order.id !== selectedOrder?.id)
    //   let pick = totales.pick;
    //   let del = totales.del;
    //   let total = totales.total - 1;
    //   selectedOrder?.Domicilio == "1" ? del-- : pick--
    //   setTotales({ total: total, pick: pick, del: del })
    //   setOrders(newOrders)
      setSelectedOrder(null)
      setIsOpen(false)
      Alert.alert("Orden rechazada")
      bottomSheetModalRef.current.close()
      navigation.navigate("InitialMenu")
    }
  
    function handlePresentModal() {
      bottomSheetModalRef.current?.present();
      setTimeout(() => {
        setIsOpen(true);
      }, 100);
    }
  
    const CRYPTOCURRENCIES = [
      {
        id: 1,
        name: "Processed",
        cryptobalance: "3.5290123123 BTC",
        actualbalance: "$19.53",
        percentage: "+ 4.32%",
        difference: "$ 5.44",
        decreased: true,
        imgsrc: require('../../../assets/salad.png'),
      },
      {
        id: 2,
        name: "Active",
        cryptobalance: "3.5290123123 ETH",
        actualbalance: "$19.53",
        percentage: "+ 4.32%",
        difference: "$ 5.44",
        decreased: false,
        imgsrc: require('../../../assets/salad.png'),
      },
      {
        id: 3,
        name: "Processed",
        cryptobalance: "3.5290123123 BTC",
        actualbalance: "$19.53",
        percentage: "+ 4.32%",
        difference: "$ 5.44",
        decreased: true,
        imgsrc: require('../../../assets/salad.png'),
      },
      {
        id: 4,
        name: "Active",
        cryptobalance: "3.5290123123 ETH",
        actualbalance: "$19.53",
        percentage: "+ 4.32%",
        difference: "$ 5.44",
        decreased: false,
        imgsrc: require('../../../assets/salad.png'),
      },
  
    ];
  
    const renderHeader = () => {
      return (
        <View style={styles.headerbar}>
          <Text style={{ fontSize: 25, fontWeight: "300", color: Colors.black, letterSpacing: 0.5 }}>Domicilios</Text>
          <Text style={{ fontSize: 30, fontWeight: "900", color: Colors.black, letterSpacing: 0.5 }}>Disponibles</Text>
        </View>
      );
    };
  
    const SegmentedCont = () => {
      return (
        <View style={styles.box}>
          <View style={{ flexDirection: "column", alignItems: "center" }}>
            <Text style={{ color: '#4CAF50', fontWeight: "400", fontSize: 15, marginBottom: 2, marginTop: 10 }}>Pedidos</Text>
            <Text style={{ color: '#4CAF50', fontWeight: "400", fontSize: 15, marginBottom: 10 }}>{totales?.total}</Text>
          </View>
          <View style={{ flexDirection: "column", alignItems: "center" }}>
            <Text style={{ color: '#4CAF50', fontWeight: "400", fontSize: 15, marginBottom: 2, marginTop: 10 }}>Domiciliario</Text>
            <Text style={{ color: '#4CAF50', fontWeight: "400", fontSize: 15, marginBottom: 10, }}>{totales?.del}</Text>
          </View>
          <View style={{ flexDirection: "column", alignItems: "center" }}>
            <Text style={{ color: '#4CAF50', fontWeight: "400", fontSize: 15, marginBottom: 2, marginTop: 10 }}>Recogida</Text>
            <Text style={{ color: '#4CAF50', fontWeight: "400", fontSize: 15, marginBottom: 10, }}>{totales?.pick}</Text>
          </View>
        </View>
      );
    };
  
    const renderBody = () => {
      return (
        <View style={{ marginTop: 20, overflow: "hidden", marginBottom: 10, marginHorizontal: 5 }}>
          <FlatList
            data={orders}
            style={{ height: (Dimensions.get('window').height / 2) + 80 }}
            ItemSeparatorComponent={() => <View style={{ marginVertical: -5 }}></View>}
            renderItem={({ item }) => <CardOrderNew item={item} onPress={() => {setSelectedOrder(item); handlePresentModal()}}/>}
            keyExtractor={(item) => item.id}
          />
        </View>
      );
    };
  
  
    const renderBodyBotton = () => {
      return (
        <View style={{ marginTop: 20, overflow: "hidden", marginBottom: -20, marginHorizontal: 5, width: "100%" }}>
          <FlatList
            // data={CRYPTOCURRENCIES}
            data={selectedOrder? Object.keys(selectedOrder?.Carro).map((key) => {return {id: key, ...selectedOrder?.Carro[key]}}): []}
            // data={selectedOrder? Object.values(selectedOrder?.Carro): []}
  
            style={{ height: (Dimensions.get('window').height / 2) }}
            ItemSeparatorComponent={() => <View style={{ marginVertical: -5 }}></View>}
            renderItem={({ item }) =>
              <CardOrderBottom item={item} onPress={handlePresentModal} />}
            keyExtractor={(item:any) => item.id}
          />
        </View>
      );
    };
  
  
    const renderBodyProfile = () => {
      return (
        <View style={{ overflow: "hidden", marginBottom: 30, marginHorizontal: 5, width: "100%" }}>
          <CustomCardNew style={{ backgroundColor: "#fff", borderRadius: 10 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ flex: 2, marginLeft: 15, marginRight: 8, marginTop: 20 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between"}}>
                  <Image source={require('../../../assets/robot.png')} style={{ width: 50, height: 50, borderRadius: 50, marginBottom: 30 }} />
                  <View style={{ flexDirection: "column", marginTop: 3}}>
                    <Text style={{ fontWeight: "600", color: Colors.LIGHTBLACK, marginBottom: 5 }}>{selectedOrder?.Usuario.nombrecliente}</Text>
                    <Text style={{ color: Colors.LIGHTGREY, fontWeight: "600" }}>{selectedOrder?.Direccion}</Text>
                  </View>
                  <Ionicons name="checkmark-circle-sharp" size={40} style={styles.iconAceptar} onPress={()=>{acceptOrder()}}></Ionicons>
                  <Ionicons name="close-circle-sharp" size={40} style={styles.iconRechazar}  onPress={()=>{rejectOrder()}}></Ionicons>
                </View>
              </View>
            </View >
          </CustomCardNew >
        </View >
      );
    };
  
  
  
    return (
      <BottomSheetModalProvider>
        <View
          style={[styles.container, { backgroundColor: isOpen ? "gray" : "#fff" },]}
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
              <Text style={[styles.title, { marginBottom: 20, marginTop: 10 }]}>Pedido #{selectedOrder?.id.substring(0,5)}</Text>
              <Text style={styles.description}>
                Pedido {selectedOrder?.Domicilio == '1' ? "Domicilio": "Recogida"}    |   {selectedOrder?.Direccion}
              </Text>
              {renderBodyBotton()}
              {renderBodyProfile()}
  
            </View>
          </BottomSheetModal>
        </View>
      </BottomSheetModalProvider>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      height: "100%",
      // backgroundColor: '#F5F8FF',
    },
    headerbar: {
      paddingTop: 80,
      paddingBottom: 10,
      paddingHorizontal: 30,
      flexDirection: "column",
      // backgroundColor: "#fff",
      marginBottom: 20
    },
    box: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      marginHorizontal: 36,
      backgroundColor: "#F0F9F1",
      borderRadius: 12,
  
    },
    contentContainer: {
      flex: 1,
      alignItems: "center",
      paddingHorizontal: 15,
    },
    title: {
      fontWeight: "900",
      letterSpacing: 0.5,
      fontSize: 18,
    },
    description: {
      color: "#56636F",
      fontSize: 13,
      fontWeight: "normal",
      width: "100%",
      textAlign: "center",
    },
    iconAceptar: 
    {
      borderRadius: 50,
      color: "#C2FBB7",
    },
    iconRechazar: 
      {
        borderRadius: 50,
        color: "#FE9186",
      },
  });
  
  
  
  export default ReviewRest;
  