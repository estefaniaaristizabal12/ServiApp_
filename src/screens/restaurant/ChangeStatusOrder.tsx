import React, { useState } from 'react'
import {
  Image, ScrollView, StyleSheet, Text, View
} from 'react-native'

import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Colors } from '../../constants/colors'

import { useIsFocused } from '@react-navigation/native'
import { normalize } from '../../../FontNormalize'
import HeaderNavigation from '../../components/HeaderNavigation'
import IconButton from '../../components/IconButton'
import LineDivider from '../../components/LineDivider'
import TextButton from '../../components/TextButton'
import TextIconButton from '../../components/TextIconButton'
import status from '../../constants/status'

import {
  getDatabase, onValue, ref,
  update
} from 'firebase/database'
import { Alert } from 'react-native'
import { images } from '../../../images'
import * as UserService from '../../services/UserService'
import app from '../firebaseConfig'

const db = getDatabase(app)

const ChangeStatusOrder = ({ navigation, route }) => {
  const isFocused = useIsFocused()
  const insets = useSafeAreaInsets()

  const [currentStep, setCurrentStep] = useState(-1)
  const [order, setOrder] = useState<any>(null)

  React.useEffect(() => {
    if (isFocused) {
      console.log('ChangeStatusOrder')
      if (!route.params['order']) return
      setOrder(route.params['order'])
      const statusRef = ref(db, 'Ordenes/' + route.params['order'].id)
      onValue(statusRef, snapshot => {
        const data = snapshot.val()
        if (!data) return // return si se borro la orden en rt db
        setCurrentStep(data.Estado)
      })
    }
  }, [isFocused])

  const changeStatus = () => {
    UserService.getOrder(order.id).then(order => {
      const statusRef = ref(db, 'Ordenes/' + route.params['order'].id)
      update(statusRef, {
        Estado: 2,
        IdDomiciliario: order.Domiciliario
      })
    })
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
            onPress={() => navigation.goBack()}
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
          {new Date(
            new Date(order?.Fecha).getTime() + 15 * 60000
          ).toUTCString()}
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
          {status.map((item, index) => {
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
                {index < status.length - 1 && (
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
        {currentStep === 1 && (
          <View style={{ flexDirection: 'row', height: 55 }}>
            {/* Productos */}
            <TextButton
              buttonContainerStyle={{
                width: '40%',
                borderRadius: 8,
                backgroundColor: Colors.lightGray2
              }}
              label='Productos'
              labelStyle={{ color: Colors.primary }}
              onPress={() => navigation.navigate('ListProductsR', { order })}
            />
            {/* Cambiar estado*/}
            <TextIconButton
              containerStyle={{
                flex: 1,
                marginLeft: 12,
                borderRadius: 12,
                backgroundColor: Colors.primary
              }}
              label='Orden Entregada'
              labelStyle={{
                color: Colors.white,
                fontSize: normalize(16)
              }}
              onPress={() => changeStatus()}
            />
          </View>
        )}
        {currentStep > 1 && currentStep < 4 && (
          <TextButton
            buttonContainerStyle={{ height: 55, borderRadius: 12 }}
            label='Llamar al Domiciliario'
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

export default ChangeStatusOrder
