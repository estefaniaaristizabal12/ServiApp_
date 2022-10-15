import React from 'react'
import { Text, SafeAreaView, StatusBar, View, TextInput, StyleSheet, Dimensions } from 'react-native';
import { Image } from 'react-native-animatable';
import { Icon } from 'react-native-paper/lib/typescript/components/Avatar/Avatar';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { white } from 'react-native-paper/lib/typescript/styles/colors';

import { normalize } from '../../../../FontNormalize';
import { Colors } from '../../../constants/colors';
import { FontAwesome } from '@expo/vector-icons';



const { width, height } = Dimensions.get("screen");

export default function InitialMenu  ({navigation, route})  {
  
  const [user, setUser] = React.useState<any>({});

  React.useEffect(() => {
    console.log(route.params);
     route.params.user && setUser(route.params.user);
}, []);


  const { top: paddingTop } = useSafeAreaInsets();  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.grey, paddingTop }}>
      <StatusBar backgroundColor="#BABBC3" barStyle='dark-content' hidden={false} />
      <View style={styles.header}>
        <View>
          <View style={{ flexDirection: 'row', marginTop: 20 }}>
            <Text style={{ fontSize: normalize(28) }}>Hola,</Text>
            <Text style={{ fontSize: normalize(28), fontWeight: 'bold', marginLeft: 10 }}>
              {user?.nombrecliente ? user.nombrecliente.split(" ")[0]: ""} 
              {/* {auth.currentUser?.uid}  */}
            </Text>
          </View>
          <Text style={{ marginTop: 6, fontSize: normalize(18), color: Colors.grey1 }}>
            Acá puedes ver la lista de domicilios actuales
          </Text>
        </View>
        <Image
          source={require('../../../../assets/italiano.jpg')}
          style={{ height: 55, width: 55, borderRadius: 25, marginRight: 9 }}
        />
      </View>

      <View style={{ backgroundColor: Colors.white1, flex: 0.8, borderTopLeftRadius: 30, borderTopRightRadius: 30 }}>

        <View style={{ flex: 0.5, justifyContent: "flex-end" }}>

          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('OrderList')}>

            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 0.3, height: "100%", alignItems: "center", justifyContent: "center" }}>
                <Image
                  source={require('../../../../assets/entrega-rapida.png')}
                  style={{ height: 100, width: 100, borderRadius: 25, marginRight: 9 }}
                />
              </View>
              <View style={{ flex: 0.6, justifyContent: "center" }}>

                <Text style={styles.cardTitle}>Pedidos a domicilio actuales</Text>
                <Text style={styles.cardDescription}>Acá encontrarás las solicitudes a domicilio actuales de los clientes</Text>

              </View >
              <View style={{ flex: 0.1, justifyContent: "center", alignItems:"center" }}>
                <FontAwesome name="angle-double-right" size={40} color={Colors.grey1} />
              </View>

            </View>

          </TouchableOpacity>


        </View>

        <View style={{ flex: 0.5 }}>

          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('CurrentOrder')}>

            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 0.3, height: "100%", alignItems: "center", justifyContent: "center" }}>
                <Image
                  source={require('../../../../assets/entrega-de-paquetes.png')}
                  style={{ height: 100, width: 100, borderRadius: 25, marginRight: 9 }}
                />
              </View>
              <View style={{ flex: 0.6, justifyContent: "center" }}>
                <Text style={styles.cardTitle}>Tus domicilios en curso</Text>
                <Text style={styles.cardDescription}>Acá encontrarás los pedidos a domicilio que están a cargo tuyo</Text>

              </View >
              <View style={{ flex: 0.1,  justifyContent: "center", alignItems:"center"}}>
                <FontAwesome name="angle-double-right" size={40} color={Colors.grey1} />

              </View>

            </View>

          </TouchableOpacity>

        </View>

      </View>


    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  header: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    flex: 0.2
  },
  card: {
    marginVertical: 10,
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: width / 1.1,
    marginHorizontal: 20,
    borderRadius: 20,

    height: "75%",

    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 1.5,
  },
  cardTitle: {
    fontWeight: "bold",
    fontSize: normalize(20),
    marginLeft: 10,
  },
  cardDescription: {
    fontSize: normalize(18),
    marginVertical: 8,
    marginLeft: 10,
  },

});