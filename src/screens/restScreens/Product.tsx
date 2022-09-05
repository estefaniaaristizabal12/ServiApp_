import React from 'react'
import { Dimensions, Image, SectionList, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Button from '../../components/Button';
import { Colors } from '../../constants/colors';
import ingredients from '../../constants/ingredients';



const ListIngredients = () => {
    const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(0);
    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesListContainer}>
            {ingredients.map((category, index) => (
                <TouchableOpacity
                    key={index}
                    activeOpacity={0.8}
                >
                    <View
                        style={{
                            backgroundColor: "#F0F3FA",
                            ...styles.categoryBtn,
                            justifyContent: 'center',
                        }}>
                        <View style={{alignItems: 'center',}}>
                            <Image
                                source={category.image}
                                style={{ height: 70, width: 70 }}
                            />

                            <Text
                                style={{
                                    marginTop:5,
                                    fontSize: 15,
                                    fontWeight: 'bold',
                                }}>
                                {category.name}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};



export const Product = ({ navigation }) => {
    const { top: paddingTop } = useSafeAreaInsets();
    return (

        <View style={{ flex: 1, paddingTop, flexDirection: "column", backgroundColor: 'white' }}>


            <View style={{ flex: 2 }}>
                <Image
                    style={styles.logo}
                    source={require('../../../assets/ejemplo.jpg')}
                />
            </View>

            <View style={{ flex: 3, paddingLeft: 15, paddingRight: 30 }}>
                <Text style={styles.tituloProd}>Pizza Pepperoni</Text>
                <Text style={styles.descrProd}>Increible comida de servicios de alimentacion, se destaca por su inocuidad.</Text>
                <Text style={styles.preProd}> $15.900</Text>
                <Text style={styles.ingredients}>Ingedientes</Text>
                <View>
                    <ListIngredients />
                </View>

                <TouchableOpacity
                    onPress={() => navigation.navigate('Cart')}
                    activeOpacity={0.7}
                    style={styles.boton}>
                    <Text style={{ color: "white", fontWeight: 'bold', fontSize: 18 }}>Añadir al carrito</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}



const styles = StyleSheet.create({
    logo: {
        width: "100%",
        height: "100%"
    },
    item: {
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 10,
        marginVertical: 6,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#E7E7E7',

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
    ingredients: {
        marginTop: 20,
        fontSize: 20,
        fontWeight: 'bold',

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
    categoriesListContainer: {
        paddingVertical: 30,
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    categoryBtn: {
        height: 100,
        width: 100,
        marginRight: 7,
        borderRadius: 30,
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
