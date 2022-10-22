import React from 'react'
import { Text, View, StyleSheet, Button, Image , Alert} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AirbnbRating, Rating } from 'react-native-ratings';
import { normalize } from '../../../FontNormalize';
import * as UserService from '../../services/UserService';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { firebaseConfig } from '../firebaseConfig';
import { useState } from 'react';







export const ServiceOrder = ({ navigation, route }) => {

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    const [defaultRating, setDefaultRating] = useState(0);
    const [comment, setComment] = useState("");
    const [maxRating, setmaxRating] = useState([1, 2, 3, 4, 5]);

    const [order, setOrder] = React.useState<any>(null);

    const rateOrder = async () => {
      navigation.navigate('OrdersStack', {screen : 'Orders'})
      UserService.rateOrder(order.id, defaultRating, comment, auth.currentUser.uid)
        .then(data => {
            console.log(data)
        })
        .catch(error => console.error(error))
    }




    React.useEffect(() => {
        let { order } = route.params;
        order.Fecha = new Date(order.Fecha).toLocaleString('es-ES')
        order && setOrder(order);
        setDefaultRating(order.Calificacion)
    }, []);

    const renderSendRateButton = () => {
      if(defaultRating == 0 || comment == "" && defaultRating != 5){
          return (
            <View style={{ flex: 0.2, justifyContent: "center", alignContent: "center" }}>
                    <TouchableOpacity style={{ marginHorizontal: 2, marginRight: 3, alignItems: "center", backgroundColor: Colors.grey, borderRadius: 50 }}>
                        <Text style={{ fontSize: normalize(22), fontWeight: 'bold', color: 'white', padding: 15 }}>{defaultRating == 1 || defaultRating == 2?"Reportar inconveniente":"Enviar reseña"}</Text>
                    </TouchableOpacity>
            </View>
          );
      }
      else{
          return (
            <View style={{ flex: 0.2, justifyContent: "center", alignContent: "center" }}>
                    <TouchableOpacity style={{ marginHorizontal: 2, marginRight: 3, alignItems: "center", backgroundColor: Colors.primary1, borderRadius: 50 }}onPress= {() => {rateOrder()}}>
                        <Text style={{ fontSize: normalize(22), fontWeight: 'bold', color: 'white', padding: 15 }}>{defaultRating == 1 || defaultRating == 2?"Reportar inconveniente":"Enviar reseña"}</Text>
                    </TouchableOpacity>
            </View>
          );
      }
    }

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

                <View style={{ flex: 0.1, justifyContent: "center", }}>
                    <Text style={styles.titServicio}>¿Cómo te pareció el servicio?</Text>
                </View>



                <View style={styles.calification}>

                    {
                        maxRating.map((item, key) => {
                            return (
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    key={item}
                                    onPress={() => 
                                        { 
                                            setDefaultRating(item)
                                            setComment("")
                                        }
                                    }>

                                    {
                                        item <= defaultRating ?
                                            <AntDesign style={{ marginHorizontal: 3 }} name="star" size={40} color={
                                                ((defaultRating == 5 || defaultRating == 4) && "#7ED957") ||
                                                ((defaultRating == 3) && "#FFBD59") ||
                                                ((defaultRating == 2 || defaultRating == 1) && "red")

                                            } />
                                            : <AntDesign style={{ marginHorizontal: 3 }} name="staro" size={40} color={
                                                ((defaultRating == 5 || defaultRating == 4) && "#7ED957") ||
                                                ((defaultRating == 3) && "#FFBD59") ||
                                                ((defaultRating == 2 || defaultRating == 1) && "red")

                                            } />
                                    }
                                </TouchableOpacity>
                            )
                        })
                    }

                </View>



                <View style={styles.calification2}>
                    {defaultRating == 1 &&

                        <View style={{ flex: 1, flexDirection: "column" }}>

                            <View style={{ flex: 0.2 }}>
                                <Text style={styles.tituloRese}>¡Oh no!, ¿Algo salió mal?</Text>
                            </View>

                            <View style={{ flex: 0.8, flexDirection: "row" }}>

                                <View style={{ flex: 0.33, alignItems: "center" }}>
                                    <TouchableOpacity style={{ marginHorizontal: 2, alignItems: "center" }}onPress= {() => {setComment("Tardó mucho en llegar")}}>
                                        <Image
                                            style={{ height: 50, width: 50 }}
                                            source={require('../../../assets/tiempoT.png')} />
                                        <Text style={styles.descripcionRese}>Tardó mucho en llegar</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flex: 0.33, alignItems: "center" }}>
                                    <TouchableOpacity style={{ marginHorizontal: 2, alignItems: "center" }}onPress= {() => {setComment("Producto en pésimo estado")}}>
                                        <Image
                                            style={{ height: 50, width: 50 }}
                                            source={require('../../../assets/productMal.png')} />
                                        <Text style={styles.descripcionRese}>Producto en pésimo estado</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flex: 0.33, alignItems: "center" }}>
                                    <TouchableOpacity style={{ marginHorizontal: 2, alignItems: "center" }}onPress= {() => {setComment("Producto incompleto")}}>
                                        <Image
                                            style={{ height: 50, width: 50 }}
                                            source={require('../../../assets/incompleto.png')} />
                                        <Text style={styles.descripcionRese}>Producto incompleto</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>

                        </View>
                    }

                    {(defaultRating == 2 || defaultRating == 3) &&

                        <View style={{ flex: 1, flexDirection: "column" }}>

                            <View style={{ flex: 0.2 }}>
                                <Text style={styles.tituloRese}>¡Oh!, ¿Algo salió mal?</Text>
                            </View>

                            <View style={{ flex: 0.8, flexDirection: "row" }}>

                                <View style={{ flex: 0.33, alignItems: "center" }}>
                                    <TouchableOpacity style={{ marginHorizontal: 2, alignItems: "center" }}onPress= {() => {setComment("Tardó en llegar")}}>
                                        <Image
                                            style={{ height: 50, width: 50 }}
                                            source={require('../../../assets/tiempoT.png')} />

                                        <Text style={styles.descripcionRese}>Tardó en llegar</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flex: 0.33, alignItems: "center" }}>
                                    <TouchableOpacity style={{ marginHorizontal: 2, alignItems: "center" }}onPress= {() => {setComment("Producto en mal estado")}}>
                                        <Image
                                            style={{ height: 50, width: 50 }}
                                            source={require('../../../assets/productRegular.png')} />
                                        <Text style={styles.descripcionRese}>Producto en mal estado</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flex: 0.33, alignItems: "center" }}>
                                    <TouchableOpacity style={{ marginHorizontal: 2, alignItems: "center" }}onPress= {() => {setComment("Producto incompleto")}}>
                                        <Image
                                            style={{ height: 50, width: 50 }}
                                            source={require('../../../assets/incompletoR.png')} />
                                        <Text style={styles.descripcionRese}>Producto incompleto</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>

                        </View>
                    }
                    {defaultRating == 4 &&

                        <View style={{ flex: 1, flexDirection: "column" }}>

                            <View style={{ flex: 0.2 }}>
                                <Text style={styles.tituloRese}>¡Bien! Pero aún falta una estrella...</Text>
                            </View>
                            {/* <Text>Recomendación:</Text> */}
                            <View style={{ flex: 0.8, flexDirection: "row" }}>



                                <View style={{ flex: 0.5, alignItems: "center" }}>
                                    <TouchableOpacity style={{ marginHorizontal: 2, alignItems: "center" }} onPress= {() => {setComment("Ser más rápidos")}}>
                                        <Image
                                            style={{ height: 50, width: 50 }}
                                            source={require('../../../assets/rapidez.png')} />
                                        <Text style={styles.descripcionRese}>Ser más rápidos</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flex: 0.5, alignItems: "center" }}>
                                    <TouchableOpacity style={{ marginHorizontal: 2, marginRight: 3, alignItems: "center" }}onPress= {() => {setComment("Ser más cuidadosos con los productos")}}>
                                        <Image
                                            style={{ height: 50, width: 50 }}
                                            source={require('../../../assets/cuidadosos.png')} />
                                        <Text style={styles.descripcionRese}>Ser más cuidadosos con los productos</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>

                        </View>
                    }
                    {defaultRating == 5 &&
                        <Text style={styles.tituloRese}>¡Excelente! Tuviste un gran servicio</Text>
                    }


                </View>

            {renderSendRateButton()}

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
    estrella: {
        marginHorizontal: 10,
        fontSize: normalize(10)
    },
    titServicio: {
        fontSize: normalize(22),
        fontWeight: 'bold',
        color: 'black',
        marginLeft: 20,
    },
    calification: {
        justifyContent: "flex-start",
        flexDirection: 'row',
        flex: 0.15,
        alignItems: "center",
        marginLeft: 20
    },
    calification2: {
        justifyContent: "flex-start",
        flexDirection: 'column',
        borderTopColor: Colors.grey1,
        borderTopWidth: 0.3,
        flex: 0.55,
    },
    tituloRese: {
        fontSize: normalize(20),
        fontWeight: 'bold',
        color: 'black',
        marginTop: 20,
        marginLeft: 20,



    },
    descripcionRese: {
        fontSize: normalize(18),
        color: 'black',
        marginTop: 10,
    }

});
