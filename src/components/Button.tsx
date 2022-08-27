import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import { Colors } from '../constants/colors';

const Button = ({title, onPress = () => {}}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={{
        height: 55,
        borderRadius: 15,
        width: '100%',
        backgroundColor: Colors.logo,
        marginVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{color: Colors.white, fontWeight: 'bold', fontSize: 18}}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;