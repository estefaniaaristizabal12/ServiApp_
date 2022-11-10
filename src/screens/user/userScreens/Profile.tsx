import React, { useEffect } from 'react'
import {
  Alert, Image, ScrollView,
  StyleSheet, Text, View
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { normalize } from '../../../../FontNormalize'
import DrawerItem from '../../../components/DrawerItem'
import { Colors } from '../../../constants/colors'

import { useIsFocused } from '@react-navigation/native'
import { initializeApp } from 'firebase/app'
import { getAuth, signOut } from 'firebase/auth'
import { images } from '../../../../images'
import * as AsyncStorage from '../../../services/AsyncStorage'
import { firebaseConfig } from '../../firebaseConfig'

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

const { Dimensions } = require('react-native')
const { width, height } = Dimensions.get('window')

const Profile = ({ navigation, route }) => {
  const isFocused = useIsFocused()
  const [user, setUser] = React.useState<any>(null)

  useEffect(() => {
    if(isFocused){
    console.log("Profile")
    getUser()
    }
  }, [isFocused])

  const getUser = async () => {
    AsyncStorage.getUser()
      .then(data => {
        setUser(data)
        console.log('getUser', data.uid)
      })
      .catch(error => {
        console.error(error)
      })
  }

  const activateNotifications = () => {
    Alert.alert('Activar notificaciones')

  }


  const cerrarSesion = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        auth.signOut().catch(error => console.error(error))
        AsyncStorage.clearUser().catch(error => console.error(error))
        console.log('salio')
        Alert.alert('Se ha cerrado su sesion')
        navigation.navigate('LogIn')
      })
      .catch(error => {
        // An error happened.
        console.error(error)
      })
  }

  //create function delete user account firebase
  const deleteUser = () => {
    auth.currentUser
      .delete()
      .then(() => {
        // User deleted.
        AsyncStorage.clearUser().catch(error => console.error(error))
        console.log('borro')
        Alert.alert('Se ha eliminado su cuenta')
        navigation.navigate('LogIn')
      })
      .catch(error => {
        // An error happened.
        console.error(error)
      })
  }

  //create function delete user account firebase con alerta de confirmacion
  const deleteUserAlert = () => {
    Alert.alert(
      'Eliminar cuenta',
      '¿Está seguro que desea eliminar su cuenta?',
      [
        {
          text: 'Cancelar',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        { text: 'OK', onPress: () => deleteUser() }
      ],
      { cancelable: false }
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.topDetails}>
          <Image
            style={styles.profile}
            source={images.robot}
          />
          <View>
            <Text style={styles.name}>{user?.nombrecliente}</Text>
            <View style={styles.row}>
              <Icon name="map-marker" size={15} style={styles.icon} />
              <Text style={styles.locationText}>{user?.direccion1}</Text>
            </View>
          </View>
        </View>
      </View>

      <ScrollView>
        <View style={styles.itemContainer}>
          <DrawerItem
            iconName="account"
            text="Mi Cuenta"
            pro
            onPress={() => navigation.navigate('Account')}
          />
          <DrawerItem
            iconName="credit-card-check"
            text="Métodos de Pago"
            onPress={() => navigation.navigate('MyCard', { profile: true })}
          />
          <DrawerItem
            iconName="account-multiple"
            text="Cerrar Sesión"
            //cerrar sesion y ir a login
            onPress={() => cerrarSesion()}
          />
          <View style={styles.line} />
          <DrawerItem iconName="bell-ring" 
          text="Notificación" 
          notification
          onPress={() => activateNotifications()}
           />
          <DrawerItem
            iconName="delete"
            text="Eliminar Cuenta "
            //eliminar cuenta y ir a login
            onPress={() => deleteUserAlert()}
          />
          <DrawerItem iconName="information" text="Sobre Nuestra App" />
        </View>
      </ScrollView>
      <View style={styles.bottomContainer}>
        <Text style={styles.appName}>ServiApp</Text>
        <Text style={styles.versionText}>Version 1.0.0</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  topContainer: {
    backgroundColor: 'rgba(118, 13, 39, 0.9)',
    height: height / 5,
    justifyContent: 'flex-end',
    padding: 15
  },
  topDetails: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  profile: {
    width: 70,
    height: 70,
    marginRight: 15
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  name: {
    color: Colors.white,
    fontSize: normalize(18),
    fontWeight: 'bold',
    marginBottom: 2
  },
  locationText: {
    color: Colors.white,
    fontSize: normalize(14),
    fontWeight: '500'
  },
  icon: {
    color: Colors.white,
    marginRight: 5
  },
  itemContainer: {
    marginTop: 20
  },
  line: {
    backgroundColor: Colors.lightGrey,
    height: 2,
    marginHorizontal: 15,
    marginVertical: 20
  },
  bottomContainer: {
    alignItems: 'center',
    marginBottom: 15
  },
  appName: {
    color: Colors.grey,
    fontSize: normalize(16),
    fontWeight: 'bold'
  },
  versionText: {
    color: Colors.grey,
    fontSize: normalize(14),
    fontWeight: '500'
  }
})

export default Profile
