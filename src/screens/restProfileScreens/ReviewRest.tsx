import React from 'react'
import { Text, View, StatusBar, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { normalize } from '../../../FontNormalize';
import CartOrderRestFin from '../../components/CartOrderRestFin';
import { Colors } from '../../constants/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


export const ReviewRest = () => {
  const { top: paddingTop } = useSafeAreaInsets();
  return (
    <View style={{ flex: 1, backgroundColor: Colors.grey, paddingTop }}>
            <StatusBar backgroundColor="#BABBC3" barStyle='dark-content' hidden={false} />

            <View style={styles.header}>

                <View style={{ flexDirection: "row", alignItems: "center", marginLeft:10, marginTop:10}}>
                    <FontAwesome5 name="clipboard-list" size={25} />
                    <Text style={styles.titulo}>Pedidos Finalizados</Text>
                </View>


            </View>

            <View style={{ backgroundColor: Colors.white1, flex: 0.9, borderTopLeftRadius: 30, borderTopRightRadius: 30 }}>
                <CartOrderRestFin></CartOrderRestFin>

            </View>


        </View>
  )
}


const styles = StyleSheet.create({
  header: {
      marginTop: 20,
      flexDirection: 'column',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      flex:0.1
  },
  titulo: {
      fontSize: normalize(28),
      fontWeight: "bold",
      marginLeft:10
  },
  btnAtas: {
      marginLeft: 10,
      backgroundColor: Colors.white,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 25,
      height: 30,
      width: 30
  }

});
