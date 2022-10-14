import React from 'react'
import { Text, SafeAreaView, StatusBar, View, TextInput, StyleSheet } from 'react-native';
import { Image } from 'react-native-animatable';
import { Colors } from '../../constants/colors';
import { Icon } from 'react-native-paper/lib/typescript/components/Avatar/Avatar';
import { FlatList } from 'react-native-gesture-handler';
import { normalize } from '../../../FontNormalize';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { white } from 'react-native-paper/lib/typescript/styles/colors';
import CartOrderRest from '../../components/CartOrderRest';
export const OrdersRest = () => {

    const { top: paddingTop } = useSafeAreaInsets();
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.grey, paddingTop }}>
            <StatusBar backgroundColor="#BABBC3" barStyle='dark-content' hidden={false} />
            <View style={styles.header}>
                <View>
                    <View style={{ flexDirection: 'row', marginTop: 20 }}>
                        <Text style={{ fontSize: normalize(28) }}>Hola,</Text>
                        <Text style={{ fontSize: normalize(28), fontWeight: 'bold', marginLeft: 10 }}>
                            El Italiano
                            {/* {auth.currentUser?.uid}  */}
                        </Text>
                    </View>
                    <Text style={{ marginTop: 6, fontSize: normalize(22), color: Colors.grey1 }}>
                        Acá puedes ver tus nuevas ordenes
                    </Text>
                </View>
                <Image
                    source={require('../../../assets/italiano.jpg')}
                    style={{ height: 55, width: 55, borderRadius: 25, marginRight: 9 }}
                />
            </View>

            <View style={{backgroundColor: Colors.white1, flex:0.85, borderTopLeftRadius: 30, borderTopRightRadius: 30}}>
                <CartOrderRest></CartOrderRest>
                {/* <FlatList
                data={filteredData}
                renderItem={({ item }) => (
                    <Card
                        title={item.Nombre}
                        image={item.Imagen}
                        location={item.Localizacion}
                        description={item.Descripcion}
                        onPress={() => {
                            setSelectedRestaurant(item);
                            navigation.navigate('Restaurant', { selectedRestaurant: item });
                        }
                        }
                    />
                )}
            /> */}

            </View>


            

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20, 
        flex:0.15
    }

});