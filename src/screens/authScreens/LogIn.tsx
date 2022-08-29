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
          Desea ingresar y disfrutar de multiples servicios?
        </Text>
        <View style={{ marginVertical: 80 }}>
          <Input

            iconName="email-outline"
            label="Email"
            placeholder="Ingrese su email address"
            error  //OJO aca
            password
          />
          <Input
            //onChangeText={text => handleOnchange(text, 'password')}
            //onFocus={() => handleError(null, 'password')}
            iconName="lock-outline"
            label="Password"
            placeholder="Ingrese su password"
            error //OJO ACA
            password
          />
          <Button title="Log In" onPress={() => navigation.navigate('BottomTab')} />
          <Text
            onPress={() => navigation.navigate('SignUp')}
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
