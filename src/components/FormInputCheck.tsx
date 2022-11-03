import { View, Text, Image } from 'react-native'
import React, { FunctionComponent } from 'react'
import { Colors } from '../constants/colors'
import { images } from '../../images'

type FormInputCheckProps = {
  value: string
  error: string
}

const FormInputCheck: FunctionComponent<FormInputCheckProps> = ({
  value,
  error
}) => {
  return (
    <View style={{ justifyContent: 'center' }}>
      <Image
        source={
          value === '' || (value !== '' && error === '')
            ? images.correct
            : images.cancel
        }
        style={{
          height: 20,
          width: 20,
          tintColor:
            value === ''
              ? Colors.grayItemCard
              : value !== '' && error === ''
              ? Colors.green
              : Colors.redError
        }}
      />
    </View>
  )
}

export default FormInputCheck
