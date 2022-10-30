import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Text, Image, View, StyleSheet, Dimensions } from 'react-native'
import { normalize } from '../../FontNormalize'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const { width, height } = Dimensions.get('screen')

// { title, precio, cantidad, image }
export const ProductsOrderRest = () => {
  return (
    <View style={style.card}>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 0.3 }}>
          <Image
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 20,
              marginLeft: 5
            }}
            source={require('../../assets/pizza.jpg')}
          />
        </View>

        <View
          style={{
            flex: 0.65,
            marginHorizontal: 12,
            overflow: 'hidden'
          }}
        >
          <Text style={style.titulo}>Pizza Hawaiana</Text>
          <Text style={style.precio}>$8000</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 10,
              marginLeft: 10
            }}
          >
            <MaterialCommunityIcons
              name="alert-octagram"
              color="#ce0361"
              size={22}
            />
            <Text style={style.cantidad}>Cantidad: </Text>
            <Text style={{ fontSize: normalize(20) }}>5</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  card: {
    marginVertical: 10,
    backgroundColor: '#fff',
    // paddingVertical: 10,
    // paddingHorizontal: 15,
    width: width / 1.1,
    marginHorizontal: 20,
    borderRadius: 20,

    height: height / 8.5,

    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2
    },
    shadowOpacity: 0.3,
    shadowRadius: 1.5,
    paddingBottom: 10,
    paddingTop: 10
  },
  cardImage: {
    flex: 0.3
  },
  titulo: {
    fontSize: normalize(22),
    color: '#000000',
    marginLeft: 10,
    fontWeight: 'bold'
  },
  cantidad: {
    fontSize: normalize(20),
    marginLeft: 10,
    fontWeight: 'bold'
  },
  precio: {
    fontSize: normalize(20),
    marginLeft: 10,
    marginTop: 8
  }
})
