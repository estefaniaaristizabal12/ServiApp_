//crear boton cerrar sesion con funcion de firebase

import { getAuth, signOut } from "firebase/auth";
import { View , Text, Button} from "react-native";
import { initializeApp } from 'firebase/app';

import { firebaseConfig } from '../firebaseConfig';




const app = initializeApp(firebaseConfig);
const auth = getAuth(app);



const cerrarSesion = () => {
    signOut(auth).then(() => {
        // Sign-out successful.
        console.log("salio");
    }).catch((error) => {
        // An error happened.
    });
}

const Profile = ({navigation}) => {


    return (
        <View>
            <Text>Profile</Text>
            <Text>{auth.currentUser.uid}</Text>
            <Button title="Cerrar sesión"              
              onPress={() => {
                  navigation.navigate('LogIn');
                  }
                }   />
            <Button title="Perfil"              
              onPress={() => {
                  navigation.navigate('Account');
                  }
                }   />
        </View>
    )
}


export default Profile
