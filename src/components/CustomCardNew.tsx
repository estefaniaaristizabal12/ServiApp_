import * as React from 'react';
import  {View,StyleSheet,Image,Text,TouchableOpacity} from 'react-native';

export const CustomCardNew = (props) => {
  return (
          <View style={[styles.container,props.style]}>
             {props.children}
          </View>);
}

const styles = StyleSheet.create({
  container:{
    // shadowColor: '#ADB7C3',
    shadowColor : "#666666",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 1,
    marginHorizontal: 20,
    marginVertical: 15,
  }
});