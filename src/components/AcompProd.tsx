import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Text, Image, View, StyleSheet, Dimensions, Button } from 'react-native'
import { normalize } from '../../FontNormalize'
import { CheckBox } from 'react-native-elements'
import { Colors } from '../constants/colors'

const { width, height } = Dimensions.get('screen')

const AcompProd = ({ title, precio, navigation }) => {
  const [checked, setChecked] = useState(false)
  return (
    <View style={styles.item}>
      <View>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ flex: 0.8 }}>
            <Text style={styles.titulo}>{title}</Text>
            <Text style={styles.precio}>+ ${precio}</Text>
          </View>
          <View style={{ flex: 0.2, alignItems: 'center' }}>
            <CheckBox
              checkedColor={Colors.primary1}
              checked={checked}
              onPress={() => {
                setChecked(!checked)
              }}
            />
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  logo: {
    width: Dimensions.get('window').width,
    height: 200
  },
  item: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    marginVertical: 6,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E7E7E7'
  },
  titulo: {
    fontSize: normalize(18),
    color: '#000000'
  },
  precio: {
    fontSize: normalize(17),
    fontWeight: 'bold',
    marginTop: 10
  }
})

export default AcompProd
