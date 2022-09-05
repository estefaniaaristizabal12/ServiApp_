import React, { useEffect } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Text, Image, View, StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("screen");

const ItemRest = ({ title, precio, description, image, navigation }) => {
    return (
       <View style={styles.item}>
        <TouchableOpacity onPress={() => navigation.navigate('Product')} >
            <View style={{ flex: 1, flexDirection: "row" }}>
                <View style={{ flex: 3 }}>
                    <Text style={styles.titulo}>{title}</Text>
                    <Text style={styles.descripcion}>{description}</Text>
                    <Text style={styles.precio}>${precio}</Text>
                </View>
                <View style={{ flex: 1.5, alignItems: 'center' }}>
                    <Image
                        style={{ width: "100%", height: "100%", borderRadius: 5 }}
                        source={image}
                    />
                </View>
            </View>
        </TouchableOpacity>
    </View>
    );
};

const styles = StyleSheet.create({
    logo: {
        width: Dimensions.get('window').width,
        height: 200
    },
    item: {
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 10,
        marginVertical: 6,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#E7E7E7',

    },
    titulo: {
        fontSize: 22,
        color: '#000000',

    },
    descripcion: {
        fontSize: 17,
        marginTop: 10,
        color: '#6D6D6D',
        height: 50,
    },
    precio: {
        fontSize: 18,
        fontWeight: 'bold'

    },
});

export default ItemRest;

