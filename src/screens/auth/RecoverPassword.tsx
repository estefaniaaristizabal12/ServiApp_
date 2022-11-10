// create a new file in the same directory, name it RecoverPassword.tsx

import { initializeApp } from 'firebase/app'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import React, { useState } from 'react'
import {
  Alert,
  SafeAreaView, StyleSheet, Text, View
} from 'react-native'
import Button from '../../components/Button'
import Input from '../../components/Input'
import { Colors } from '../../constants/colors'
import { firebaseConfig } from '../firebaseConfig'

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export default function RecoverPassword({ navigation }) {
  const [email, setEmail] = useState('')

  const handleRecoverPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        Alert.alert(
          'Se ha enviado un correo a tu Email para recuperar tu contraseña'
        )
        navigation.navigate('LogIn')
      })
      .catch(error => {
        console.log(error)
        Alert.alert('Este correo no esta relacionado con ninguna cuenta')
      })
  }

  // return (
  //     <View style={styles.container}>
  //     <Text style={styles.title}>Recover Password</Text>
  //     <TextInput
  //         style={styles.input}
  //         placeholder="Email"
  //         value={email}
  //         onChangeText={setEmail}
  //     />
  //     <TouchableOpacity style={styles.button} onPress={handleRecoverPassword}>
  //         <Text style={styles.buttonText}>Recover Password</Text>
  //     </TouchableOpacity>
  //     </View>
  // )

  return (
    <SafeAreaView style={{ backgroundColor: Colors.white, flex: 1 }}>
      <View style={{ paddingTop: 90, paddingHorizontal: 22 }}>
        <Text
          style={{
            color: Colors.black,
            fontSize: 40,
            marginVertical: 40,
            fontWeight: 'bold',
            textAlign: 'center'
          }}
        >
          ¿No recuerdas tu contraseña?
        </Text>
        <Text
          style={{
            color: Colors.grey,
            fontSize: 14,
            marginVertical: -30,
            textAlign: 'center'
          }}
        >
          ¡No te preocupes! Ingresa tu correo electrónico y te enviaremos un
          correo
        </Text>
        <View style={{ marginVertical: 70 }}>
          <Input
            onChangeText={setEmail}
            //onChangeText={(text) => setEmail(text)}
            iconName="email-outline"
            label="Correo Electrónico"
            placeholder="Ingresa tu correo electrónico"
          />
          <Button
            title="Enviar correo"
            //  onPress={handleCreateAccount}
            onPress={handleRecoverPassword}
          />
          <Text
            onPress={() => navigation.navigate('LogIn')}
            style={{
              color: Colors.black,
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: 15
            }}
          >
            ¿Recuerdas tu contraseña? Inicia Sesión
          </Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16
  },
  button: {
    width: '80%',
    height: 40,
    backgroundColor: '#333',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16
  },

  buttonText: {
    color: '#fff',
    fontSize: 16
  }
})

//
