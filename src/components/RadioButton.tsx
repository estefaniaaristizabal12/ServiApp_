import React, { FunctionComponent } from 'react'
import { Colors } from '../constants/colors'
import {
  ViewStyle,
  StyleSheet,
  View,
  TextStyle,
  Image,
  Text,
  TouchableOpacity
} from 'react-native'
import { images } from '../../images'

type RadioButtonProps = {
  containerStyle: ViewStyle
  label: string
  labelStyle: TextStyle
  iconStyle: ViewStyle
  isSelected: boolean
  onPress: () => void
}

const RadioButton: FunctionComponent<RadioButtonProps> = ({
  containerStyle,
  label,
  labelStyle,
  iconStyle,
  isSelected,
  onPress
}) => {
  return (
    <TouchableOpacity
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center'
        },
        { ...containerStyle }
      ]}
      onPress={onPress}
    >
      <Image
        source={
          isSelected
            ? require(images.check)
            : require(images.check_off)
        }
        style={{ marginLeft: 5, width: 20, height: 20, ...iconStyle }}
      />
      <Text
        style={{
          marginLeft: 12,
          color: Colors.grayItemCard,
          fontSize: 16
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 2,
    width: '100%',
    backgroundColor: Colors.lightGray2
  }
})

export default RadioButton
