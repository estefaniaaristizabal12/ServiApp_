import React from 'react'
import { TouchableOpacity } from "react-native-gesture-handler";
import { Text, Image, View, StyleSheet, Dimensions } from "react-native";
import { normalize } from '../../FontNormalize';
import { FontAwesome } from '@expo/vector-icons';
import { Colors } from '../constants/colors';

const { width, height } = Dimensions.get("screen");

export const CardCart = ({ title, precio, cantidad, image }) => {
    return (
        <View style={style.card}>
            <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 0.3 }}>
                    <Image
                        style={{ width: "100%", height: "100%", borderRadius: 20, marginLeft: 5 }}
                        source={{ uri: image }}
                    />
                </View>

                <View style={{
                    flex: 0.65
                    , marginHorizontal: 12, overflow: "hidden"
                }}>

                    <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
                        <View style={{ flexDirection: "column", flex: 0.8 }}>
                            <Text style={style.titulo}>{title}</Text>
                            <Text style={style.precio}>${precio}</Text>
                        </View>
                        <View style={{ marginVertical: 5, alignItems: "center", justifyContent:"center", flex: 0.2, backgroundColor:Colors.secondary1, borderRadius:50 }}>
                            <FontAwesome style={{marginVertical:8}} name="trash" size={25} color={Colors.primary1} />
                        </View>

                    </View>

                </View>
            </View>
        </View>
    )
}


const style = StyleSheet.create({
    card: {
        marginVertical: 10,
        backgroundColor: "#fff",
        // paddingVertical: 10,
        // paddingHorizontal: 15,
        width: width / 1.1,
        marginHorizontal: 20,
        borderRadius: 20,

        height: height / 8.5,

        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 1.5,
        paddingBottom: 10,
        paddingTop: 10
    },
    cardImage: {
        flex: 0.3,
    },
    titulo: {
        fontSize: normalize(20),
        color: '#000000',
        marginLeft: 10,
    },
    descripcion: {
        fontSize: normalize(15),
        marginTop: 10,
        color: '#6D6D6D',
        height: 50,
        marginLeft: 10,
    },
    precio: {
        fontSize: normalize(18),
        fontWeight: 'bold',
        marginLeft: 10,
        marginTop: 5

    },
    btnModificar: {
        flexDirection: "row",
        backgroundColor: '#F0F3FA',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textBtn: {
        fontSize: normalize(18),
        marginLeft: 12,
        marginRight: 12,
        fontWeight: 'bold',
    },
});

export default CardCart;
