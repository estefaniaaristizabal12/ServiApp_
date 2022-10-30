import React, { FunctionComponent } from 'react'
import {
  ViewStyle,
  TouchableOpacity,
  Image,
  ImageStyle,
  ImageSourcePropType
} from 'react-native'
import { Colors } from '../constants/colors'

type IconButtonProps = {
  containerStyle: ViewStyle
  icon: ImageSourcePropType
  iconStyle: ImageStyle
  onPress: () => void
}

const IconButton: FunctionComponent<IconButtonProps> = ({
  containerStyle,
  icon,
  iconStyle,
  onPress
}) => {
  return (
    <TouchableOpacity style={containerStyle} onPress={onPress}>
      <Image
        source={icon}
        style={{
          width: 30,
          height: 30,
          tintColor: Colors.white,
          ...iconStyle
        }}
      />
    </TouchableOpacity>
  )
}

export default IconButton
