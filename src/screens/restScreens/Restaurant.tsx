import React from 'react'
import { Dimensions, SectionList, StyleSheet, Text } from 'react-native'
import { Image, View } from 'react-native-animatable'
import Button from '../../components/Button'
import { useSafeAreaInsets } from 'react-native-safe-area-context';



const DATA = [
    {
        title: "Main dishes",
        data: ["Pizza", "Burger", "Risotto"]
    },
    {
        title: "Sides",
        data: ["French Fries", "Onion Rings", "Fried Shrimps"]
    },
    {
        title: "Drinks",
        data: ["Water", "Coke", "Beer"]
    },
    {
        title: "Desserts",
        data: ["Cheese Cake", "Ice Cream"]
    }
];


const Item = ({ title }) => (
    <View style={styles.item}>
        <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={{ flex: 1 }}>
                <Image
                    style={{width:80,height:70 }}
                    source={require('../../../assets/pizza.jpg')}
                />
            </View>
            <View style={{ flex: 3 }}>
                <Text style={styles.title}>{title}</Text>
            </View>

        </View>


    </View>
);

export const Restaurant = ({ navigation }) => {
    const { top: paddingTop } = useSafeAreaInsets();
    return (


        <View style={{ flex: 1, paddingTop, flexDirection: "column" }}>

            <View style={{ flex: 2 }}>
                <Image
                    style={styles.logo}
                    source={require('../../../assets/pizza.jpg')}
                />
                <Text> RESTAURANTE </Text>
                <Button title="Product" onPress={() => navigation.navigate('Product')} />

            </View>

            <View style={{ flex: 3 }}>
                <SectionList
                    sections={DATA}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({ item }) => <Item title={item} />}
                    renderSectionHeader={({ section: { title } }) => (
                        <Text style={styles.header}>{title}</Text>
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
    item: {
        backgroundColor: "#f9c2ff",
        padding: 20,
        marginVertical: 8
    },
    header: {
        fontSize: 32,
        backgroundColor: "#fff"
    },
    title: {
        fontSize: 24
    }
});
