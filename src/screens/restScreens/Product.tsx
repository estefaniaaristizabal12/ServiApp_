import React from 'react'
import { Dimensions, Image, SectionList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'



const Item = ({ title, navigation }) => (
    <View style={styles.item}>
        <TouchableOpacity onPress={ () => navigation.navigate('Product') } >
            <View style={{ flex: 1, flexDirection: "row" }}>
                <View style={{ flex: 3 }}>
                    <Text style={styles.titulo}>{title}</Text>
                    <Text style={styles.descripcion}>Increible comida de servicios de alimentacion, se destaca por su ..</Text>
                    <Text style={styles.precio}> $25.000</Text>
                </View>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Image
                        style={{ width: 120, height: 110, borderRadius: 5 }}
                        source={require('../../../assets/pizza.jpg')}
                    />
                </View>

            </View>

        </TouchableOpacity>
    </View>
);

export const Product = () => {
    const { top: paddingTop } = useSafeAreaInsets();
    return (
        
        <View style={{ flex: 1, paddingTop, flexDirection: "column", backgroundColor: 'white' }}>


            <View style={{ flex: 2 }}>
                <Image
                    style={styles.logo}
                    source={require('../../../assets/producto.jpg')}
                />

                <View style={{ flex: 1, flexDirection: "row" }}>

                    <View style={{ flex: 1 }}>
                        <Image
                            style={{ width: 50, height: 50, marginTop: 7, marginLeft: 7, borderRadius: 50 }}
                            source={require('../../../assets/logoEjemplo.jpg')}
                        />

                    </View>

                    <View style={{ flex: 7 }}>
                        <Text style={{ fontSize: 27, fontWeight: 'bold', alignContent: 'center', padding: 20 }}> El restaurante  - la central</Text>
                        {/* <Button title="Product" onPress={() => navigation.navigate('Product')} /> */}

                    </View>

                </View>
            </View>

            <View style={{ flex: 3.5, paddingLeft: 15, paddingRight: 15 }}>
                {/* <SectionList style={{}}
                    sections={DATA}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({ item }) => <Item title={item} navigation={navigation}/>}
                    renderSectionHeader={({ section: { title } }) => (
                        <Text style={styles.header}>{title}</Text>
                    )}
                /> */}
            </View>

        </View>
    )
}



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
    header: {
        paddingLeft: 10,
        paddingTop: 10,
        paddingBottom: 10,
        fontSize: 25,
        backgroundColor: "#fff",
        fontWeight: 'bold'
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

    }
});
