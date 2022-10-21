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
import { Colors } from '../../../constants/colors';
// import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { CardOrderDelivery } from '../../../components/CardOrderDelivery';




const InitialMenu = ({ navigation }) => {

  const [tabIndex, setTabIndex] = React.useState(0);

  const CRYPTOCURRENCIES = [
    {
      id:1,
      name:"Processed",
      cryptobalance:"3.5290123123 BTC",
      actualbalance:"$19.53",
      percentage:"+ 4.32%",
      difference:"$ 5.44",
      decreased:true,
      imgsrc: require('../../../../assets/salad.png'),
    },
    {
      id:2,
      name:"Active",
      cryptobalance:"3.5290123123 ETH",
      actualbalance:"$19.53",
      percentage:"+ 4.32%",
      difference:"$ 5.44",
      decreased:false,
      imgsrc: require('../../../../assets/salad.png'),
    },
  ];

  const renderHeader = () => {
    return (
      <View style={styles.headerbar}>
        <Text style={{ fontSize: 25, fontWeight: "300", color: Colors.black }}>Hola,</Text>
        <Text style={{ fontSize: 30, fontWeight: "700", color: Colors.black }}>Julian Rizo</Text>
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
        />
      </View>
    );
  };

  const renderBody = () => {
    return(
      <View style={{marginTop:10,backgroundColor:"#F5F8FF",overflow:"hidden",marginBottom:100}}>
        <FlatList
          data={CRYPTOCURRENCIES}
          style={{height:(Dimensions.get('window').height/2)+60}}
          ItemSeparatorComponent = {()=><View style={{marginVertical:8}}></View>}
          renderItem={({item})=><CardOrderDelivery item={item} onPress={()=>navigation.navigate("walletdetails",item)}/>}
          keyExtractor={(item) => item.id}
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