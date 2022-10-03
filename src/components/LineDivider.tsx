import React, { FunctionComponent } from 'react';
import { ViewStyle, StyleSheet, View } from 'react-native';
import { Colors } from '../constants/colors';


type LineDividerProps = {
  lineStyle?: ViewStyle;
};

const LineDivider: FunctionComponent<LineDividerProps> = ({ lineStyle }) => {
  return <View style={[styles.container, { ...lineStyle }]} />;
};

const styles = StyleSheet.create({
  container: {
    height: 2,
    width: '100%',
    backgroundColor: Colors.lightGray2,
  },
});

export default LineDivider;