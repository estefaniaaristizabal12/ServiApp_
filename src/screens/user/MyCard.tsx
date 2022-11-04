import React, { useState } from 'react'
import {
  ScrollView,
  StatusBar, StyleSheet, Text, View
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import CardItem from '../../components/CardItem'
import CardItemNewCard from '../../components/CardItemNewCard'
import HeaderNavigation from '../../components/HeaderNavigation'
import IconButton from '../../components/IconButton'
import TextButton from '../../components/TextButton'
import { Colors } from '../../constants/colors'
import dummyData from '../../constants/dummyData'

import { useIsFocused } from '@react-navigation/native'
import { normalize } from '../../../FontNormalize'
import { images } from '../../../images'
import * as AsyncStorage from '../../services/AsyncStorage'
import * as UserService from '../../services/UserService'



//type MyCardProps = StackScreenProps<MainParamType, 'MyCard'>;

const MyCard = ({ navigation, route }) => {
  const isFocused = useIsFocused()

  const insets = useSafeAreaInsets()
  const [selectedCard, setSelectedCard] = useState<any>(null)
  const [cards, setCards] = useState<any>([])
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState(false)

  React.useEffect(() => {
    // if (isFocused) {
    if (route.params?.profile) {
      setProfile(route.params.profile)
    }
    console.log('Ejecutando useeffect mycard...')
    getUser()
    // }
  }, [isFocused])

  const getUser = async () => {
    AsyncStorage.getUser()
      .then(data => {
        setUser(data)
        getCards(data)
      })
      .catch(error => {
        console.error(error)
      })
  }
  const getCards = async (user: any) => {
    UserService.getCards(user?.uid)
      .then(data => {
        setCards(data)
        // console.log('getCards: ', data)
      })
      .catch(error => {
        console.error('getCards: ', error)
      })
  }

  const renderHeader = () => {
    return (
      <HeaderNavigation
        title="Mis Tarjetas"
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
              tintColor: Colors.gray2
            }}
            //onPress={() => navigation.goBack()}

            onPress={() => {
              profile ?
                navigation.goBack() :
                navigation.navigate('Checkout', { card: selectedCard })
            }}
          />
        }
        rightComponent={<View style={{ width: 40 }} />}
      />
    )
  }

  const renderMyCards = () => {
    return (
      <View>
        <StatusBar
          backgroundColor="#FFFFFF"
          barStyle="dark-content"
          hidden={false}
        />
        {cards.map((item, index) => {
          return (
            <CardItem
              key={`MyCards-${index}`}
              item={item}
              isSelected={
                `${selectedCard?.key}-${selectedCard?.id}` ===
                `MyCard-${item.id}`
              }
              onPress={() => setSelectedCard({ ...item, key: 'MyCard' })}
            />
          )
        })}
      </View>
    )
  }

  const renderAddNewCard = () => {
    return (
      <View style={{ marginTop: 24 }}>
        <Text style={{ fontSize: normalize(16), color: Colors.black }}>
          Agregar Nueva Tarjeta
        </Text>
        {dummyData.allCards.map(item => {
          return (
            <CardItemNewCard
              key={`NewCard-${item.id}`}
              item={item}
              isSelected={
                `${selectedCard?.key}-${selectedCard?.id}` ===
                `NewCard-${item.id}`
              }
              onPress={() => setSelectedCard({ ...item, key: 'NewCard' })}
            />
          )
        })}
      </View>
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
          disabled={selectedCard === null}
          buttonContainerStyle={{
            height: 60,
            borderRadius: 12,
            backgroundColor:
              selectedCard === null ? Colors.grayItemCard : Colors.primary
          }}
          label={
            profile ? selectedCard?.key === 'NewCard' ? 'Agregar' : 'Eliminar' : selectedCard?.key === 'NewCard' ? 'Agregar' : 'Realizar Mi Pedido'
          }
          onPress={() => {
            if (profile) {
              if (selectedCard?.key === 'NewCard') {
                navigation.navigate('AddCard', {selectedCard})
              } else {
                console.log("klñjfs", selectedCard?.id, user?.uid)
                UserService.delCard(selectedCard?.id, user?.uid)
                  .then(data => {
                    getCards(user)
                    console.log(data)
                  })
                  .catch(error => {
                    console.error("delCard", error)
                  })
              }
            }
            else{
              if (selectedCard?.key === 'NewCard') {
                navigation.navigate('AddCard', {
                  selectedCard
                })
              } else {
                navigation.navigate('Checkout', {
                  card: selectedCard
                })
              }
            }
          }}
        />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      {renderHeader()}
      {/* Cards */}
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          marginTop: 12,
          paddingHorizontal: 24,
          paddingBottom: 12
        }}
      >
        {/* My Cards */}
        {renderMyCards()}
        {/* Add New Card */}
        {renderAddNewCard()}
      </ScrollView>
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
  }
})

export default MyCard
