import React, { useState } from 'react'
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CardProductOrder from '../../components/CardProductOrder';
import products from '../../constants/products';

export const ListProducts = ({ navigation }) => {
  const { top: paddingTop } = useSafeAreaInsets();
  const [selectedProducts, setSelectedProducts] = useState<null>(null);
  

  return (
    <View style={{ flex: 1, paddingTop, flexDirection: "column", backgroundColor: Colors.grey }}>

      <View style={{ flex: 0.20 }}>

        <TouchableOpacity onPress={() => navigation.navigate('Details')} style={styles.btnAtas}>
          <Ionicons name="arrow-back" size={25} color={Colors.gray} />
        </TouchableOpacity>

        <Text style={styles.textoInicio}>La Central Cafetería</Text>
        <Text style={styles.textoFecha}>Esta es la lista de productos que pediste: </Text>

      </View>
      <View style={{ flex: 0.80, borderTopLeftRadius: 30, borderTopRightRadius: 30, backgroundColor: "white", padding: 10 }}>
        <FlatList
          data={products}
            renderItem={({ item }) => (
              <CardProductOrder
                title={item.name}
                description={item.description}
                precio={item.price}
                image={item.image}
                cantidad={5}
              />
            )}
        />

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  textoInicio: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 30,
    marginLeft: 20
  },
  textoFecha: {
    fontSize: 18,
    color: 'white',
    marginTop: 10,
    marginLeft: 20,
    fontStyle: "italic"
  },
  btnAtas: {
    marginLeft: 20,
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    height: 30,
    width: 30
  }

});
