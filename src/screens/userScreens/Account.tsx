import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView
} from 'react-native'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { Colors } from '../../constants/colors'
import Input2 from '../../components/input2'
import * as UserService from '../../services/UserService'
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { firebaseConfig } from '../firebaseConfig'
import HeaderNavigation from '../../components/HeaderNavigation'
import IconButton from '../../components/IconButton'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import TextButton from '../../components/TextButton'
import TextIconButton from '../../components/TextIconButton'
import * as AsyncStorage from '../../services/AsyncStorage'
import { useIsFocused } from '@react-navigation/native'

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export const Account = ({ navigation }) => {
  const isFocused = useIsFocused()
  const [user, setUser] = React.useState<any>({})
  const [statusOrder, setStatusOrder] = React.useState(1)

  const insets = useSafeAreaInsets()

  React.useEffect(() => {
    if(isFocused)
      getUser()
  }, [isFocused])

  const getUser = async () => {
    AsyncStorage.getUser()
      .then(data => {
        setUser(data)
        console.log('getUser', user)
      })
      .catch(error => {
        console.error(error)
      })
  }

  const editUser = async () => {
    UserService.update(
      user?.nombrecliente,
      user?.direccion1,
      user?.e_mail,
      user?.telefono,
      auth.currentUser.uid
    )
      .then(data => {
        console.log('editUser')
        const newUser = { ...user, ...data }
        console.log('newUser: ', newUser)
        AsyncStorage.saveUser(user).catch(error => console.error(error))
      })
      .catch(error => {
        console.error(error)
      })
  }

  const renderHeader = () => {
    return (
      <HeaderNavigation
        title="MI PERFIL"
        containerStyle={{
          height: 50,
          // marginHorizontal: SIZES.padding,
          marginTop: insets.top,
          marginLeft: -5
        }}
        titleStyle={{
          marginLeft: -30
        }}
        leftComponent={
          <IconButton
            icon={require('../../../assets/back.png')}
            containerStyle={styles.leftIconButton}
            iconStyle={{
              width: 16,
              height: 20,
              tintColor: Colors.gray2
            }}
            onPress={() => navigation.goBack()}
          />
        }
      />
    )
  }

  const renderFooter = () => {
    return (
      <View style={{ marginTop: 12, marginBottom: 24 }}>
        {statusOrder == 0 && (
          <View style={{ flexDirection: 'row', height: 55 }}>
            {/* Cancel */}

            <TextButton
              buttonContainerStyle={{
                width: '40%',
                borderRadius: 8,
                backgroundColor: Colors.lightGray2
              }}
              label="Cancelar"
              labelStyle={{ color: Colors.primary }}
              onPress={() => setStatusOrder(1)}
            />
            {/* MapView*/}
            <TextIconButton
              containerStyle={{
                flex: 1,
                marginLeft: 12,
                borderRadius: 12,
                backgroundColor: Colors.primary
              }}
              label="Guardar"
              labelStyle={{ color: Colors.white, fontSize: 16 }}
              icon={require('../../../assets/guardar.png')}
              iconPosition="LEFT"
              iconStyle={{
                width: 20,
                height: 20,
                marginRight: 8,
                tintColor: Colors.white
              }}
              onPress={() => setStatusOrder(1)}
            />
          </View>
        )}
        {statusOrder > 0 && (
          <TextButton
            buttonContainerStyle={{ height: 55, borderRadius: 12 }}
            label="Editar información"
            onPress={() => setStatusOrder(0)}
          />
        )}
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {renderHeader()}

      <View style={{ alignSelf: 'center' }}>
        <View style={styles.profileImage}>
          <Image
            source={require('../../../assets/robot.png')}
            style={styles.image}
            resizeMode="center"
          ></Image>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <Text
          style={[
            styles.text,
            { fontWeight: '200', fontSize: 30, textAlign: 'center' }
          ]}
        >
          {user?.nombrecliente}
        </Text>
        <Text style={[styles.text, { color: '#AEB5BC', fontSize: 14 }]}>
          Universidad Javeriana
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginVertical: 80, marginTop: 50 }}>
          <Input2
            iconName="email-outline"
            label="Correo Electrónico"
            placeholder={user?.e_mail}
            error
            password={false}
          />

          <Input2
            iconName="account-outline"
            label="Nombre"
            placeholder={user?.nombrecliente}
            error
            password={false}
          />

          <Input2
            iconName="account-outline"
            label="Dirección"
            placeholder={user?.direccion1}
            error
            password={false}
          />

          <Input2
            iconName="lock-outline"
            label="Contraseña"
            placeholder="***********"
            error //OJO ACA
            password
          />
        </View>
      </ScrollView>
      {renderFooter()}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 24
  },
  text: {
    fontFamily: 'HelveticaNeue',
    color: Colors.black
  },
  image: {
    flex: 1,
    width: 130,
    height: 130
  },
  titleBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    marginHorizontal: 16
  },
  subText: {
    fontSize: 12,
    color: '#AEB5BC',
    textTransform: 'uppercase',
    fontWeight: '500'
  },
  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 100,
    overflow: 'hidden'
  },
  dm: {
    backgroundColor: '#41444B',
    position: 'absolute',
    top: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  add: {
    backgroundColor: '#41444B',
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 40,
    height: 40,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  infoContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 16
  },
  statsContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 32
  },
  statsBox: {
    alignItems: 'center',
    flex: 1
  },
  mediaImageContainer: {
    width: 180,
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    marginHorizontal: 10
  },
  mediaCount: {
    backgroundColor: '#41444B',
    position: 'absolute',
    top: '50%',
    marginTop: -50,
    marginLeft: 30,
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    shadowColor: 'rgba(0, 0, 0, 0.38)',
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    shadowOpacity: 1
  },
  recent: {
    marginLeft: 78,
    marginTop: 32,
    marginBottom: 6,
    fontSize: 10
  },
  leftIconButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 20,
    borderColor: Colors.gray2
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16
  },
  activityIndicator: {
    backgroundColor: '#CABFAB',
    padding: 4,
    height: 12,
    width: 12,
    borderRadius: 6,
    marginTop: 3,
    marginRight: 20
  }
})

export default Account
