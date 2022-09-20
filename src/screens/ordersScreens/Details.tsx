import React from 'react'
import { Text, View, StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Colors } from '../../constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const Details = ({ navigation }) => {
  const { top: paddingTop } = useSafeAreaInsets();
  return (
    <View style={{ flex: 1, paddingTop,flexDirection: "column", backgroundColor: Colors.grey }}>

      <View style={{ flex: 0.20 }}>

        <TouchableOpacity onPress={() => navigation.navigate('Orders')} style={styles.btnAtas}>
          <Ionicons name="arrow-back" size={25} color={Colors.gray} />
        </TouchableOpacity>

        <Text style={styles.textoInicio}>La Central Cafetería</Text>
        <Text style={styles.textoFecha}>05/02/2022</Text>

      </View>
      <View style={{ flex: 0.80, borderTopLeftRadius: 30, borderTopRightRadius: 30, backgroundColor: "white", padding: 10 }}>

        <Text style={styles.titulo}>Califica tu pedido </Text>

        <View style={{ flex: 0.15, marginTop: 10, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#E7E7E7', paddingBottom: 10 }}>
          <TouchableOpacity onPress={() => navigation.navigate('ServiceOrder')} >
            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}>
                <Image
                  style={{ width: 70, height: 70, borderRadius: 20 }}
                  source={require('../../../assets/calificacion.png')}
                />
              </View>
              <View style={{ flex: 0.7, marginLeft: 10, justifyContent: "center" }}>
                <Text style={styles.experiencia}>Cuéntanos por favor cómo fue tu experiencia con La Central Cafetería</Text>
              </View>

              <View style={{ flex: 0.1, alignItems: "center", justifyContent: "center" }}>
                <Ionicons name="chevron-forward-outline" size={25} color="black" />
              </View>

            </View>
          </TouchableOpacity>

        </View>

        <View style={{ flex: 0.15, marginTop: 10, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#E7E7E7', paddingVertical: 5 }}>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 0.5, justifyContent: "center" }}>
              <Text style={styles.titulo}>Productos</Text>
            </View>
            <View style={{ flex: 0.5, justifyContent: "center", alignItems: "center" }}>
              <TouchableOpacity style={styles.btnVerLista} onPress={() => navigation.navigate('ListProducts')}>
                <Text style={styles.verLista}>Ver lista</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={{ flex: 0.7, marginTop: 10 }}>
          <Text style={styles.titulo}>Detalles del pedido</Text>

          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <View style={{ flex: 0.1, alignItems: "center", justifyContent: "center" }}>
              <Ionicons name="location" size={25} color={Colors.primary} />
            </View>
            <View style={{ flex: 0.9, marginLeft: 10, justifyContent: "center" }}>
              <Text style={styles.experiencia}>Edificio Ingeniería - piso 5</Text>
            </View>
          </View>

          <View style={styles.separacion}>
            <Text style={styles.subtitulos}>Costo total</Text>
          </View>

          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <View style={{ flex: 0.7, justifyContent: "center" }}>
              <Text style={styles.costos}>Costo de los productos</Text>

            </View>
            <View style={{ flex: 0.3, marginLeft: 10, justifyContent: "center", alignItems: "flex-end", paddingRight: 30 }}>
              <Text style={styles.valores}>$17.000</Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <View style={{ flex: 0.7, justifyContent: "center" }}>
              <Text style={styles.costos}>Costo de envío</Text>

            </View>
            <View style={{ flex: 0.3, marginLeft: 10, justifyContent: "center", alignItems: "flex-end", paddingRight: 30 }}>
              <Text style={styles.valores}>$3.000</Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", marginTop: 10, borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: '#E7E7E7', paddingTop: 10 }}>
            <View style={{ flex: 0.7, justifyContent: "center" }}>
              <Text style={styles.valores}>Total pagado</Text>

            </View>
            <View style={{ flex: 0.3, marginLeft: 10, justifyContent: "center", alignItems: "flex-end", paddingRight: 30 }}>
              <Text style={styles.valores}>$21.000</Text>
            </View>
          </View>





        </View>


      </View>

    </View>
  )
}
const styles = StyleSheet.create({
  textoInicio: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 30,
    marginLeft: 20
  },
  textoFecha: {
    fontSize: 18,
    color: 'white',
    marginTop: 10,
    marginLeft: 20,
    fontStyle:"italic"
  },
  titulo: {
    fontSize: 23,
    color: "black",
    fontWeight: 'bold',
    padding: 10
  },
  experiencia: {
    fontSize: 18,
    color: "black"
  },
  verLista: {
    fontSize: 18,
    color: "white",
    fontStyle: "italic"
  },
  btnVerLista: {
    backgroundColor: Colors.primary1,
    paddingHorizontal: 30,
    paddingVertical: 5,
    borderRadius: 10
  },
  subtitulos: {
    fontSize: 18,
    color: "black",
    fontWeight: 'bold',
    padding: 10,
  },
  separacion: {
    marginTop: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E7E7E7',
    paddingBottom: 5
  },
  costos: {
    fontSize: 18,
    color: "black",
    padding: 10,
  },
  valores: {
    fontSize: 18,
    color: "black",
    padding: 10,
    fontWeight: 'bold',
  },
  btnAtas: {
    marginLeft: 20,
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    height: 30,
    width: 30
  }

});
