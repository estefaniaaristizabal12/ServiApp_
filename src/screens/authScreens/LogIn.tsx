import React from 'react'
import { Text, View , Alert,Keyboard } from 'react-native';
import Button from '../../components/Button';
import { SafeAreaView } from 'react-native-safe-area-context'
import Input from '../../components/Input';
import { Colors } from '../../constants/colors';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../components/Loader';



export const LogIn = ({ navigation }) => {


    
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const handleCreateAccount = () => {
    createUserWithEmailAndPassword(auth, email, password)
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
  }

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log('Signed in!')
      const user = userCredential.user;
      console.log(user)
      navigation.navigate('BottomTab');
    })
    .catch(error => {
      console.log(error)
    })
  }

  

  const [inputs, setInputs] = React.useState({ email: '', password: '' });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);


  const validate = async () => {
    Keyboard.dismiss();
    let isValid = true;
    if (!inputs.email) {
      handleError('Ingrese su correo electronico', 'email');
      isValid = false;
    }
    if (!inputs.password) {
      handleError('Ingrese su contraseña ', 'password');
      isValid = false;
    }
    if (isValid) {
      login();
    }
  };


  const login = () => {
    setLoading(true);

    setTimeout(async () => {
          setLoading(false);

          signInWithEmailAndPassword(auth, inputs.email, inputs.password)
          .then((userCredential) => {
            console.log('Signed in!')
            const user = userCredential.user;
            console.log(user)
            navigation.navigate('BottomTab');
          })
          .catch(error => {
            console.log(error)
          })

    }, 3000);
  };
  
  const handleOnchange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text})) ;
  };

  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };




  return (
    <SafeAreaView style={{ backgroundColor: Colors.white, flex: 1 }}>
     <Loader visible={loading} />
      <View style={{ paddingTop: 50, paddingHorizontal: 22 }}>
        <Text style={{ color: Colors.black, fontSize: 40, marginVertical: 40, fontWeight: 'bold', textAlign: 'center' }}>
          Bienvenido
        </Text>
        <Text style={{ color: Colors.grey, fontSize: 14, marginVertical: -30, textAlign: 'center' }}>
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
          <Button title="Iniciar sesión" 
          //  onPress={handleCreateAccount}  
          onPress={validate}
            />
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
