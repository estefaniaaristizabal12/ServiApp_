
import React, {useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Colors } from '../../constants/colors';
import { normalize } from '../../../FontNormalize';

const DATA = [
  {
    id: '1',
    bankName: 'Nu Bank',
    cardNo: '5535 6535 2345 3786',
    name: 'Julian Rizo',
    cvv: '123',
    expireDate: '11/19',
    image: require('../../../assets/visa.png'),
    bg_color:   Colors.primary1,
  },
  {
    id: '2',
    bankName: 'Nu Bank',
    cardNo: '5598 6545 4545 5686',
    name: 'Estefania Aristizabal',
    cvv: '123',
    expireDate: '11/19',
    image: require('../../../assets/masterCard.png'),
    bg_color: '#8961EE',
  },
  {
    id: '3',
    bankName: 'Bancolombia',
    cardNo: '5598 6545 4545 5456',
    name: 'Juan Jose Bolaños Melo',
    cvv: '123',
    expireDate: '11/19',
    image: require('../../../assets/masterCard.png'),
    bg_color: '#AC2DFE',
  },
];

const AboutUs = () => {
  
  const [details, setDetails] = useState([]);

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity onPress={() => setDetails(item)}>
        <View style={[styles.card, {backgroundColor: item.bg_color}]}>
          <Text style={{fontSize: normalize(18), fontWeight: 'bold', color: '#fff'}}>
            {item.bankName}
          </Text>
          <Text
            style={{
              fontSize: normalize(28),
              fontWeight: 'bold',
              color: '#fff',
              marginVertical: 40,
            }}>
            {item.cardNo}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: normalize(22), fontWeight: 'bold', color: '#fff'}}>
              {item.name}
            </Text>
            <Image
              source={item.image}
              style={{height: 60, width: 120, resizeMode: 'contain'}}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>

      <View style={{marginVertical: 40}}>
        <FlatList
          horizontal
          data={DATA}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <View style={{paddingHorizontal: 30}}>
        <Text style={styles.textLabel}>Número Tarjeta</Text>
        <View style={styles.textView}>
          <Text style={styles.text}>{details.cardNo}</Text>
        </View>
        <Text style={styles.textLabel}>Nombre</Text>
        <View style={styles.textView}>
          <Text style={styles.text}>{details.name}</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{width:'40%'}}>
            <Text style={styles.textLabel}>Expedición</Text>
            <View style={[styles.textView]}>
              <Text style={styles.text}>{details.expireDate}</Text>
            </View>
          </View>
          <View style={{width:'45%'}}>
            <Text style={styles.textLabel}>CVV</Text>
            <View style={[styles.textView]}>
              <Text style={styles.text}>{details.cvv}</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={[styles.textView, {backgroundColor: Colors.primary1, alignItems:'center', marginVertical:18}]}>
        <Text style={[styles.text, {color:'#fff'}]}>PAGAR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AboutUs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBFBFB',

  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: normalize(20),
    fontWeight: 'bold',
  },
  card: {
    width: 400,
    height: 225,
    marginHorizontal: 8,
    borderRadius: 14,
    padding: 20,
    marginTop: 20,
  },
  textLabel: {
    fontSize: normalize(20),
    fontWeight: 'bold',
    color: '#ccc',
  },
  textView: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 1,
    borderRadius: 10,
    marginVertical: 20,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  text: {
    fontSize: normalize(15),
    fontWeight: 'bold',
  },
});
