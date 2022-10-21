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
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { StatusBar } from "expo-status-bar";





const OrdersDeliv = ({ navigation }) => {


  const [tabIndex, setTabIndex] = React.useState(0);
  const bottomSheetModalRef = React.useRef(null);
  const [isOpen, setIsOpen] = React.useState(false);

  const snapPoints = ["25%", "48%", "75%"];

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
  ];

  const renderHeader = () => {
    return (
      <View style={styles.headerbar}>
        <Text style={{ fontSize: 25, fontWeight: "300", color: Colors.black }}>Pedidos</Text>
        <Text style={{ fontSize: 30, fontWeight: "700", color: Colors.black }}>Disponibles</Text>
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
      <View style={{marginTop:10,backgroundColor:"#F5F8FF",overflow:"hidden",marginBottom:100, marginHorizontal: 20}}>
        <FlatList
          data={CRYPTOCURRENCIES}
          style={{height:(Dimensions.get('window').height/2)+60}}
          ItemSeparatorComponent = {()=><View style={{marginVertical:8}}></View>}
          renderItem={({item})=><CardOrderNew item={item} onPress={()=>navigation.navigate("walletdetails",item)}/>}
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

        <Button title="Present Modal" onPress={handlePresentModal} />
        <StatusBar style="auto" />




        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          backgroundStyle={{ borderRadius: 50 }}
          onDismiss={() => setIsOpen(false)}
        >
          <View style={styles.contentContainer}>
            <Text style={[styles.title, { marginBottom: 20 }]}>Dark mode</Text>
            <Text style={styles.description}>
              Set Dark mode to use the Light or Dark selection located in your
              device Display and Brightness settings.
            </Text>


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
    fontSize: 16,
  },
  description: {
    color: "#56636F",
    fontSize: 13,
    fontWeight: "normal",
    width: "100%",
  },
});



export default OrdersDeliv;