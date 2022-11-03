import React, { useEffect, useState } from 'react'
import {
  Image, ImageBackground,
  Platform, StyleSheet, Text, View
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import FormInput from '../components/FormInput'
import FormInputCheck from '../components/FormInputCheck'
import HeaderNavigation from '../components/HeaderNavigation'
import IconButton from '../components/IconButton'
import RadioButton from '../components/RadioButton'
import TextButton from '../components/TextButton'
import { Colors } from '../constants/colors'

import { images } from '../../images'
import utils from '../constants/Utils'

const AddCard = ({ navigation, route }) => {
  const insets = useSafeAreaInsets()
  const [selectedCard, setSelectedCard] = useState<null>(null)
  const [cardNumber, setCardNumber] = useState('')
  const [cardNumberError, setCardNumberError] = useState('')
  const [cardName, setCardName] = useState('')
  const [cardNameError, setCardNameError] = useState('')
  const [expireDate, setExpireDate] = useState('')
  const [expireDateError, setExpireDateError] = useState('')
  const [cvv, setCvv] = useState('')
  const [cvvError, setCvvError] = useState('')
  const [isRemember, setIsRemember] = useState(false)

  useEffect(() => {
    let { selectedCard } = route.params
    setSelectedCard(selectedCard)
    console.log('selectedCard: ', selectedCard)
  }, [])

  const renderHeader = () => {
    return (
      <HeaderNavigation
        title="Agregar Nueva Tarjeta"
        containerStyle={{
          height: 50,
          marginHorizontal: 24,
          marginTop: insets.top
        }}
        titleStyle={{}}
        leftComponent={
          <IconButton
            icon={images.back}
            containerStyle={styles.leftIconButton}
            iconStyle={{
              width: 16,
              height: 20,
              ...Platform.select({
                android: { marginRight: 4 }
              }),
              tintColor: Colors.gray2
            }}
            onPress={() => navigation.goBack()}
          />
        }
        rightComponent={<View style={{ width: 40 }} />}
      />
    )
  }

  const renderCard = () => {
    return (
      <ImageBackground
        source={images.card}
        style={{
          height: 200,
          width: '100%',
          marginTop: 12,
          borderRadius: 12,
          overflow: 'hidden'
        }}
      >
        {/* Logo */}
        <Image
          source={selectedCard?.icon}
          resizeMode="contain"
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            height: 40,
            width: 80
          }}
        />
        {/* Details */}
        <View style={styles.details}>
          <Text style={{ fontSize: 16, color: Colors.white }}>{cardName}</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text
              style={{
                flex: 1,
                color: Colors.white,
                fontSize: 16
              }}
            >
              {cardNumber}
            </Text>
            <Text style={{ color: Colors.white, fontSize: 16 }}>
              {expireDate}
            </Text>
          </View>
        </View>
      </ImageBackground>
    )
  }

  const isEnableAddCard = () => {
    return Boolean(
      cardNumber !== '' &&
        cardName !== '' &&
        expireDate !== '' &&
        cvv !== '' &&
        cardNumberError === '' &&
        cardNameError === '' &&
        expireDateError === '' &&
        cvvError === ''
    )
  }

  const renderFooter = () => {
    return (
      <View
        style={{
          paddingTop: 12,
          paddingBottom: 24,
          paddingHorizontal: 24
        }}
      >
        <TextButton
          disabled={!isEnableAddCard()}
          buttonContainerStyle={{
            height: 60,
            borderRadius: 12,
            backgroundColor: isEnableAddCard()
              ? Colors.primary
              : Colors.transparentPrimary
          }}
          label={'Agregar Tarjeta'}
          onPress={() => {
            // navigation.goBack();
            //navigation.navigate('Checkout', { selectedCard });
            navigation.navigate('Confirmation')
          }}
        />
      </View>
    )
  }

  const renderForms = () => {
    return (
      <View style={{ marginTop: 24 * 2 }}>
        {/* Card Number */}
        <FormInput
          label="Número de la tarjeta"
          keyboardType="number-pad"
          value={cardNumber}
          onChange={value => {
            setCardNumber(
              value
                .replace(/\s/g, '')
                .replace(/(\d{4})/g, '$1 ')
                .trim()
            )
            utils.validateInput(
              value,
              Platform.OS === 'android' ? 16 : 19,
              setCardNumberError
            )
          }}
          maxLength={Platform.OS === 'android' ? 16 : 19}
          errorMsg={cardNumberError}
          appendComponent={
            <FormInputCheck value={cardNumber} error={cardNumberError} />
          }
        />
        {/* Cardholder Name */}
        <FormInput
          label="Nombre De Tarjeta"
          value={cardName}
          containerStyle={{ marginTop: 12 }}
          onChange={value => {
            utils.validateInput(value, 1, setCardNameError)
            setCardName(value)
          }}
          errorMsg={cardNameError}
          appendComponent={
            <FormInputCheck value={cardName} error={cardNumberError} />
          }
        />
        {/* Expire Date & CVV */}
        <View style={{ flexDirection: 'row', marginTop: 12 }}>
          <FormInput
            label="Fecha de caducidad"
            value={expireDate}
            placeholder={'MM/YY'}
            maxLength={5}
            containerStyle={{
              flex: 1
            }}
            onChange={value => {
              utils.validateInput(value, 5, setExpireDateError)
              setExpireDate(value)
            }}
            appendComponent={
              <FormInputCheck value={expireDate} error={expireDateError} />
            }
          />
          <FormInput
            label="CVV"
            value={cvv}
            // placeholder={'123'}
            keyboardType="number-pad"
            maxLength={3}
            containerStyle={{
              flex: 1,
              marginLeft: 12
            }}
            onChange={value => {
              utils.validateInput(value, 3, setCvvError)
              setCvv(value)
            }}
            appendComponent={<FormInputCheck value={cvv} error={cvvError} />}
          />
        </View>
        {/* Remember */}
        <View style={{ alignItems: 'flex-start', marginTop: 24 }}>
          <RadioButton
            isSelected={isRemember}
            onPress={() => setIsRemember(!isRemember)}
            label="Recuerdame esta tarjeta."
          />
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      {renderHeader()}
      {/* Cards */}
      <KeyboardAwareScrollView
        keyboardDismissMode="on-drag"
        contentContainerStyle={{
          flexGrow: 1,
          // marginTop: SIZES.radius,
          paddingHorizontal: 24
          // paddingBottom: SIZES.radius,
        }}
      >
        {/* Card */}
        {renderCard()}
        {/* Forms */}
        {renderForms()}
      </KeyboardAwareScrollView>
      {/* Footer */}
      {renderFooter()}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  leftIconButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    borderColor: Colors.gray2
  },
  details: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    paddingHorizontal: 24
  }
})

export default AddCard
