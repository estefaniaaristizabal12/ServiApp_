import { View, Text, BackHandler, Image, StyleSheet } from 'react-native';
import React, { FunctionComponent, useEffect } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import TextButton from '../components/TextButton';
import { Colors } from '../constants/colors';



const Confirmation = ({ navigation, route }) => {

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        return true;
      },
    );
    return backHandler.remove();
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image
          source={require ('../../assets/confirmation2.png')}
          resizeMode="contain"
          style={{ width: 160, height: 160 }}
        />
        <Text
          style={{
            marginTop: 24,
            fontSize: 30,
            color: Colors.black,
          }}>
          Felicitaciones!
        </Text>
        <Text
          style={{
            textAlign: 'center',
            marginTop: 8,
            color: Colors.darkGray,
            fontSize: 16,
          }}>
          El pago se realizo correctamente!
        </Text>
      </View>
      <TextButton
        label="Ver Pedido"
        buttonContainerStyle={{
          height: 55,
          marginBottom: 24,
          borderRadius: 12,
          backgroundColor: Colors.primary,
        }}
        onPress={() => navigation.navigate('StatusOrder', { order: route.params.order })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: Colors.white,
  },
});

export default Confirmation;