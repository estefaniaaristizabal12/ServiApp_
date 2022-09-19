import React, { FunctionComponent } from 'react';
import { Colors } from '../constants/colors';
import {
  View,
  Text,
  StyleSheet,
  TextStyle,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';


type TextButtonProps = {
  label: string;
  label2?: string;
  labelStyle2?: TextStyle;
  labelStyle: TextStyle;
  buttonContainerStyle: ViewStyle;
  onPress: () => void;
  disabled?: boolean;
};

const TextButton: FunctionComponent<TextButtonProps> = ({
  label,
  label2 = '',
  labelStyle2,
  labelStyle,
  buttonContainerStyle,
  onPress,
  disabled,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primaryItemCard,
        ...buttonContainerStyle,
      }}>
      <Text style={{ color: Colors.white,  fontSize: 16 , ...labelStyle }}>
        {label}
      </Text>
      {label2 != '' && (
        <Text
          style={{ flex: 1, textAlign: 'right', fontSize: 16, ...labelStyle2 }}>
          {label2}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default TextButton;