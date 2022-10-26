import {
  View,
  Text,
  BackHandler,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React, { FunctionComponent, useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../../constants/colors';


import TextButton from '../../components/TextButton';
import HeaderNavigation from '../../components/HeaderNavigation';
import IconButton from '../../components/IconButton';
import LineDivider from '../../components/LineDivider';
import TextIconButton from '../../components/TextIconButton';
import status from '../../constants/status';
import { normalize } from '../../../FontNormalize';
import { useIsFocused } from "@react-navigation/native";

import firebase from 'firebase/app';
import { firebaseConfig } from '../firebaseConfig';
import app from '../firebaseConfig';
import { getDatabase, onValue, ref } from 'firebase/database'
import { Alert } from 'react-native';
const db = getDatabase(app);

const StatusOrder = ({ navigation, route }) => {
  const isFocused = useIsFocused()
  const insets = useSafeAreaInsets();

  const [currentStep, setCurrentStep] = useState(-1);
  const [order, setOrder] = useState<any>(null);

  React.useEffect(() => {
    if(!route.params["order"]) return
    isFocused && setOrder(route.params["order"]);
    // isFocused && route.params["order"] && setCurrentStep(route.params["order"].Estado);

    const statusRef = ref(db, 'ordenes/' + route.params["order"].id);
    onValue(statusRef, (snapshot) => {
      const data = snapshot.val();
      setCurrentStep(data.estado);
    });
  }, [isFocused]);

  const renderHeader = () => {

    return (
      <HeaderNavigation
        title="ESTADO DE TU PEDIDO"
        containerStyle={{
          height: 50,
          // marginHorizontal: SIZES.padding,
          marginTop: insets.top,
          marginLeft: -5,

        }}
        titleStyle={{
          marginLeft: -30,
        }}
        leftComponent={
          <IconButton
            icon={require('../../../assets/back.png')}
            containerStyle={styles.leftIconButton}
            iconStyle={{
              width: 16,
              height: 20,
              tintColor: Colors.gray2,
            }}
            onPress={() => navigation.goBack()}
          />
        }

      />
    );
  };

  const renderInfo = () => {
    return (
      <View
        style={{ marginTop: 12, paddingHorizontal: 24 }}>
        <Text
          style={{ textAlign: 'center', color: Colors.gray, fontSize: normalize(14) }}>
          Estimamos Entrega
        </Text>

        <Text style={{ textAlign: 'center', fontSize: normalize(22), color: Colors.black }}>
          27 Sep 2022 / 12:30PM
        </Text>
      </View>
    );
  };

  const renderTrackOrder = () => {
    return (
      <View
        style={{
          marginTop: 24,
          paddingVertical: 24,
          borderRadius: 12,
          borderWidth: 2,
          borderColor: Colors.lightGray2,
          backgroundColor: Colors.white2,

        }}>
        {/* Tracking Order */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 20,
            paddingHorizontal: 24,
          }}>
          <Text style={{ fontSize: normalize(16), color: Colors.black }}>Numero Pedido</Text>
          <Text style={{ color: Colors.gray, fontSize: normalize(16) }}>{order?.id}</Text>
        </View>
        <LineDivider

        />
        {/* Status */}
        <View
          style={{
            marginTop: 24,
            paddingHorizontal: 24,
          }}>
          {status.map((item, index) => {
            return (
              <View key={`StatusList-${index}`} style={{}}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: -5,
                  }}>
                  <Image
                    source={require('../../../assets/check_circle.png')}
                    style={{
                      width: 40,
                      height: 40,
                      tintColor:
                        index <= currentStep
                          ? Colors.statusColor
                          : Colors.lightGray1,
                    }}
                  />
                  <View style={{ marginLeft: 12 }}>
                    <Text style={{ fontSize: normalize(16), color: Colors.black }}>
                      {item.title}
                    </Text>
                    <Text style={{ color: Colors.gray3, fontSize: normalize(14) }}>
                      {item.sub_title}
                    </Text>
                  </View>
                </View>
                {index < status.length - 1 && (
                  <View>
                    {index < currentStep && (
                      <View
                        style={{
                          height: 50,
                          width: 3,
                          marginLeft: 18,
                          backgroundColor: Colors.statusColor,
                          zIndex: -1,
                        }}
                      />
                    )}
                    {index >= currentStep && (
                      <Image
                        source={require('../../../assets/dotted_line.png')}
                        style={{ width: 4, height: 50, marginLeft: 17 }}
                        resizeMode="cover"
                      />
                    )}
                  
                  </View>
                )}
              </View>
            );
          })}
        </View>
      </View>
    );
  };

  const renderFooter = () => {
    return (
      <View style={{ marginTop: 12, marginBottom: 24 }}>
        {currentStep < status.length - 1 && currentStep != -2 && (
          <View style={{ flexDirection: 'row', height: 55 }}>
            {/* Cancel */}
            <TextButton
              buttonContainerStyle={{
                width: '40%',
                borderRadius: 8,
                backgroundColor: Colors.lightGray2,
              }}
              label="Cancelar"
              labelStyle={{ color: Colors.primary }}
              onPress={() => navigation.navigate('FoodDetail')}
            />
            {/* MapView*/}
            <TextIconButton
              containerStyle={{
                flex: 1,
                marginLeft: 12,
                borderRadius: 12,
                backgroundColor: Colors.primary ,
              }}
              label="Mapa"
              labelStyle={{ color: Colors.white, fontSize: normalize(16) }}
              icon={require('../../../assets/map.png')}
              iconPosition="LEFT"
              iconStyle={{
                width: 25,
                height: 25,
                marginRight: 8,
                tintColor: Colors.white,
              }}
              onPress={() => navigation.navigate('Map')}
            />
          </View>
        )}
        {currentStep === status.length - 1 && (
          <TextButton
            buttonContainerStyle={{ height: 55, borderRadius: 12 }}
            label="CALIFICAR PEDIDO"
            onPress={() => navigation.navigate('OrdersStack', {screen:'ServiceOrder', params: {order: order}})}
            // onPress={() => navigation.navigate('OrdersStack', {order: order})}
          />
        )}
        {currentStep === -2 && (
          <TextButton
            buttonContainerStyle={{ height: 55, borderRadius: 12 }}
            label="Pedido Cancelado"
            onPress={() => {
              navigation.navigate('Cart'); 
              navigation.navigate('Delivery')
              Alert.alert('El restaurante no tiene el producto en stock')
            }}
            // onPress={() => navigation.navigate('OrdersStack', {order: order})}
          />
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      {renderHeader()}
      {/* Info */}
      {renderInfo()}
      {/* Track Order */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderTrackOrder()}
      </ScrollView>
      {/* Footer */}
      {renderFooter()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 24,
  },
  leftIconButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 20,
    borderColor: Colors.gray2,
  },
});

export default StatusOrder;
