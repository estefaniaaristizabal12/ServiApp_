import React from "react";
import { Image, ImageBackground, View, Text, ScrollView, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import DrawerItem from "../../components/DrawerItem";
import { Colors } from "../../constants/colors";
const { Dimensions } = require("react-native");
const { width, height } = Dimensions.get('window');

const Profile = () => (
    <View style={styles.container}>
        <ImageBackground source={require('../../../assets/person.png')}>
            <View style={styles.topContainer}>
                <View style={styles.topDetails}>
                    <Image style={styles.profile} source={require('../../../assets/person.png')} />
                    <View>
                        <Text style={styles.name}>Estefania Aristizabal</Text>
                        <View style={styles.row}>
                            <Icon name="map-marker"  size={15} style={styles.icon} />
                            <Text style={styles.locationText}>Universidad Javeriana, Bogota</Text>
                        </View>
                    </View>
                </View>
            </View>
        </ImageBackground>
        <ScrollView>
            <View style={styles.itemContainer}>
                <DrawerItem iconName="account" text="Mi Cuenta" pro />
                <DrawerItem iconName="swap-horizontal" text="Transacciones" />
                <DrawerItem iconName="credit-card-check" text="Datos De Facturación" />
                <DrawerItem iconName="account-multiple" text="Quiero Ser Aliado" />
                <View style={styles.line} />
                <DrawerItem iconName="bell-ring" text="Notificación" notification />
                <DrawerItem iconName="shield-link-variant" text="Privacidad " />
                <DrawerItem iconName="information" text="Sobre Nestra App" />
            </View>
        </ScrollView>
        <View style={styles.bottomContainer}>
            <Text style={styles.appName}>ServiApp</Text>
            <Text style={styles.versionText}>Version 1.0.0</Text>
        </View>
    </View>
)


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topContainer: {
        backgroundColor: 'rgba(118, 13, 39, 0.9)',
        height: height / 5,
        justifyContent: 'flex-end',
        padding: 15,
    },
    topDetails: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profile: {
        width: 70,
        height: 70,
        borderRadius: 50,
        marginRight: 15,
        borderColor: Colors.white,
        borderWidth: 2,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    name: {
        color: Colors.white,
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 2,
    },
    locationText: {
        color: Colors.white,
        fontSize: 14,
        fontWeight: '500',
    },
    icon: {
        color: Colors.white,
        marginRight: 5,
    },
    itemContainer: {
        marginTop: 10,
    },
    line: {
        backgroundColor: Colors.lightGrey,
        height: 2,
        marginHorizontal: 15,
        marginVertical: 20,
    },
    bottomContainer: {
        alignItems: 'center',
        marginBottom: 15,
    },
    appName: {
        color: Colors.grey,
        fontSize: 16,
        fontWeight: 'bold',
    },
    versionText: {
        color: Colors.grey,
        fontSize: 14,
        fontWeight: '500',
    },
});

export default Profile;