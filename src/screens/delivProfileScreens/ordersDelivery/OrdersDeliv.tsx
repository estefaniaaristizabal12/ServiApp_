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
import { Colors } from '../../../constants/colors';
// import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { CardOrderNew } from '../../../components/CardOrderNew';
// import { BottomSheetModal, BottomSheetModalProvider, BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { StatusBar } from "expo-status-bar";
import { BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import { CardOrderBottom } from '../../../components/CardOrderbottom';





const OrdersDeliv = ({ navigation }) => {


  const [tabIndex, setTabIndex] = React.useState(0);
  const bottomSheetModalRef = React.useRef(null);
  const [isOpen, setIsOpen] = React.useState(false);

  const snapPoints = ["80%"];

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
      imgsrc: require('../../../../assets/salad.png'),
    },
    {
      id: 2,
      name: "Active",
      cryptobalance: "3.5290123123 ETH",
      actualbalance: "$19.53",
      percentage: "+ 4.32%",
      difference: "$ 5.44",
      decreased: false,
      imgsrc: require('../../../../assets/salad.png'),
    },
    {
      id: 3,
      name: "Processed",
      cryptobalance: "3.5290123123 BTC",
      actualbalance: "$19.53",
      percentage: "+ 4.32%",
      difference: "$ 5.44",
      decreased: true,
      imgsrc: require('../../../../assets/salad.png'),
    },
    {
      id: 4,
      name: "Active",
      cryptobalance: "3.5290123123 ETH",
      actualbalance: "$19.53",
      percentage: "+ 4.32%",
      difference: "$ 5.44",
      decreased: false,
      imgsrc: require('../../../../assets/salad.png'),
    },
    
  ];

  const renderHeader = () => {
    return (
      <View style={styles.headerbar}>
        <Text style={{ fontSize: 25, fontWeight: "300", color: Colors.black, letterSpacing: 0.5}}>Pedidos</Text>
        <Text style={{ fontSize: 30, fontWeight: "900", color: Colors.black , letterSpacing: 0.5}}>Disponibles</Text>
      </View>
    );
  };

  const SegmentedCont = () => {
    return (
      <View style={styles.box}>
        <View style={{flexDirection: "column", alignItems: "center"}}>
        <Text style={{ color:'#4CAF50', fontWeight: "400", fontSize: 15, marginBottom: 2, marginTop: 10}}>Pedidos</Text>
        <Text style={{ color:'#4CAF50', fontWeight: "400", fontSize: 15, marginBottom: 10}}>10</Text>
        </View>
        <View style={{flexDirection: "column", alignItems: "center"}}>
        <Text style={{ color:'#4CAF50', fontWeight: "400", fontSize: 15, marginBottom: 2, marginTop: 10}}>Domiciliario</Text>
        <Text style={{ color:'#4CAF50', fontWeight: "400", fontSize: 15, marginBottom: 10,}}>10</Text>
        </View>
        <View style={{flexDirection: "column", alignItems: "center"}}>
        <Text style={{ color:'#4CAF50', fontWeight: "400", fontSize: 15, marginBottom: 2, marginTop: 10}}>Recogida</Text>
        <Text style={{ color:'#4CAF50', fontWeight: "400", fontSize: 15, marginBottom: 10,}}>10</Text>
        </View>
      </View>
    );
  };

  const renderBody = () => {
    return(
      <View style={{marginTop:20,overflow:"hidden",marginBottom: 10, marginHorizontal: 5}}>
        <FlatList
          data={CRYPTOCURRENCIES}
          style={{height:(Dimensions.get('window').height/2)+80}}
          ItemSeparatorComponent = {()=><View style={{marginVertical:-5}}></View>}
          renderItem={({item})=><CardOrderNew item={item}  onPress={handlePresentModal}/>}
          keyExtractor={(item) => item.id}
       />
      </View>
    );
  };


  const renderBodyBotton = () => {
    return(
      <View style={{marginTop:20,overflow:"hidden",marginBottom: 10, marginHorizontal: 5, width: "100%"}}>
        <FlatList
          data={CRYPTOCURRENCIES}
          style={{height:(Dimensions.get('window').height/2)}}
          ItemSeparatorComponent = {()=><View style={{marginVertical:-5}}></View>}
          renderItem={({item})=><CardOrderBottom item={item}  onPress={handlePresentModal}/>}
          keyExtractor={(item) => item.id}
       />
      </View>
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
            <Text style={[styles.title, { marginBottom: 20, marginTop: 10 }]}>Pedido #12321</Text>
            <Text style={styles.description}>
                  Pedido Domicilio    |   Edificio Ingenieria
            </Text>
            {renderBodyBotton()}

            



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
});



export default OrdersDeliv;