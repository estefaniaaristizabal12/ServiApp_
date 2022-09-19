import React, { FunctionComponent } from 'react';
import { Colors } from '../constants/colors';
import {
  View,
  Text,
  TextInputProps,
  TextInput,
  ViewStyle,
  StyleSheet,
  ViewComponent,
} from 'react-native';

import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

type FormInputProps = TextInputProps & {
  containerStyle: ViewStyle;
  label: string;
  inputStyle: ViewStyle;
  inputContainerStyle: ViewStyle;
  prependComponent: any;
  appendComponent: any;
  errorMsg: string;
  onChange: (text: string) => void;
};

const FormInput: FunctionComponent<FormInputProps> = ({
  containerStyle,
  label,
  placeholder,
  inputStyle,
  prependComponent,
  appendComponent,
  onChange,
  secureTextEntry,
  keyboardType = 'default',
  autoComplete = 'off',
  autoCapitalize = 'none',
  errorMsg = '',
  maxLength,
  inputContainerStyle,
}) => {
  return (
    <View style={{ ...containerStyle }}>
      {/* Label & Error msg */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ color: Colors.grayItemCard, fontSize:14 }}>{label}</Text>
        <Text style={{ color: Colors.redError, fontSize:14 }}>{errorMsg}</Text>
      </View>
      {/* Text input */}
      <View style={[styles.containerInput, { ...inputContainerStyle }]}>
        {prependComponent}
        <TextInput
          style={{
            flex: 1,
            ...inputStyle,
          }}
          placeholder={placeholder}
          placeholderTextColor={Colors.grayItemCard}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoComplete={autoComplete}
          autoCapitalize={autoCapitalize}
          onChangeText={text => onChange(text)}
          maxLength={maxLength}
        />
        {appendComponent}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerInput: {
    flexDirection: 'row',
    height: height > 800 ? 55 : 45,
    paddingHorizontal: 24,
    marginTop: height > 800 ? 8 : 0,
    borderRadius: 12,
    backgroundColor: Colors.lightGray2,
  },
});

export default FormInput;