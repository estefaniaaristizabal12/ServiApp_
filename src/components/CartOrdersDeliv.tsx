
import React from 'react'
import { normalize } from '../../FontNormalize';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../constants/colors';
import { Ionicons, MaterialCommunityIcons, MaterialIcons, FontAwesome, FontAwesome5 } from '@expo/vector-icons';

const { width, height } = Dimensions.get("screen");

// { numeroOrden, fecha, modalidad, total, estado }
export const CartOrdersDeliv = () => {

    let aceptado = 0;
    return (
        <View style={style.card}>

            <View style={{ flexDirection: "column", flex: 1 }}>
                <View style={{ alignItems: 'center', borderBottomColor: Colors.gray, borderBottomWidth: 0.5, flex: 0.2 }}>
                    <Text style={{ padding: 5, fontSize: normalize(22), fontWeight: "bold" }}> Órden #2222</Text>
                </View>

                <View style={{ flexDirection: "column", flex: 0.8 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10, flex: 0.3 }}>
                        <View style={{ flexDirection: "row", flex: 0.6 }}>
                            <MaterialCommunityIcons name="calendar-clock" size={20} color={Colors.grey1} />
                            <Text style={{ padding: 5, fontSize: normalize(18), color: Colors.grey1 }}>13/10/2022  15:20</Text>
                        </View>

                        <TouchableOpacity style={{ flexDirection: "row", flex: 0.5, backgroundColor: Colors.secondary1, justifyContent: "center", borderRadius: 20 }}>
                            <Text style={{ padding: 5, fontSize: normalize(18), fontWeight: "bold", color: "white" }}>Ver productos</Text>
                        </TouchableOpacity>

                    </View>

                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 5, flex: 0.2 }}>
                        <Text style={{ padding: 5, fontSize: normalize(20), fontWeight: "bold" }}>Restaurante:  </Text>

                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <MaterialIcons name="delivery-dining" size={22} color="#50ac31" />
                            <Text style={{ padding: 5, fontSize: normalize(18) }}> El Italiano</Text>
                        </View>

                    </View>

                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 5, flex: 0.2 }}>
                        <Text style={{ padding: 5, fontSize: normalize(20), fontWeight: "bold" }}>Total:</Text>
                        <Text style={{ padding: 5, fontSize: normalize(19), fontWeight: "bold" }}>$5000 </Text>

                    </View>


                    {aceptado == 0 ?
                        <TouchableOpacity style={{ flexDirection: "row", flex: 0.3, alignItems: "center", justifyContent: "center", marginTop: 5, backgroundColor: "#50ac31", borderRadius: 20, marginHorizontal: 20 }}>
                            <FontAwesome5 name="info-circle" size={22} color="white" />
                            <Text style={{ padding: 5, fontSize: normalize(18), fontWeight: "bold", color: "white", marginVertical: 3 }}>Aceptar pedido</Text>
                        </TouchableOpacity>

                        : <TouchableOpacity style={{ flexDirection: "row", flex: 0.3, alignItems: "center", justifyContent: "center", marginTop: 5, backgroundColor: "#2C5697", borderRadius: 20, marginHorizontal: 20 }}>
                            <FontAwesome5 name="info-circle" size={22} color="white" />
                            <Text style={{ padding: 5, fontSize: normalize(18), fontWeight: "bold", color: "white", marginVertical: 3 }}>Ver detalles</Text>
                        </TouchableOpacity>}






                </View>
                {/* <View style={{ flexDirection: "row" }}>
          <View style={style.cardImage}>

          </View>
          <View style={{ flex: 0.6, marginHorizontal: 12, overflow: "hidden" }}>
            <Text style={style.cardTitle}>Hola</Text>
            <Text style={style.cardLocation}>ke</Text>
            <Text numberOfLines={2} ellipsizeMode="tail" style={style.cardDescription}>no</Text>
          </View>
        </View> */}

            </View>

        </View>
    )
}


const style = StyleSheet.create({
    card: {
        marginVertical: 10,
        backgroundColor: "#fff",
        paddingVertical: 10,
        paddingHorizontal: 15,
        width: width / 1.1,
        marginHorizontal: 20,
        borderRadius: 20,

        height: height / 4.5,

        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 1.5,
    },

    textFecha: {

    },

    cardTitle: {
        fontWeight: "bold",
        fontSize: normalize(20),
        marginLeft: 10,
    },

    cardLocation: {
        fontSize: normalize(14),
        color: "#777",
        marginLeft: 10,
    },

    cardDescription: {
        fontSize: normalize(15),
        marginVertical: 8,
        marginLeft: 10,
    },

    cardImage: {
        flex: 0.3,
    },
});

export default CartOrdersDeliv;