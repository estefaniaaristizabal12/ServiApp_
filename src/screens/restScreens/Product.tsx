import React, { useState, useEffect} from 'react'
import { Dimensions, Image, SectionList, StyleSheet, Text, TouchableOpacity, View, ScrollView, FlatList, Button } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import AcompProd from '../../components/AcompProd';
import acompanamientos from '../../constants/acompanamientos';
import { Colors } from '../../constants/colors';
import ingredients from '../../constants/ingredients';





export const Product = ({ navigation, route}) => {
    const { top: paddingTop } = useSafeAreaInsets();
    const [count, setCount] = useState(0);
    const onPressPlus = () => setCount(prevCount => prevCount + 1);
    const onPressRest = () => setCount(prevCount => prevCount - 1);

    const [selectedProduct, setSelectedProduct] = React.useState<null>(null);



    useEffect(() => {
        let { selectedProduct } = route.params;
        setSelectedProduct(selectedProduct);
      
      }, []);
    


    return (

        <View style={{ flex: 1, paddingTop, flexDirection: "column", backgroundColor: Colors.grey }}>


            <View style={{ flex: 0.3, alignItems: 'center' }}>
                <Image
                    style={styles.logo}
                    source={{ uri: selectedProduct?.Imagen }}
                />
            </View>

            <View style={styles.componente2}>
                <Text style={styles.tituloProd}>{selectedProduct?.Nombre}</Text>
                <Text style={styles.descrProd}>{selectedProduct?.Descripcion}</Text>
                <Text style={styles.preProd}> $ {selectedProduct?.Precio}</Text>

                <View style={{ flex: 0.8, flexDirection: "row", borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#E7E7E7', borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: '#E7E7E7', marginTop: 20 }}>
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
                    <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                        <Text style={styles.textBtnCarro}>Agregar $17.000</Text>
                    </TouchableOpacity>
                </View>

            </View>

        </View>
    );
}




const styles = StyleSheet.create({
    logo: {
        width: "90%",
        height: "90%"
    },
    componente2: {
        flex: 0.65,
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
        fontSize: 30,
        fontWeight: 'bold',
    },
    descrProd: {
        marginTop: 5,
        fontSize: 18,
    },
    preProd: {
        marginTop: 10,
        fontSize: 20,
        fontWeight: 'bold',

    },
    acompanamientos: {
        fontSize: 18,
        marginTop: 25,
        fontWeight: 'bold',
    },
    sugerido: {
        backgroundColor: 'rgba(204, 44, 42, 0.42)',
        fontSize: 15,
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
    textBtn:{
        fontSize: 18,
        marginLeft:12,
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
    textBtnCarro:{
        fontSize: 18,
        marginLeft:12,
        marginRight: 12,
        fontWeight: 'bold',
        color:"white"

    }
});
