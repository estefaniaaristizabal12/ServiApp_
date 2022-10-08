
import { Dimensions, SectionList, StyleSheet, Text, ScrollView, Button, FlatList } from 'react-native';
import { Image, View } from 'react-native-animatable'

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../constants/colors';
import { Icon } from 'react-native-paper/lib/typescript/components/Avatar/Avatar';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import productEx from '../../constants/productEx';
import ItemRest from '../../components/ItemRest';
import CardRest from '../../components/CardRest';
import React, { FunctionComponent, useState, useEffect } from 'react';
import restaurant from '../../constants/restaurant';
import * as prodService from '../../services/ProductService'
import categories from '../../constants/categories';
import { normalize } from '../../../FontNormalize';


export const Restaurant = ({ navigation, route }) => {

    const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(0);
    const [selectedRestaurant, setSelectedRestaurant] = useState<any>(null);
    const [selectedProducts, setSelectedProducts] = useState<any>(null);

    const [selectedProduct, setSelectedProduct] = React.useState<any>(null);

    useEffect(() => {
        let { selectedRestaurant } = route.params;
        setSelectedRestaurant(selectedRestaurant);
        getProducts(selectedRestaurant?.id);
    }, []);

    const getProducts = async (restaurantId) => {
        prodService.getProductsRest(restaurantId)
            .then(data => setSelectedProducts(data))
            .catch(error => console.error(error))
    };

    const { top: paddingTop } = useSafeAreaInsets();

    const ListCategories = () => {
        return (
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoriesListContainer}>
                {categories.map((category, index) => (
                    <TouchableOpacity
                        key={index}
                        activeOpacity={0.8}
                        onPress={() => setSelectedCategoryIndex(index)}
                    >
                        <View
                            style={{
                                backgroundColor:
                                    selectedCategoryIndex == index
                                        ? Colors.primary1
                                        : Colors.grey,
                                ...styles.categoryBtn,
                                justifyContent:"center"
                            }}>
                           
                            <Text
                                style={{
                                    fontSize: 14,
                                    fontWeight: 'bold',
                                    marginLeft: 5,
                                    color:
                                        selectedCategoryIndex == index
                                            ? Colors.white1
                                            : Colors.grey1,
                                }}>
                                {selectedCategoryIndex == index ? "• "+category.name:  category.name } 
                            </Text>
                        
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        );
    };

    return (

        <View style={{ flex: 1, paddingTop, flexDirection: "column", backgroundColor: Colors.grey }}>


            <View style={{ flex: 1.5 }}>

                <View style={{ flex: 1, flexDirection: "row" }}>
                    <View style={{ flex: 0.5 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('TopTab')} style={styles.btnAtas}>
                            <Ionicons name="arrow-back" size={25} color={Colors.gray} />
                        </TouchableOpacity>
                    </View>

                    <View style={{ flex: 0.5, alignItems: "flex-end", marginRight: 25 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('Cart')} style={styles.btnAtas}>
                            <Ionicons name="cart" size={22} color={Colors.gray} />
                        </TouchableOpacity>
                    </View>


                </View>




                <View style={{ flex: 2, flexDirection: "row", marginTop: 10 }}>

                    <View style={{ flex: 1, marginLeft: 30 }}>
                        <Image
                            style={{ width: 50, height: 50, marginTop: 7, borderRadius: 5 }}
                            source={{ uri: selectedRestaurant?.Imagen }}
                        />

                    </View>

                    <View style={{ flex: 7, marginLeft: 2 }}>
                        <Text style={{ fontSize: normalize(30), fontWeight: 'bold', alignContent: 'center', padding: 20, color: "white" }}>{selectedRestaurant?.Nombre}</Text>
                        {/* <Button title="Product" onPress={() => navigation.navigate('Product')} /> */}

                    </View>

                </View>

                <View style={styles.infoRest}>
                    <View style={styles.itemsRestInfo}>
                        <Text style={styles.tituloItemRest}>Entrega</Text>
                        <Text style={styles.contItemRest}>{selectedRestaurant?.TiempoEntrega}</Text>

                    </View>
                    <View style={styles.itemsRestInfo}>
                        <Text style={styles.tituloItemRest}>Envío</Text>
                        <Text style={styles.contItemRest}>$2000</Text>


                    </View>
                    <View style={styles.itemsRestInfo}>
                        <Text style={styles.tituloItemRest}>Horario</Text>
                        <Text style={styles.contItemRest}>{selectedRestaurant?.Horario}</Text>

                    </View>

                </View>

                {/* Menu de productos */}
                <View style={{ flex: 0.7, marginBottom: 8 }}>
                    <ListCategories />
                </View>


            </View>

            <View style={{ flex: 3.5, borderTopLeftRadius: 30, borderTopRightRadius: 30, backgroundColor: "white" }}>

                <FlatList
                    data={selectedProducts}
                    renderItem={({ item }) => (
                        <CardRest
                            title={item.Nombre}
                            precio={item.Precio}
                            image={item.Imagen}
                            description={item.Descripcion}
                            navigation={navigation}
                            onPress={() => {
                                setSelectedProduct(item);

                                navigation.navigate('Product', { selectedProduct: item, selectedRestaurant: selectedRestaurant });
                            }
                            }
                        />
                    )}
                />

            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    logo: {
        width: Dimensions.get('window').width,
        height: 200
    },
    infoRest: {
        marginBottom: 20,
        marginLeft: 30,
        marginRight: 30,
        borderRadius: 20,
        backgroundColor: 'rgba(135, 137, 142, 0.47)',
        height: 10,
        flex: 1.2,
        flexDirection: "row",
    },
    itemsRestInfo: {
        flex: 0.5,
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center'
    },
    tituloItemRest: {
        fontSize: normalize(15),
        fontWeight: 'bold',
        color: "white"
    },
    contItemRest: {
        fontSize: normalize(13),
        color: "white",
        marginTop: 5
    },
    btnAtas: {
        marginLeft: 25,
        backgroundColor: Colors.white,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 25,
        height: 30,
        width: 30
    }, categoriesListContainer: {
        paddingVertical: 5,
        alignItems: 'center',
        paddingHorizontal: 30,
    },
    categoryBtn: {
        textAlign:"center",
        height: 22,
        width: 130,
        borderRadius: 100,
        alignItems: 'center',
        flexDirection: 'row',
    },
   

});
