
import React from 'react'
import { Text, SafeAreaView, StatusBar, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'react-native-animatable';
import { Icon } from 'react-native-paper/lib/typescript/components/Avatar/Avatar';
import { FlatList } from 'react-native-gesture-handler';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { normalize } from '../../../../FontNormalize';
import { Colors } from '../../../constants/colors';
import CartOrdersDeliv from '../../../components/CartOrdersDeliv';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

export const OrderList = () => {

    const { top: paddingTop } = useSafeAreaInsets();
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.grey, paddingTop }}>
            <StatusBar backgroundColor="#BABBC3" barStyle='dark-content' hidden={false} />
            <View style={styles.header}>

                <View style={{ flex: 0.3, flexDirection: "row" }}>
                    <TouchableOpacity  style={styles.btnAtas}>
                        <Ionicons name="arrow-back" size={25} color={Colors.gray} />
                    </TouchableOpacity>
                </View>

                <View style={{ flex: 0.7, flexDirection: "row", marginLeft:10, alignItems:"center"}}>
                    <FontAwesome5 name="clipboard-list" size={25} />
                    <Text style={styles.titulo}>Pedidos a domicilio</Text>
                </View>


            </View>

            <View style={{backgroundColor: Colors.white1, flex:0.85, borderTopLeftRadius: 30, borderTopRightRadius: 30}}>
                <CartOrdersDeliv></CartOrdersDeliv>
                {/* <ProductsOrderRest></ProductsOrderRest> */}
                {/* <FlatList
                data={filteredData}
                renderItem={({ item }) => (
                    <Card
                        title={item.Nombre}
                        image={item.Imagen}
                        location={item.Localizacion}
                        description={item.Descripcion}
                        onPress={() => {
                            setSelectedRestaurant(item);
                            navigation.navigate('Restaurant', { selectedRestaurant: item });
                        }
                        }
                    />
                )}
            /> */}

            </View>


            

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header: {
        marginTop: 20,
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingHorizontal: 20, 
        flex:0.15
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