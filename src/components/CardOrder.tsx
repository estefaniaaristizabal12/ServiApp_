import React, { useEffect } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Text, Image, View, StyleSheet, Dimensions } from 'react-native'
import { Colors } from '../constants/colors'
import { normalize } from '../../FontNormalize'

const { width, height } = Dimensions.get('screen')

const CardOrder = ({ item, navigation }) => {
  return (
    // navigation.navigate('Checkout', { card: selectedCard });

    // onPress={() => navigation.navigate('Product')}
    <View style={style.card}>
      <View style={{ flexDirection: 'column', flex: 1 }}>
        <View style={{ flexDirection: 'row', flex: 0.7 }}>
          <View style={style.cardImage}>
            <Image
              style={{
                width: '100%',
                height: 70,
                borderRadius: 2
              }}
              source={{ uri: item.Restaurante.Imagen }}
            />
          </View>
          <View
            style={{
              flex: 0.6,
              marginHorizontal: 12,
              overflow: 'hidden'
            }}
          >
            <Text style={style.cardTitle}>{item.Restaurante.Nombre}</Text>
            <Text style={style.cardFecha}>{item.Fecha}</Text>
          </View>
        </View>

        <View style={{ flex: 0.3, flexDirection: 'row' }}>
          <View style={style.btnOrdenes}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Details', { orderP: item })}
            >
              <Text style={style.textDetalle}>Detalle</Text>
            </TouchableOpacity>
          </View>
          <View style={style.btnOrdenes}>
            <TouchableOpacity onPress={() => navigation.navigate('HelpOrder')}>
              <Text style={style.textAyuda}>Ayuda</Text>
            </TouchableOpacity>
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
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: width / 1.1,
    marginHorizontal: 20,
    borderRadius: 20,

    height: height / 7,

    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2
    },
    shadowOpacity: 0.3,
    shadowRadius: 1.5
  },

  cardTitle: {
    fontWeight: 'bold',
    fontSize: normalize(20),
    marginLeft: 10
  },

  cardFecha: {
    fontSize: normalize(14),
    color: '#777',
    marginLeft: 10,
    marginTop: 5
  },

  cardImage: {
    flex: 0.3,
    alignContent: 'center',
    alignItems: 'center'
  },
  textDetalle: {
    fontSize: normalize(15),
    fontWeight: 'bold'
  },
  textAyuda: {
    fontSize: normalize(15),
    fontWeight: 'bold',
    color: Colors.primary1
  },
  btnOrdenes: {
    backgroundColor: '#F0F3FA',
    borderRadius: 5,
    margin: 2,
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default CardOrder
