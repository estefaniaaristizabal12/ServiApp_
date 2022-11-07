import { Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import CardProductOrder from '../../components/CardProductOrder'
import { Colors } from '../../constants/colors'

export const ListProductsR = ({ navigation, route }) => {
  const { top: paddingTop } = useSafeAreaInsets()
  const [selectedProducts, setSelectedProducts] = useState<null>(null)

  const [order, setOrder] = React.useState<any>(null)
  const [products, setProducts] = React.useState<any>(null)

  React.useEffect(() => {
    let { order } = route.params
    // console.log("order", Object.values(order.Carro))
    order && setOrder(order)
    order && setProducts(Object.values(order.Carro))
  }, [])

  return (
    <View
      style={{
        flex: 1,
        paddingTop,
        flexDirection: 'column',
        backgroundColor: Colors.grey
      }}
    >
      <View style={{ flex: 0.2 }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.btnAtas}
        >
          <Ionicons name="arrow-back" size={25} color={Colors.gray} />
        </TouchableOpacity>

        <Text style={styles.textoInicio}>{order?.Restaurante?.Nombre}</Text>
        <Text style={styles.textoFecha}>
          Esta es la lista de productos que pediste:{' '}
        </Text>
      </View>
      <View
        style={{
          flex: 0.8,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          backgroundColor: 'white',
          padding: 10
        }}
      >
        <FlatList
          data={products}
          renderItem={({ item }) => (
            <CardProductOrder
              title={item.Nombre}
              description={item.Descripcion}
              precio={item.Precio}
              image={item.Imagen}
              cantidad={item.Cantidad}
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
    fontStyle: 'italic'
  },
  btnAtas: {
    marginLeft: 20,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    height: 30,
    width: 30
  }
})
