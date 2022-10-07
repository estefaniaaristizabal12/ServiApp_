import React, { useEffect } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Text, Image, View, StyleSheet, Dimensions } from "react-native";
import { normalize } from "../../FontNormalize";

const { width, height } = Dimensions.get("screen");

const CardRest = ({ title, precio, description, image, navigation ,onPress}) => {
    return (
        // <TouchableOpacity onPress={() => navigation.navigate('Product')} style={style.card}>
        <TouchableOpacity onPress={onPress} style={style.card}>
            <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 0.65
                    , marginHorizontal: 12, overflow: "hidden" }}>
                    <Text numberOfLines={1} ellipsizeMode="tail" style={style.titulo}>{title}</Text>
                    <Text numberOfLines={2} ellipsizeMode="tail" style={style.descripcion}>{description}</Text>
                    <Text style={style.precio}>${precio}</Text>
                </View>

                <View style={{ flex: 0.3}}>
                    <Image
                        style={{ width: "100%", height: "100%", borderRadius: 20 }}
                        source={{ uri: image }}
                    />
                </View>

            </View>
        </TouchableOpacity>
    );
};

const style = StyleSheet.create({
    card: {
        marginVertical: 10,
        backgroundColor: "#fff",
        // paddingVertical: 10,
        // paddingHorizontal: 15,
        width: width / 1.1,
        marginHorizontal: 20,
        borderRadius: 20,

        height: height / 7,

        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 1.5,
        paddingBottom:10,
        paddingTop:10
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

    },
});

export default CardRest;

