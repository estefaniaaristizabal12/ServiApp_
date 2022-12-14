import React, { useState } from 'react'
import {
  Image, Linking, ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native'

import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Colors } from '../../../constants/colors'

import Moment from 'moment';

import { useIsFocused } from '@react-navigation/native'
import { normalize } from '../../../../FontNormalize'
import HeaderNavigation from '../../../components/HeaderNavigation'
import IconButton from '../../../components/IconButton'
import LineDivider from '../../../components/LineDivider'
import TextButton from '../../../components/TextButton'
import TextIconButton from '../../../components/TextIconButton'
import statusPickup from '../../../constants/statusPickup'

import { getDatabase, onValue, ref } from 'firebase/database'
import { Alert } from 'react-native'
import { images } from '../../../../images'
import * as RestaurantService from '../../../services/RestaurantService'
import * as UserService from '../../../services/UserService'
import app from '../../firebaseConfig'

const db = getDatabase(app)
Moment.locale('es');

const StatusOrderPickup = ({ navigation, route }) => {
  const isFocused = useIsFocused()
  const insets = useSafeAreaInsets()

  const [currentStep, setCurrentStep] = useState(-1)
  const [order, setOrder] = useState<any>(null)
  const [rest, setRest] = useState<any>(null)
  const [del, setDel] = useState<any>(null)

  React.useEffect(() => {
    if (!route.params['order']) return
    isFocused && setOrder(route.params['order'])
    getRest(route.params['order'])
    const statusRef = ref(db, 'Ordenes/' + route.params['order'].id)
    onValue(statusRef, snapshot => {
      const data = snapshot.val()
      if (!data) {
        setCurrentStep(3)
        return
      }
      setCurrentStep(data.Estado)
    })
  }, [isFocused])

  const getRest = (order: any) => {
    RestaurantService.getRestaurant(order.Restaurante)
      .then(data => {
        setRest(data)
      })
      .catch(error => {
        console.error("getRest", error)
      })
  }

  const callNumberWhitLinking = (number: any) => {
    Linking.openURL(`tel:${number}`).catch(error => console.error(error))
  }

  const goToWhatsapp = (number: any) => {
    Linking.openURL(`whatsapp://send?phone=${number}`).catch(error => console.error(error))
  }


  const renderHeader = () => {
    return (
      <HeaderNavigation
        title='ESTADO DE TU PEDIDO'
        containerStyle={{
          height: 50,
          // marginHorizontal: SIZES.padding,
          marginTop: insets.top,
          marginLeft: -5
        }}
        titleStyle={{
          marginLeft: -30
        }}
        leftComponent={
          <IconButton
            icon={images.back}
            containerStyle={styles.leftIconButton}
            iconStyle={{
              width: 16,
              height: 20,
              tintColor: Colors.gray2
            }}
            onPress={() => {
              // navigation.navigate("Orders")
              navigation.goBack()
            }}
          />
        }
      />
    )
  }

  const renderInfo = () => {
    return (
      <View style={{ marginTop: 12, paddingHorizontal: 24 }}>
        <Text
          style={{
            textAlign: 'center',
            color: Colors.gray,
            fontSize: normalize(14)
          }}
        >
          Estimamos Entrega
        </Text>

        <Text
          style={{
            textAlign: 'center',
            fontSize: normalize(22),
            color: Colors.black
          }}
        >
          {Moment(order?.Fecha).format('D MMM YYYY, h:mm a')}
        </Text>
      </View>
    )
  }

  const renderTrackOrder = () => {
    return (
      <View
        style={{
          marginTop: 24,
          paddingVertical: 24,
          borderRadius: 12,
          borderWidth: 2,
          borderColor: Colors.lightGray2,
          backgroundColor: Colors.white2
        }}
      >
        {/* Tracking Order */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 20,
            paddingHorizontal: 24
          }}
        >
          <Text style={{ fontSize: normalize(16), color: Colors.black }}>
            N??mero Pedido
          </Text>
          <Text style={{ color: Colors.gray, fontSize: normalize(16) }}>
            {order?.id}
          </Text>
        </View>
        <LineDivider />
        {/* Status */}
        <View
          style={{
            marginTop: 24,
            paddingHorizontal: 24
          }}
        >
          {statusPickup.map((item, index) => {
            return (
              <View key={`StatusList-${index}`} style={{}}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: -5
                  }}
                >
                  <Image
                    source={images.check_circle}
                    style={{
                      width: 40,
                      height: 40,
                      tintColor:
                        index <= currentStep
                          ? Colors.statusColor
                          : Colors.lightGray1
                    }}
                  />
                  <View style={{ marginLeft: 12 }}>
                    <Text
                      style={{
                        fontSize: normalize(16),
                        color: Colors.black
                      }}
                    >
                      {item.title}
                    </Text>
                    <Text
                      style={{
                        color: Colors.gray3,
                        fontSize: normalize(14)
                      }}
                    >
                      {item.sub_title}
                    </Text>
                  </View>
                </View>
                {index < statusPickup.length - 1 && (
                  <View>
                    {index < currentStep && (
                      <View
                        style={{
                          height: 50,
                          width: 3,
                          marginLeft: 18,
                          backgroundColor: Colors.statusColor,
                          zIndex: -1
                        }}
                      />
                    )}
                    {index >= currentStep && (
                      <Image
                        source={images.dotted_line}
                        style={{
                          width: 4,
                          height: 50,
                          marginLeft: 17
                        }}
                        resizeMode='cover'
                      />
                    )}
                  </View>
                )}
              </View>
            )
          })}
        </View>
      </View>
    )
  }

  const renderFooter = () => {
    return (
      <View style={{ marginTop: 12, marginBottom: 24 }}>
        {currentStep < statusPickup.length - 1 && currentStep != -2 && (
          <View style={{ flexDirection: 'row', height: 55 }}>
            {/* Cancel */}
            <TextButton
              buttonContainerStyle={{
                width: '40%',
                borderRadius: 8,
                backgroundColor: Colors.lightGray2
              }}
              label='WhatsApp'
              labelStyle={{ color: Colors.primary }}
              onPress={() => 
                goToWhatsapp(573175552995)
              }
            />
            {/* MapView*/}
            <TextIconButton
              containerStyle={{
                flex: 1,
                marginLeft: 12,
                borderRadius: 12,
                backgroundColor: Colors.primary
              }}
              label={del ? 'Llamar domiciliario' : 'Llamar restaurante'}
              labelStyle={{
                color: Colors.white,
                alignItems: 'center',
                marginTop: 3,
                fontSize: normalize(20)
              }}
              icon={images.ring_phone}
              iconPosition='LEFT'
              iconStyle={{
                width: 25,
                height: 25,
                marginRight: 5,
                tintColor: Colors.white
              }}
              onPress={() =>
                del
                  ? callNumberWhitLinking(del?.Telefono)
                  : callNumberWhitLinking(rest?.Telefono)
              }
            />
          </View>
        )}
        {currentStep === statusPickup.length - 1 && (
          <TextButton
            buttonContainerStyle={{ height: 55, borderRadius: 12 }}
            label='CALIFICAR PEDIDO'
            onPress={() =>
              navigation.navigate('OrdersStack', {
                screen: 'ServiceOrder',
                params: { order: order }
              })
            }
            // onPress={() => navigation.navigate('OrdersStack', {order: order})}
          />
        )}
        {currentStep === -2 && (
          <TextButton
            buttonContainerStyle={{ height: 55, borderRadius: 12 }}
            label='Pedido Cancelado'
            onPress={() => {
              navigation.navigate('Cart')
              navigation.navigate('Delivery')
              Alert.alert('El restaurante no tiene el producto en stock')
            }}
            // onPress={() => navigation.navigate('OrdersStack', {order: order})}
          />
        )}
      </View>
    )
  }

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
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 24
  },
  leftIconButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 20,
    borderColor: Colors.gray2
  }
})

export default StatusOrderPickup
