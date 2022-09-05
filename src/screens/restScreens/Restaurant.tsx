import React from 'react'
import { Dimensions, SectionList, StyleSheet, Text, ScrollView, Button, FlatList } from 'react-native';
import { Image, View } from 'react-native-animatable'

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../constants/colors';
import { Icon } from 'react-native-paper/lib/typescript/components/Avatar/Avatar';
import { FontAwesome5 } from '@expo/vector-icons';
import productEx from '../../constants/productEx';
import ItemRest from '../../components/ItemRest';


export const Restaurant = ({ navigation }) => {
    const { top: paddingTop } = useSafeAreaInsets();
    return (


        <View style={{ flex: 1, paddingTop, flexDirection: "column", backgroundColor: Colors.secondary }}>


            <View style={{ flex: 1.5, backgroundColor: Colors.secondary }}>

                {/* Boton de regreso */}
                <TouchableOpacity onPress={() => navigation.navigate('TopTab')} style={{ marginLeft: 25 }}>
                    <FontAwesome5 name='arrow-alt-circle-left' size={30} style={{ color: "white" }} />
                </TouchableOpacity>

                {/* Logo y nombre del restaurante */}

                <View style={{ flex: 2, flexDirection: "row", marginTop: 10 }}>

                    <View style={{ flex: 1, marginLeft: 30 }}>
                        <Image
                            style={{ width: 50, height: 50, marginTop: 7, borderRadius: 5 }}
                            source={require('../../../assets/italiano.jpg')}
                        />

                    </View>

                    <View style={{ flex: 7, marginLeft: 2 }}>
                        <Text style={{ fontSize: 30, fontWeight: 'bold', alignContent: 'center', padding: 20, color: "white" }}> El Italiano</Text>
                        {/* <Button title="Product" onPress={() => navigation.navigate('Product')} /> */}

                    </View>

                </View>

                <View style={styles.infoRest}>
                    <View style={styles.itemsRestInfo}>
                        <Text style={styles.tituloItemRest}>Entrega</Text>
                        <Text style={styles.contItemRest}>31 min</Text>

                    </View>
                    <View style={styles.itemsRestInfo}>
                        <Text style={styles.tituloItemRest}>Envío</Text>
                        <Text style={styles.contItemRest}>$2000</Text>


                    </View>
                    <View style={styles.itemsRestInfo}>
                        <Text style={styles.tituloItemRest}>Horario</Text>
                        <Text style={styles.contItemRest}>10:00 - 16:00</Text>

                    </View>

                </View>

                {/* Menu de productos */}
                <View style={{ flex: 0.7, marginBottom: 8 }}>


                </View>


            </View>

            <View style={{ flex: 3.5, paddingLeft: 15, paddingRight: 15, borderTopLeftRadius: 30, borderTopRightRadius: 30, backgroundColor: "white" }}>

                <FlatList
                    data={productEx}
                    renderItem={({ item }) => (
                        <ItemRest
                            title={item.title}
                            precio={item.precio}
                            image={item.image}
                            description={item.description}
                            navigation={navigation}
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
        flex: 1.5,
        flexDirection: "row",
    },
    itemsRestInfo: {
        flex: 0.5,
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center'
    },
    tituloItemRest: {
        fontSize: 15,
        fontWeight: 'bold',
        color: "white"
    },
    contItemRest: {
        fontSize: 13,
        color: "white",
        marginTop: 5
    },

});
