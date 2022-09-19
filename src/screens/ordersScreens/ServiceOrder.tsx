import React from 'react'
import { Text, View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AirbnbRating, Rating } from 'react-native-ratings';

export const ServiceOrder = ({ navigation }) => {
    const { top: paddingTop } = useSafeAreaInsets();
    return (
        <View style={{ flex: 1, paddingTop, flexDirection: "column", backgroundColor: Colors.secondary }}>

            <View style={{ flex: 0.20 }}>

                <TouchableOpacity onPress={() => navigation.navigate('Details')} style={styles.btnAtas}>
                    <Ionicons name="arrow-back" size={25} color={Colors.gray} />
                </TouchableOpacity>

                <Text style={styles.textoInicio}>La Central Cafetería</Text>
                <Text style={styles.textoFecha}>05/02/2022</Text>

            </View>
            <View style={{ flex: 0.80, borderTopLeftRadius: 30, borderTopRightRadius: 30, backgroundColor: "white", padding: 10 }}>


                <Text> g</Text>
                <AirbnbRating
                    count={5}
                    reviews={["Terrible", "Malo", "Regular", "Bueno", "Excelente"]}
                    defaultRating={5}
                    size={30}
                    starContainerStyle={styles.estrella}
                />

            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    textoInicio: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 30,
        marginLeft: 20
    },
    textoFecha: {
        fontSize: 18,
        color: 'white',
        marginTop: 10,
        marginLeft: 20,
        fontStyle: "italic"
    },
    btnAtas: {
        marginLeft: 20,
        backgroundColor: Colors.white,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 25,
        height: 30,
        width: 30
    },
    estrella:{
       marginHorizontal:10, backgroundColor:"green"
    }

});