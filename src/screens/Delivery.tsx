import React from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
} from 'react-native';
import {
  FlatList,
  ScrollView,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../constants/colors';
import categories from '../constants/categories';
// import restaurant from '../constants/restaurant';
import Card from '../components/Card';
import useEffect from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { firebaseConfig } from './firebaseConfig';
import * as RestService from '../services/RestaurantService'
import * as UserService from "../services/UserService";
import { normalize } from '../../FontNormalize';


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


const {width} = Dimensions.get('screen');
const cardWidth = width / 2 - 20;


const Delivery = ({navigation}) => {

  const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(0);
  const [restaurant, setRestaurant] = React.useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = React.useState<any>({});
  const [filteredData, setFilteredData] = React.useState([]);
  const [user, setUser] = React.useState<any>({});

  const searchFilterFunction = (text) => {
    if(text){  
      const newData = restaurant.filter(item => {
          const itemData = item.Nombre ? item.Nombre.toUpperCase() : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
          })
      setFilteredData(newData);
    } else {
      setFilteredData(restaurant);
    }
  }

  React.useEffect(() => {
      if(!restaurant.length) getRestaurantes();
      if(JSON.stringify(user) === '{}') getUser();
  }, []);

    
  const getUser = async () => {
    UserService.getUser(auth.currentUser.uid)
      .then((data) => {
          const name_words = data?.nombrecliente.toLowerCase().split(" ");
          const name_normalized = name_words.map((word:any) => { 
               return word[0].toUpperCase() + word.substring(1) 
          }).join(" ");
          data.nombrecliente = name_normalized
          setUser(data);
          console.log("getUser", user)
      })
      .catch((error) => {
         console.error(error)
      });
  }

  const getRestaurantes = async () => {
    RestService.getRestaurants().
      then(data => {
        setFilteredData(data)
        setRestaurant(data)
      })
      .catch(error => console.error(error))
  };


  const ListCategories = () => {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={style.categoriesListContainer}>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => setSelectedCategoryIndex(index)}
            >
            <View
              style={{
                backgroundColor:
                  selectedCategoryIndex == index
                    ? Colors.primary1
                    : Colors.secondary1,
                ...style.categoryBtn,
              }}>
              <View style={style.categoryBtnImgCon}>
                <Image
                  source={category.image}
                  style={{height: 35, width: 35, resizeMode: 'cover'}}
                />
              </View>
              <Text
                style={{
                  fontSize: normalize(15),
                  fontWeight: 'bold',
                  marginLeft: 10,
                  color:
                    selectedCategoryIndex == index
                      ? Colors.white1
                      : Colors.primary1,
                }}>
                {category.name}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.white1}}>
        <StatusBar backgroundColor="#BABBC3" barStyle='dark-content' hidden={false} />
      <View style={style.header}>
        <View>
          <View style={{flexDirection: 'row', marginTop: 6}}>
            <Text style={{fontSize: normalize(28)}}>Hola,</Text>
            <Text style={{fontSize: normalize(28), fontWeight: 'bold', marginLeft: 10}}>
                {user?.nombrecliente ? user.nombrecliente.split(" ")[0]: ""} 
               {/* {auth.currentUser?.uid}  */}
            </Text>
          </View>
          <Text style={{marginTop: 5, fontSize: normalize(22), color: Colors.grey1}}>
            Ya puedes pedir tu domicilio
          </Text>
        </View>
        <Image
          source={require('../../assets/robot.png')}
          style={{height: 55, width: 55, borderRadius: 25, marginRight: 9}}
        />
      </View>
      <View
        style={{
          marginTop: 40,
          flexDirection: 'row',
          paddingHorizontal: 20,
        }}>
        <View style={style.inputContainer}>
          <Icon name="search" size={28} />
          <TextInput
            style={{flex: 1, fontSize: normalize(18)}}
            placeholder="Buscar un restaurante"
            onChangeText={(text) => searchFilterFunction(text)}
          />
        </View>
      </View>
      <View>
        <ListCategories />
      </View>

      <FlatList
            data={filteredData}
            renderItem={({ item }) => (
              <Card
                title={item.Nombre}
                image={item.Imagen}
                location={item.Localizacion}
                description={item.Descripcion}
                onPress={() => {
                  setSelectedRestaurant(item);
                  navigation.navigate('Restaurant', {selectedRestaurant: item});
                  }
                } 
              />
            )}
        />  

    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  inputContainer: {
    flex: 1,
    height: 50,
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: Colors.light1,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  sortBtn: {
    width: 50,
    height: 50,
    marginLeft: 10,
    backgroundColor: Colors.primary1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoriesListContainer: {
    paddingVertical: 30,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  categoryBtn: {
    height: 45,
    width: 165,
    marginRight: 7,
    borderRadius: 30,
    alignItems: 'center',
    paddingHorizontal: 5,
    flexDirection: 'row',
  },
  categoryBtnImgCon: {
    height: 35,
    width: 35,
    backgroundColor: Colors.white1,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    height: 220,
    width: cardWidth,
    marginHorizontal: 10,
    marginBottom: 20,
    marginTop: 50,
    borderRadius: 15,
    elevation: 13,
    backgroundColor: Colors.white1,
  },
  addToCartBtn: {
    height: 30,
    width: 30,
    borderRadius: 20,
    backgroundColor: Colors.primary1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Delivery;
