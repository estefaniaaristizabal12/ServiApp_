import React from 'react'
import { Text, View, StyleSheet, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AirbnbRating, Rating } from 'react-native-ratings';
import { normalize } from '../../../FontNormalize';
import * as UserService from '../../services/UserService';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { firebaseConfig } from '../firebaseConfig';



const app = initializeApp(firebaseConfig);
const auth = getAuth(app);



export const ServiceOrder = ({ navigation, route}) => {

    const [order, setOrder] = React.useState<any>(null);

    const rateOrder = async (rate:any) => {

        UserService.rateOrder(order.id, rate, auth.currentUser.uid)
            .then(data => {
                console.log(data)
            })
            .catch(error => console.error(error))
    }
    



    React.useEffect(() => {
        let { order } = route.params;
        console.log("order id", order.id)
        order && setOrder(order);
    }, []);

    const { top: paddingTop } = useSafeAreaInsets();
    return (
        <View style={{ flex: 1, paddingTop, flexDirection: "column", backgroundColor: Colors.grey }}>

            <View style={{ flex: 0.20 }}>

                <TouchableOpacity onPress={() => navigation.navigate('Details')} style={styles.btnAtas}>
                    <Ionicons name="arrow-back" size={25} color={Colors.gray} />
                </TouchableOpacity>

                <Text style={styles.textoInicio}>{order?.Restaurante?.Nombre}</Text>
                <Text style={styles.textoFecha}>{order?.Fecha}</Text>

            </View>
            <View style={{ flex: 0.80, borderTopLeftRadius: 30, borderTopRightRadius: 30, backgroundColor: "white", padding: 10 }}>


                <Text style={styles.titServicio}>¿Cómo te pareció el servicio?</Text>
                
                <AirbnbRating
                    count={5}
                    reviews={["Terrible", "Malo", "Regular", "Bueno", "Excelente"]}
                    defaultRating={5}
                    size={30}
                    ratingContainerStyle={styles.estrella}
                    onFinishRating={rateOrder}
                />


            </View>
            
            {/* <Button title="Calificar" onPress={() => rateOrder(count)} /> */}
        </View>
    )
}
const styles = StyleSheet.create({
    textoInicio: {
        fontSize: normalize(30),
        fontWeight: 'bold',
        color: 'white',
        marginTop: 30,
        marginLeft: 20
    },
    textoFecha: {
        fontSize: normalize(18),
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
       marginHorizontal:10,
       fontSize:normalize(10)
    },
    titServicio:{
        fontSize: normalize(18),
        fontWeight: 'bold',
        color: 'black',
        marginTop: 30,
        marginLeft: 20
    }

});
