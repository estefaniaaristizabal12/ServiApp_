import React from 'react'
import { Text, View, StyleSheet, Dimensions } from 'react-native'
import { Colors } from '../constants/colors'
import { FontAwesome5 } from '@expo/vector-icons'
import { normalize } from '../../FontNormalize'

const { width, height } = Dimensions.get('screen')
export const CardLocation = () => {
  return (
    <View style={styles.contenedor}>
      <View style={{ flexDirection: 'row' }}>
        <View
          style={{
            flex: 0.2,
            alignItems: 'center',
            alignContent: 'center',
            justifyContent: 'center',
            height: height / 12
          }}
        >
          <FontAwesome5 name="map-pin" size={28} color="black" />
        </View>

        <View
          style={{
            flexDirection: 'column',
            flex: 0.65,
            height: height / 12
          }}
        >
          <Text
            style={{
              fontSize: normalize(20),
              marginLeft: 15,
              marginTop: 15
            }}
          >
            Edificio de Ingeniería
          </Text>
          <Text
            style={{
              fontSize: normalize(18),
              marginLeft: 15,
              marginTop: 5,
              color: Colors.grey1
            }}
          >
            Piso 5
          </Text>
        </View>

        <View
          style={{
            flex: 0.15,
            height: height / 12,
            backgroundColor: 'red'
          }}
        ></View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  contenedor: {
    borderTopColor: Colors.gray,
    borderBottomColor: Colors.gray,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    width: width / 1.1,
    marginHorizontal: 20,
    height: height / 12
  }
})

export default CardLocation
