import React from 'react'
import { StatusBar, TouchableOpacity, Text, Dimensions, StyleSheet, View, Button } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { Colors } from '../../constants/colors';
import { StackScreenProps } from '@react-navigation/stack'
import { useNavigation } from '@react-navigation/native';
import { normalize } from '../../../FontNormalize';
import * as AsyncStorage from '../../services/AsyncStorage';

export const Splash = ({navigation}) => {
    const [user, setUser] = React.useState<any>(null)

    React.useEffect(() => {
      // AsyncStorage.clearUser().then(() => getUserAS());
      getUserAS();
    }, []);

    const getUserAS = async () => {
      AsyncStorage.getUser()
        .then(data => {
          setUser(data)
        })
    }

    const loggedNavigation = async () => {
      console.log("rol", user?.Rol)
      if (user?.Rol == 'Domiciliario') {
        console.log("Entro Domiciliario")
        navigation.navigate('BottomTabDP', {user: user});
      }
      else if (user?.Rol == 'Restaurante') {
        console.log("Entro Restaurante")
        navigation.navigate('BottomTabRP', {user: user});
      }
      else {
        navigation.navigate('BottomTab');
        // navigation.navigate('BottomTab', {user: data});
      }
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#4F1A24' barStyle="light-content" />
            <View style={styles.header}>
                <Animatable.Image
                    animation="bounceIn"
                    duration={4500}
                    source={require('../../../assets/logo.png')}
                    style={styles.logo}
                    resizeMode="stretch" />
            </View>
            <Animatable.View style={[styles.footer, {}]} animation="fadeInUpBig">
                <Text style={[styles.title, {}]}>Pide tu comida</Text>
                <Text style={[styles.title, {}]}>favorita Online</Text>
                <View style={styles.button}>
                    <TouchableOpacity onPress={()=>user?loggedNavigation():navigation.navigate('LogIn')}> 
                    {/* <TouchableOpacity onPress={()=>navigation.navigate('LogIn')}> */}

                        <LinearGradient
                            colors={[Colors.primary, Colors.secondary]}
                            style={styles.signIn}
                        >
                            <Text style={styles.textSign}>Ingresar</Text>
                        </LinearGradient>

                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </View>
    )
}



const { height } = Dimensions.get("screen");
const height_logo = height * 0.50;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#4F1A24'
    },
    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        flex: 0.8,
        backgroundColor: '#fff',
        borderTopLeftRadius: 26,
        borderTopRightRadius: 26,
        borderBottomLeftRadius: 26,
        borderBottomRightRadius: 26,
        paddingVertical: 50,
        paddingHorizontal: 30,
        marginTop: -50,
        marginLeft: 36,
        marginRight: 36,
        marginBottom: 60

    },
    logo: {
        width: height_logo,
        height: height_logo
    },
    title: {
        color: 'black',
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center'

    },
    text: {
        color: 'grey',
        textAlign: 'center',
        marginTop: 10
    },
    button: {
        alignItems: 'center',
        fontWeight: 'bold',
        marginTop: 40
    },
    signIn: {
        width: 150,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        flexDirection: 'row'
    },
    textSign: {
        color: 'white',
        fontSize: 21,
        fontWeight: 'bold'
    }
});
