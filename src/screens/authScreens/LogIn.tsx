import React from 'react'
import { Text, View } from 'react-native';
import Button from '../../components/Button';
import { SafeAreaView } from 'react-native-safe-area-context'
import Input from '../../components/Input';
import { Colors } from '../../constants/colors';
export const LogIn = ({ navigation }) => {

  const [inputs, setInputs] = React.useState({ email: '', password: '' });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  return (
    <SafeAreaView style={{ backgroundColor: Colors.white, flex: 1 }}>

      <View style={{ paddingTop: 50, paddingHorizontal: 22 }}>
        <Text style={{ color: Colors.black, fontSize: 40, marginVertical: 40, fontWeight: 'bold', textAlign: 'center' }}>
          Bienvenido
        </Text>
        <Text style={{ color: Colors.grey, fontSize: 14, marginVertical: -30, textAlign: 'center' }}>
          Ingrese y disfrute de múltiples servicios
        </Text>
        <View style={{ marginVertical: 80 }}>
          <Input

            iconName="email-outline"
            label="Correo Electrónico"
            placeholder="Ingrese su correo electrónico"
            error 
            password
          />
          <Input
            //onChangeText={text => handleOnchange(text, 'password')}
            //onFocus={() => handleError(null, 'password')}
            iconName="lock-outline"
            label="Contraseña"
            placeholder="Ingrese su contraseña"
            error //OJO ACA
            password
          />
          <Button title="Iniciar sesión" onPress={() => navigation.navigate('BottomTab')} />
          <Text
            onPress={() => navigation.navigate('SignIn')}
            style={{
              color: Colors.black,
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: 16,
            }}>
            Nuevo en Serviapp? Registrate
          </Text>
        </View>
      </View>
    </SafeAreaView>
  )
}
