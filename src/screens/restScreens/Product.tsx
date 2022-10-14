import React, { useState, useEffect, useContext } from 'react'
import { Dimensions, Image, SectionList, StyleSheet, Text, TouchableOpacity, View, ScrollView, FlatList, Button } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import AcompProd from '../../components/AcompProd';
import acompanamientos from '../../constants/acompanamientos';
import { Colors } from '../../constants/colors';
import ingredients from '../../constants/ingredients';
import { Ionicons } from '@expo/vector-icons';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { firebaseConfig } from '../firebaseConfig';
import * as UserService from '../../services/UserService'
import categories from '../../constants/categories';
import { normalize } from '../../../FontNormalize';
import { CartContext } from '../../context/cartContext/CartContext';


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);





export const Product = ({ navigation, route }) => {

    
    const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(0);
    const { top: paddingTop } = useSafeAreaInsets();
    const [count, setCount] = useState(1);
    const onPressPlus = () => setCount(prevCount => prevCount + 1);
    const onPressRest = () => setCount(prevCount => prevCount - 1);

    const [selectedProduct, setSelectedProduct] = React.useState<any>(null);
    const [selectedRestaurant, setSelectedRestaurant] = React.useState<any>(null);

    // const {cambioNombre} = useContext(CartContext);




    useEffect(() => {
        let { selectedProduct, selectedRestaurant } = route.params;
        setSelectedProduct(selectedProduct);

        setSelectedRestaurant(selectedRestaurant);

        console.log(selectedProduct);


    }, []);

    const addProdCart = (prodId: any, cant: any, restId: any, uid: any) => {
        UserService.addProdCart(prodId, cant, restId, uid)
            .then(res => navigation.navigate('CartStack'))
            .catch(error => console.error(error))
    }


    return (

        <View style={{ flex: 1, paddingTop, flexDirection: "column", backgroundColor: Colors.grey }}>

            <View style={{ flex: 0.08, alignItems: 'center' }}>
                {/* <Button title="cambioNombre" onPress={cambioNombre}/> */}


                <View style={{ flex: 1, flexDirection: "row" }}>
                    <View style={{ flex: 0.5 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('Restaurant')} style={styles.btnAtas}>
                            <Ionicons name="arrow-back" size={25} color={Colors.gray} />
                        </TouchableOpacity>
                    </View>

                    <View style={{ flex: 0.5, alignItems: "flex-end", marginRight: 25 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('CartStack')} style={styles.btnAtas}>
                            <Ionicons name="cart" size={22} color={Colors.gray} />
                        </TouchableOpacity>
                    </View>

                </View>

            </View>

            <View style={styles.componente2}>

                <View style={{ flex: 1.4, flexDirection: "row" }}>
                    <View style={{ flex: 0.8 }}>
                        <Text numberOfLines={2} ellipsizeMode="tail" style={styles.tituloProd}>{selectedProduct?.Nombre}</Text>
                        <Text numberOfLines={3} ellipsizeMode="tail" style={styles.descrProd}>{selectedProduct?.Descripcion}</Text>
                        <Text style={styles.preProd}> $ {selectedProduct?.Precio}</Text>
                    </View>
                    <View style={{ flex: 0.3, justifyContent: 'center' }}>
                        <Image
                            style={styles.logo}
                            source={{ uri: selectedProduct?.Imagen }}
                        />
                    </View>

                </View>

                <View style={{ flex: 0.6, flexDirection: "row", borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#E7E7E7', borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: '#E7E7E7', marginTop: 20 }}>
                    <View style={{ flex: 0.7 }}>
                        <Text style={styles.acompanamientos}>Acompaña Tu Orden Con</Text>
                    </View>
                    <View style={{ flex: 0.3, paddingRight: 10 }}>
                        <Text style={styles.sugerido}>Sugerido</Text>
                    </View>
                </View>

                <View style={{ flex: 3.5, backgroundColor: "white" }}>
                    <FlatList
                        data={acompanamientos}
                        renderItem={({ item }) => (
                            <AcompProd
                                title={item.title}
                                precio={item.precio}
                                navigation={navigation}
                            />
                        )}
                    />
                </View>

            </View>


            <View style={{ backgroundColor: 'white', flex: 0.07, flexDirection: "row", borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: '#E7E7E7' }}>
                <View style={styles.btnModificar}>
                    <TouchableOpacity onPress={onPressRest}>
                        <Text style={styles.textBtn}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.textBtn}> {count}</Text>
                    <TouchableOpacity onPress={onPressPlus}>
                        <Text style={styles.textBtn}>+</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.btnACarro}>
                    <TouchableOpacity onPress={() => {
                        // cambioNombre
                        addProdCart(selectedProduct?.id, count, selectedRestaurant?.id, auth.currentUser.uid)
<<<<<<< Updated upstream
                        setTimeout(() => {
                           
                            console.log("Delayed for 1 second.");
                            navigation.navigate('Cart')
                          }, 1)
                       
=======
                        // navigation.navigate('CartStack')
>>>>>>> Stashed changes
                    }
                    }>
                        <Text style={styles.textBtnCarro}>Agregar ${selectedProduct?.Precio} </Text>
                    </TouchableOpacity>
                </View>

            </View>

        </View>
    );
}




const styles = StyleSheet.create({
    logo: {
        width: "100%",
        height: 120,
        borderRadius: 10,
        marginLeft: 3
    },
    componente2: {
        flex: 0.92,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: "white",
        paddingTop: 10,
        paddingBottom: 20,
        paddingLeft: 15,
        paddingRight: 15,

    },
    tituloProd: {
        marginTop: 20,
        fontSize: normalize(30),
        fontWeight: 'bold',
    },
    descrProd: {
        marginTop: 5,
        fontSize: normalize(18),
    },
    preProd: {
        marginTop: 10,
        fontSize: normalize(20),
        fontWeight: 'bold',

    },
    acompanamientos: {
        fontSize: normalize(18),
        marginTop: 25,
        fontWeight: 'bold',
    },
    sugerido: {
        backgroundColor: 'rgba(204, 44, 42, 0.42)',
        fontSize: normalize(15),
        padding: 5,
        borderRadius: 5,
        marginTop: 20,
        fontWeight: 'bold',
        borderWidth: 1,
        borderColor: 'rgba(204, 44, 42, 0.42)',
        overflow: "hidden",
        textAlign: 'center',
        color: "#CC2C2A"

    },
    boton: {
        height: 55,
        borderRadius: 15,
        width: '100%',
        backgroundColor: '#CC2C2A',
        marginVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',

    },
    sortBtn: {
        width: 50,
        height: 50,
        marginLeft: 10,
        backgroundColor: Colors.primary1,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnModificar: {
        flex: 0.3,
        flexDirection: "row",
        backgroundColor: '#F0F3FA',
        borderRadius: 5,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textBtn: {
        fontSize: normalize(18),
        marginLeft: 12,
        marginRight: 12,
        fontWeight: 'bold',
    },
    btnACarro: {
        backgroundColor: Colors.primary1,
        borderRadius: 5,
        margin: 8,
        flex: 0.7,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textBtnCarro: {
        fontSize: normalize(18),
        marginLeft: 12,
        marginRight: 12,
        fontWeight: 'bold',
        color: "white"

    },
    btnAtas: {
        marginLeft: 25,
        backgroundColor: Colors.white,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 25,
        height: 30,
        width: 30
    },
    categoriesListContainer: {
        paddingVertical: 30,
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    categoryBtn: {
        height: 45,
        width: 165,
        marginRight: 7,
        borderRadius: 30,
        alignItems: 'center',
        paddingHorizontal: 5,
        flexDirection: 'row',
    },
    categoryBtnImgCon: {
        height: 35,
        width: 35,
        backgroundColor: Colors.white1,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
