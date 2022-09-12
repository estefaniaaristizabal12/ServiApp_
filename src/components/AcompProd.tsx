import React, { useEffect } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Text, Image, View, StyleSheet, Dimensions, Button } from "react-native";

const { width, height } = Dimensions.get("screen");

const AcompProd = ({ title, precio, navigation }) => {
    return (
       <View style={styles.item}>
        <TouchableOpacity >
            <View style={{ flex: 1, flexDirection: "row" }}>
                <View style={{ flex: 3 }}>
                    <Text style={styles.titulo}>{title}</Text>
                    <Text style={styles.precio}>+ ${precio}</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <Button  title="+" color="#000"/>
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
        fontSize: 18,
        color: '#000000',

    },
    precio: {
        fontSize: 17,
        fontWeight: 'bold',
        marginTop: 10,

    },
});

export default AcompProd;

