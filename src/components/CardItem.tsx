import React, { FunctionComponent } from 'react'
import {
  View,
  Text,
  ViewStyle,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  Image,
  Platform
} from 'react-native'
import { normalize } from '../../FontNormalize'
import { Colors } from '../constants/colors'
import { images } from '../../images'

// id: 1,
//     name: 'Master Card',
//     icon: require('../assets/icons/mastercard.png'),
//     card_no: '1234',

type CardItemProps = {
  item: {
    Nombre: string
    id: string
    Imagen: string
    NumeroTarjeta: string
  }
  isSelected: boolean
  key: string
  onPress: () => void
}

const CardItem: FunctionComponent<CardItemProps> = ({
  item,
  isSelected,
  onPress
}) => {
  return (
    <TouchableOpacity
      style={{
        ...styles.container,
        borderColor: isSelected ? Colors.secondaryItemCard : Colors.lightGray2
      }}
      onPress={onPress}
    >
      {/* Card Image */}
      <View>
        <Image
          source={{ uri: item.Imagen }}
          resizeMode="center"
          style={{
            width: 35,
            height: 35
          }}
        />
      </View>
      {/* Name */}
      <Text style={styles.name}>{item.Nombre}</Text>
      {/* Radio Button */}
      <Image
        source={
          isSelected
            ? images.check
            : images.check_off
        }
        style={{
          width: 25,
          height: 25
        }}
      />
    </TouchableOpacity>
  )
}

export default CardItem

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 100,
    alignItems: 'center',
    marginTop: 12,
    paddingHorizontal: 24,
    borderWidth: 2,
    borderRadius: 12
  },
  imageContainer: {
    width: 60
  },
  name: {
    flex: 1,
    marginLeft: 12,
    fontSize: normalize(16),
    color: Colors.black
  }
})
