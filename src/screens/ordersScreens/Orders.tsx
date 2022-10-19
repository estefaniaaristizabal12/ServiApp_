import React from 'react'
import { Text, View, FlatList, StyleSheet } from 'react-native';
import CardOrder from '../../components/CardOrder'
import { Colors } from '../../constants/colors'
// import orders from '../../constants/orders'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { normalize } from '../../../FontNormalize';
import { useIsFocused } from "@react-navigation/native";
import * as UserService from '../../services/UserService'
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { firebaseConfig } from '../firebaseConfig';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const Orders = ({ navigation }) => {
  const isFocused = useIsFocused()
  const { top: paddingTop } = useSafeAreaInsets();

  const [orders, setOrders] = React.useState<any>(null);

  React.useEffect(() => {
    if (isFocused) {
      getOrders();
    }
  }, [isFocused]);

  const getOrders = async () => {
    UserService.getOrders("Usuario", auth.currentUser.uid)
      .then(data => {
        setOrders({ ...data });
      })
      .catch(error => {
        console.error("getOrders: ", error)
      });
  };

  return (
    <View style={{ flex: 1, paddingTop, flexDirection: "column", backgroundColor: Colors.grey }}>


      <View style={{ flex: 0.2, }}>
        <Text style={styles.textoInicio}>Historial de</Text>
        <Text style={styles.textoInicio2}>pedidos</Text>
        <Text style={styles.textoDescripcion}>Encuentra aquí tus pedidos y servicios anteriores</Text>
      </View>

      <View style={{ flex: 0.8, borderTopLeftRadius: 30, borderTopRightRadius: 30, backgroundColor: "white" }}>

        <FlatList
          data={orders}
          renderItem={({ item }) => (
            <CardOrder
              title={item.Restaurante.Nombre}
              fecha={item.Fecha}
              image={item.Restaurante.Imagen}
              navigation={navigation}
            />
          )}
        />
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  textoInicio: {
    fontSize: normalize(35),
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
    marginLeft: 20
  },
  textoInicio2: {
    fontSize: normalize(35),
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 20
  },
  textoDescripcion: {
    marginLeft: 20,
    marginTop: 20,
    fontSize: normalize(18),
    color: 'white',

  },

});
