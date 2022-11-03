import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { normalize } from '../../../../FontNormalize'
import CardLocation from '../../../components/CardLocation'
import { Colors } from '../../../constants/colors'

export const ChangeLocation = ({ navigation }) => {
  const { top: paddingTop } = useSafeAreaInsets()
  return (
    <View
      style={{
        flex: 1,
        paddingTop,
        flexDirection: 'column',
        backgroundColor: Colors.grey
      }}
    >
      <View style={styles.superior}>
        <View style={{ flex: 0.1, marginBottom: 30 }}>
          {/* onPress={() => navigation.navigate('Checkout')} */}
          <TouchableOpacity style={styles.btnAtas}>
            <Ionicons name="arrow-back" size={25} color={Colors.grey} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 0.8,
            alignItems: 'center',
            marginBottom: 30
          }}
        >
          <Text style={styles.textCheckOut}>Cambia tu ubicación </Text>
        </View>
      </View>

      <View
        style={{
          flex: 0.9,
          backgroundColor: 'white',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30
        }}
      >
        <TouchableOpacity
          style={{
            margin: 20,
            borderRadius: 40,
            borderWidth: 0.5,
            backgroundColor: Colors.grey
          }}
        >
          <Text style={{ fontSize: normalize(20), padding: 15 }}>
            Ingresa tu nueva ubicación
          </Text>
        </TouchableOpacity>

        <CardLocation></CardLocation>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  superior: {
    flex: 0.1,
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  btnAtas: {
    marginLeft: 25,
    backgroundColor: '#E7E7E7',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    height: 30,
    width: 30
  },
  textCheckOut: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white'
  },
  btnCambio: {
    backgroundColor: Colors.primary1,
    borderRadius: 50
  },
  textBtnCambio: {
    fontSize: 15,
    marginLeft: 12,
    marginRight: 12,
    fontWeight: 'bold',
    color: 'white',
    padding: 10
  },
  btnCambioUbi: {
    backgroundColor: Colors.primary,
    borderRadius: 50,
    padding: 4,
    marginTop: 6,
    alignItems: 'center'
  },
  btnTarjeta: {
    marginLeft: 10,
    backgroundColor: '#E7EDF1',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    height: 50,
    width: 50
  },
  costos: {
    fontSize: normalize(17),
    color: 'black',
    padding: 10
  },
  valores: {
    fontSize: 18,
    color: 'black',
    padding: 10,
    fontWeight: 'bold'
  },
  btnPedido: {
    backgroundColor: Colors.primary1,
    borderRadius: 30,
    margin: 15,
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnPedidoV: {
    backgroundColor: Colors.grey1,
    borderRadius: 30,
    margin: 15,
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textPedido: {
    fontSize: 18,
    marginLeft: 12,
    marginRight: 12,
    fontWeight: 'bold',
    color: 'white'
  }
})
