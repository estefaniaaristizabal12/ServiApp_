import React from 'react'
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import Input from '../../components/Input';
import { Colors } from '../../constants/colors';
import Button from '../../components/Button';

export const SignIn = ({ navigation }) => {

  const [inputs, setInputs] = React.useState({
    email: '',
    fullname: '',
    phone: '',
    password: '',
  });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  return (
    <SafeAreaView style={{ backgroundColor: Colors.white, flex: 1 }}>

      <ScrollView
        contentContainerStyle={{ paddingTop: 50, paddingHorizontal: 22 }}>
        <Text style={{ color: Colors.black, fontSize: 40, textAlign: 'center', fontWeight: 'bold' }}>
          Registrarse
        </Text>
        <Text style={{ color: Colors.grey, fontSize: 14, textAlign: 'center', marginVertical: 10 }}>
          Desea registrarte y disfrutar de multiples servicios?
        </Text>
        <View style={{ marginVertical: 20 }}>
          <Input
            //onChangeText={text => handleOnchange(text, 'email')}
            //onFocus={() => handleError(null, 'email')}
            iconName="email-outline"
            label="Email"
            placeholder="Ingrese su email address"
            error
            password
          />

          <Input
            //onChangeText={text => handleOnchange(text, 'fullname')}
            //onFocus={() => handleError(null, 'fullname')}
            iconName="account-outline"
            label="Nombre"
            placeholder="Ingrese su nombre completo"
            error
            password
          />

          <Input
            keyboardType="numeric"
            //onChangeText={text => handleOnchange(text, 'phone')}
            //onFocus={() => handleError(null, 'phone')}
            iconName="phone-outline"
            label="Numero Telefonico"
            placeholder="Ingrese su numero Telefonico"
            error
            password
          />
          <Input
            //onChangeText={text => handleOnchange(text, 'password')}
            //onFocus={() => handleError(null, 'password')}
            iconName="lock-outline"
            label="Password"
            placeholder="Ingrese su password"
            error
            password
          />
          <Button title="Registrarse" />
          <Text
            onPress={() => navigation.navigate('Login')}
            style={{
              color: Colors.black,
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: 16,
            }}>
            Tienes una cuenta? Iniciar sesión
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
