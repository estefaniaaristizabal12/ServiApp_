import React from 'react'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { StatusBar, StyleSheet, Text, View } from 'react-native'
import { Colors } from '../../constants/colors'
import { normalize } from '../../../FontNormalize'
import { FontAwesome5, Ionicons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { ProductsOrderRest } from '../../components/ProductsOrderRest'
import CartOrderRest from '../../components/CartOrderRest'

export default function ProductsRest({ navigation }) {
  const { top: paddingTop } = useSafeAreaInsets()
  return (
    <View style={{ flex: 1, backgroundColor: Colors.grey, paddingTop }}>
      <StatusBar
        backgroundColor="#BABBC3"
        barStyle="dark-content"
        hidden={false}
      />

      <View style={styles.header}>
        <View style={{ flex: 0.3, flexDirection: 'row' }}>
          {/* onPress={() => navigation.navigate('OrdersRest')} */}
          <TouchableOpacity style={styles.btnAtas}>
            <Ionicons name="arrow-back" size={25} color={Colors.gray} />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flex: 0.7,
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 10
          }}
        >
          <FontAwesome5 name="clipboard-list" size={25} />
          <Text style={styles.titulo}>Órden #1555</Text>
        </View>
      </View>

      <View
        style={{
          backgroundColor: Colors.white1,
          flex: 0.85,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30
        }}
      >
        <ProductsOrderRest></ProductsOrderRest>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    marginTop: 20,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    flex: 0.15
  },
  titulo: {
    fontSize: normalize(28),
    fontWeight: 'bold',
    marginLeft: 10
  },
  btnAtas: {
    marginLeft: 10,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    height: 30,
    width: 30
  }
})
