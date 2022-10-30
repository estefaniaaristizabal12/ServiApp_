import React from 'react'
import { Text, View, Alert, Keyboard } from 'react-native'
import Button from '../../components/Button'
import { SafeAreaView } from 'react-native-safe-area-context'
import Input from '../../components/Input'
import { Colors } from '../../constants/colors'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from '../firebaseConfig'
import * as AsyncStorage from '../../services/AsyncStorage'
import Loader from '../../components/Loader'
import * as NotificationsService from '../../services/NotificationService'
import * as UserService from '../../services/UserService'

export const LogIn = ({ navigation }) => {
  const [email, setEmail] = React.useState<any>('')
  const [password, setPassword] = React.useState<any>('')
  const [user, setUser] = React.useState<any>(null)

  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app)

  const getUser = async (authData: any) => {
    UserService.getUser(auth.currentUser.uid)
      .then(data => {
        const name_words = data?.nombrecliente.toLowerCase().split(' ')
        const name_normalized = name_words
          .map((word: any) => {
            return word[0].toUpperCase() + word.substring(1)
          })
          .join(' ')
        data.nombrecliente = name_normalized
        const newUser = { ...data, ...authData }
        AsyncStorage.saveUser(newUser)
        setUser(data)
        if (data?.Rol == 'Domiciliario') {
          console.log('Entro Domiciliario')
          navigation.navigate('BottomTabDP')
        } else if (data?.Rol == 'Restaurante') {
          console.log('Entro Restaurante')
          navigation.navigate('BottomTabRP')
        } else {
          console.log('Entro Usuario')
          navigation.navigate('BottomTab')
        }
        setLoading(false)
      })
      .catch(error => {
        console.error(error)
      })
  }

  const [inputs, setInputs] = React.useState<any>({
    email: '',
    password: ''
  })
  const [errors, setErrors] = React.useState<any>({})
  const [loading, setLoading] = React.useState<any>(false)

  const validate = async () => {
    Keyboard.dismiss()
    let isValid = true
    if (!inputs.email) {
      handleError('Ingrese su correo electronico', 'email')
      isValid = false
    }
    if (!inputs.password) {
      handleError('Ingrese su contraseña ', 'password')
      isValid = false
    }
    if (isValid) {
      login()
    }
  }

  const login = () => {
    setLoading(true)
    signInWithEmailAndPassword(auth, inputs.email, inputs.password)
      .then(userCredential => {
        NotificationsService.updateToken(userCredential.user.uid)
        const userAuth = userCredential.user
        getUser(userAuth)
      })
      .catch(error => {
        console.error(error)
        Alert.alert('Algo salio mal...')
        setLoading(false)
      })
    console.log('Signed in!')
  }

  const handleOnchange = (text, input) => {
    setInputs(prevState => ({ ...prevState, [input]: text }))
  }

  const handleError = (error, input) => {
    setErrors(prevState => ({ ...prevState, [input]: error }))
  }

  return (
    <SafeAreaView style={{ backgroundColor: Colors.white, flex: 1 }}>
      <Loader visible={loading} />
      <View style={{ paddingTop: 50, paddingHorizontal: 22 }}>
        <Text
          style={{
            color: Colors.black,
            fontSize: 40,
            marginVertical: 40,
            fontWeight: 'bold',
            textAlign: 'center'
          }}
        >
          Bienvenido
        </Text>
        <Text
          style={{
            color: Colors.grey,
            fontSize: 14,
            marginVertical: -30,
            textAlign: 'center'
          }}
        >
          Ingrese y disfrute de múltiples servicios
        </Text>
        <View style={{ marginVertical: 80 }}>
          <Input
            onChangeText={text => handleOnchange(text, 'email')}
            //onChangeText={(text) => setEmail(text)}
            onFocus={() => handleError(null, 'email')}
            iconName="email-outline"
            label="Correo Electrónico"
            placeholder="Ingrese su correo electrónico"
            error={errors.email}
          />
          <Input
            //onChangeText={(text) => setPassword(text)}
            onChangeText={text => handleOnchange(text, 'password')}
            onFocus={() => handleError(null, 'password')}
            iconName="lock-outline"
            label="Contraseña"
            placeholder="Ingrese su contraseña"
            error={errors.password}
            password
          />
          <Button
            title="Iniciar sesión"
            //  onPress={handleCreateAccount}
            onPress={validate}
          />
          <Text
            onPress={() => navigation.navigate('SignIn')}
            style={{
              color: Colors.black,
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: 16
            }}
          >
            Nuevo en Serviapp? Registrate
          </Text>
          <Text
            onPress={() => navigation.navigate('RecoverPassword')}
            style={{
              color: Colors.primary1,
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: 16,
              marginTop: 9
            }}
          >
            Olvidaste tu Contrasela? Recupérala
          </Text>
        </View>
      </View>
    </SafeAreaView>
  )
}
