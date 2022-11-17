import { initializeApp } from 'firebase/app'
import {
  getAuth
} from 'firebase/auth'
import React from 'react'
import {
  Alert, Keyboard, SafeAreaView,
  ScrollView,
  Text,
  View
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Button from '../../components/Button'
import Input from '../../components/Input'
import Loader from '../../components/Loader'
import { Colors } from '../../constants/colors'
import * as UserService from '../../services/UserService'
import { firebaseConfig } from '../firebaseConfig'

export const SignIn = ({ navigation }) => {
  const create = async (
    nameUsu: any,
    direction: any,
    email: any,
    pass: any,
    deviceToken: any,
    phone: any
  ) => {
    UserService.create(nameUsu, direction, email, pass, deviceToken, phone)
      .then(res => console.log('addcard', res))
      .catch(error => console.error(error))
  }

  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app)

  const [inputs, setInputs] = React.useState({
    email: '',
    fullname: '',
    phone: '',
    password: ''
  })
  const [errors, setErrors] = React.useState({})
  const [loading, setLoading] = React.useState(false)

  const validate = () => {
    Keyboard.dismiss()
    let isValid = true

    if (!inputs.email) {
      handleError('Ingresa tu correo electrónico', 'email')
      isValid = false
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError('Ingresa un correo electronico válido', 'email')
      isValid = false
    }

    if (!inputs.fullname) {
      handleError('Ingresa tu nombre', 'fullname')
      isValid = false
    }

    if (!inputs.phone) {
      handleError('Ingresa una dirección valida', 'phone')
      isValid = false
    }

    if (!inputs.password) {
      handleError('Ingresa una contraseña valida', 'password')
      isValid = false
    } else if (inputs.password.length < 5) {
      handleError('Minímo contraseñas de 6 caracteres', 'password')
      isValid = false
    }

    if (isValid) {
      register()
    }
  }

  const register = () => {
    setLoading(true)
    setTimeout(() => {
      try {
        setLoading(false)

        // createUserWithEmailAndPassword(auth, inputs.email, inputs.password)
        // .then((userCredential) => {
        //   console.log('Account created!')
        //   const user = userCredential.user;
        //   console.log(user)
        //   navigation.navigate('BottomTab');

        // })
        // .catch(error => {
        //   console.log(error)
        //   Alert.alert(error.message)
        // })

        create(
          inputs.fullname,
          inputs.phone,
          inputs.email,
          inputs.password,
          'token',
          inputs.phone
        )
        // navigation.navigate('BottomTab');
        Alert.alert('Se registró correctamente, inicie sesión')
        navigation.navigate('LogIn')
      } catch (error) {
        Alert.alert('Error: no se pudo registrar el usuario')
      }
    }, 3000)
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

      <ScrollView
        contentContainerStyle={{
          paddingTop: 41,
          paddingHorizontal: 22
        }}
      >
        <Text
          style={{
            color: Colors.black,
            fontSize: 40,
            textAlign: 'center',
            fontWeight: 'bold'
          }}
        >
          Registrarse
        </Text>
        <Text
          style={{
            color: Colors.grey,
            fontSize: 14,
            textAlign: 'center',
            marginVertical: 10
          }}
        >
          ¿Deseas registrarte y disfrutar de múltiples servicios?
        </Text>

        <KeyboardAwareScrollView
          keyboardDismissMode="on-drag"
          contentContainerStyle={{
            flexGrow: 1
          }}
        >
          <View style={{ marginVertical: 20 }}>
            <Input
              onChangeText={text => handleOnchange(text, 'email')}
              onFocus={() => handleError(null, 'email')}
              iconName="email-outline"
              label="Correo electrónico"
              placeholder="Ingresa tu correo electrónico"
              error={errors.email}
            />

            <Input
              onChangeText={text => handleOnchange(text, 'fullname')}
              onFocus={() => handleError(null, 'fullname')}
              iconName="account-outline"
              label="Nombre"
              placeholder="Ingresa tu nombre completo"
              error={errors.fullname}
            />

            <Input
              onChangeText={text => handleOnchange(text, 'direccion')}
              onFocus={() => handleError(null, 'fullname')}
              iconName="account-outline"
              label="Dirección"
              placeholder="Ingresa tu dirección"
              error={errors.fullname}
            />

            <Input
              keyboardType="numeric"
              onChangeText={text => handleOnchange(text, 'phone')}
              onFocus={() => handleError(null, 'phone')}
              iconName="phone-outline"
              label="Número telefónico"
              placeholder="Ingresa tu número telefónico"
              error={errors.phone}
            />
            <Input
              onChangeText={text => handleOnchange(text, 'password')}
              onFocus={() => handleError(null, 'password')}
              iconName="lock-outline"
              label="Contraseña"
              placeholder="Ingresa tu contraseña"
              error={errors.password}
              password
            />
            <Button title="Registrarse" onPress={validate} />
            <Text
              onPress={() => navigation.navigate('LogIn')}
              style={{
                color: Colors.black,
                fontWeight: 'bold',
                textAlign: 'center',
                fontSize: 16
              }}
            >
              ¿Ya tienes una cuenta? Inicia sesión
            </Text>
          </View>
        </KeyboardAwareScrollView>
      </ScrollView>
    </SafeAreaView>
  )
}
