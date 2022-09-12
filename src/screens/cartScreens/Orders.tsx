import React from 'react'
import { Text, View, FlatList, StyleSheet } from 'react-native';
import CardOrder from '../../components/CardOrder'
import { Colors } from '../../constants/colors'
import orders from '../../constants/orders'

export const Orders = ({ navigation }) => {
  return (
    <View style={{ flex: 1, flexDirection: "column", backgroundColor: Colors.secondary }}>


      <View style={{ flex: 0.32, }}>
        <Text style={styles.textoInicio}>Historial de</Text>
        <Text style={styles.textoInicio2}>pedidos</Text>
        <Text style={styles.textoDescripcion}>Encuentra aquí tus pedidos y servicios anteriores</Text>
      </View>

      <View style={{ flex: 0.68, borderTopLeftRadius: 30, borderTopRightRadius: 30, backgroundColor: "white" }}>

        <FlatList
          data={orders}
          renderItem={({ item }) => (
            <CardOrder
              title={item.title}
              fecha={item.fecha}
              image={item.image}
              navigation={navigation}
            />
          )}
        />
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  textoInicio:{
    fontSize: 45,
    fontWeight:'bold',
    color:'white',
    marginTop:80,
    marginLeft:20
  },
  textoInicio2:{
    fontSize: 45,
    fontWeight:'bold',
    color:'white',
    marginLeft:20
  },
  textoDescripcion:{
    marginLeft:20, 
    marginTop:20,
    fontSize: 18,
    color:'white',


  }
    
});