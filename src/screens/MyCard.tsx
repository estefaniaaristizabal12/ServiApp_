import React, { FunctionComponent, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import  HeaderNavigation from '../components/HeaderNavigation';
import IconButton from '../components/IconButton';
import CardItem from '../components/CardItem';
import TextButton from '../components/TextButton';
import { Colors } from '../constants/colors';
import dummyData from '../constants/dummyData';

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { firebaseConfig } from './firebaseConfig';
import * as UserService from '../services/UserService'

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


//type MyCardProps = StackScreenProps<MainParamType, 'MyCard'>;

const MyCard = ({ navigation, route }) => {

  const insets = useSafeAreaInsets();
  const [selectedCard, setSelectedCard] = useState<any>(null);
  const [cards, setCards] = useState<any>(null);

  React.useEffect(() => {
    console.log('Ejecutando useeffect mycard...');
    getCards()
  }, []);

  const getCards = async () => {
    UserService.getCards(auth.currentUser.uid)
      .then(data => {
        setCards(data);
        console.log("getCards: ", data)
      })
      .catch(error => {
        console.error("getCards: ", error)
      });
  };

  const renderHeader = () => {
    return (
      <HeaderNavigation
        title="Mis Tarjetas"
        containerStyle={{
          height: 50,
          marginHorizontal: 24,
          marginTop: insets.top,
        
        }}
        titleStyle={{}}
        leftComponent={
          <IconButton
            icon={ require('../../assets/back.png')}
            containerStyle={styles.leftIconButton}
            iconStyle={{
              width: 16,
              height: 20,
              tintColor: Colors.gray2,
            }}
            //onPress={() => navigation.goBack()}

            onPress={() => navigation.navigate('Cart')} 
          />
        }
        rightComponent={<View style={{ width: 40 }} />}
      />
    );
  };

  const renderMyCards = () => {
    return (
      <View>
        {dummyData.myCards.map((item, index) => {
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
          );
        })}
      </View>
    );
  };

  const renderAddNewCard = () => {
    return (
      <View style={{ marginTop: 24 }}>
        <Text style={{ fontSize: 16, color: Colors.black }}>Agregar Nueva Tarjeta</Text>
        {dummyData.allCards.map(item => {
          return (
            <CardItem
              key={`NewCard-${item.id}`}
              item={item}
              isSelected={
                `${selectedCard?.key}-${selectedCard?.id}` ===
                `NewCard-${item.id}`
              }
              onPress={() => setSelectedCard({ ...item, key: 'NewCard' })}
            />
          );
        })}
      </View>
    );
  };

  const renderFooter = () => {
    return (
      <View
        style={{
          paddingTop: 12,
          paddingBottom: 24,
          paddingHorizontal: 24,
        }}>
        <TextButton
          disabled={selectedCard === null}
          buttonContainerStyle={{
            height: 60,
            borderRadius: 12,
            backgroundColor:
              selectedCard === null ? Colors.grayItemCard : Colors.primary,
          }}
          label={selectedCard?.key === 'NewCard' ? 'Agregar' : 'Realizar Mi Pedido'}
          onPress={() => {
            if (selectedCard?.key === 'NewCard') {
              navigation.navigate('AddCard', {
                selectedCard,
              });
            } else {
              navigation.navigate('Checkout', { selectedCard });

            }
          }}
        />
      </View>
    );
  };

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
          paddingBottom: 12,
        }}>
        {/* My Cards */}
        {renderMyCards()}
        {/* Add New Card */}
        {renderAddNewCard()}
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
  },
  leftIconButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    borderColor: Colors.gray2,
  },
});

export default MyCard;
