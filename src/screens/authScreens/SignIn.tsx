import React from 'react'
import { SafeAreaView, ScrollView, Text, View , Keyboard, Alert} from 'react-native';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import Input from '../../components/Input';
import { Colors } from '../../constants/colors';
import Button from '../../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../components/Loader';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../firebaseConfig';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export const SignIn = ({ navigation }) => {




  

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);


  const [inputs, setInputs] = React.useState({
    email: '',
    fullname: '',
    phone: '',
    password: '',
  });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!inputs.email) {
      handleError('Ingrese un correo electronico', 'email');
      isValid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError('Ingrese un correo electronico valido', 'email');
      isValid = false;
    }

    if (!inputs.fullname) {
      handleError('Ingrese un nombre', 'fullname');
      isValid = false;
    }

    if (!inputs.phone) {
      handleError('Ingrese una Direccion valida', 'phone');
      isValid = false;
    }

    if (!inputs.password) {
      handleError('Ingrese una contraeña valida', 'password');
      isValid = false;
    } else if (inputs.password.length < 5) {
      handleError('Minimo contraeñas de 6 caracteres', 'password');
      isValid = false;
    }

    if (isValid) {
      register();
    }
  };

  const register = () => {
    setLoading(true);
    setTimeout(() => {
      try {
        setLoading(false);

        createUserWithEmailAndPassword(auth, inputs.email, inputs.password)
        .then((userCredential) => {
          console.log('Account created!')
          const user = userCredential.user;
          console.log(user)
          navigation.navigate('BottomTab');
    
        })
        .catch(error => {
          console.log(error)
          Alert.alert(error.message)
        })

      } catch (error) {
        Alert.alert('Error', 'Something went wrong');
      }
    }, 3000);
  };

  const handleOnchange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };
  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };

   
  return (

    <SafeAreaView style={{ backgroundColor: Colors.white, flex: 1 }}>

     <Loader visible={loading} />

      <ScrollView
        contentContainerStyle={{ paddingTop: 50, paddingHorizontal: 22 }}>
    
        <Text style={{ color: Colors.black, fontSize: 40, textAlign: 'center', fontWeight: 'bold' }}>
          Registrarse
        </Text>
        <Text style={{ color: Colors.grey, fontSize: 14, textAlign: 'center', marginVertical: 10 }}>
          Desea registrarte y disfrutar de multiples servicios?
        </Text>

        <KeyboardAwareScrollView
          keyboardDismissMode="on-drag"
          contentContainerStyle={{
            flexGrow: 1,

        }}>
         <View style={{ marginVertical: 20 }}>
          <Input
            onChangeText={text => handleOnchange(text, 'email')}
            onFocus={() => handleError(null, 'email')}
            iconName="email-outline"
            label="Correo electrónico"
            placeholder="Ingrese su correo electrónico"
            error={errors.email}

          />

          <Input
            onChangeText={text => handleOnchange(text, 'fullname')}
            onFocus={() => handleError(null, 'fullname')}
            iconName="account-outline"
            label="Nombre"
            placeholder="Ingrese su nombre completo"
            error={errors.fullname}
          />

          <Input
            keyboardType="numeric"
            onChangeText={text => handleOnchange(text, 'phone')}
            onFocus={() => handleError(null, 'phone')}
            iconName="phone-outline"
            label="Número telefónico"
            placeholder="Ingrese su número telefónico"
            error={errors.phone}
          />
          <Input
            onChangeText={text => handleOnchange(text, 'password')}
            onFocus={() => handleError(null, 'password')}
            iconName="lock-outline"
            label="Contraseña"
            placeholder="Ingrese su contraseña"
            error={errors.password}
            password
          />
          <Button title="Registrarse"  onPress={validate} />
          <Text
            onPress={() => navigation.navigate('LogIn')}
            style={{
              color: Colors.black,
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: 16,
            }}>
            Tienes una cuenta? Iniciar sesión
          </Text>
        </View>
      </KeyboardAwareScrollView>
      </ScrollView>
    </SafeAreaView>
  )
}
