import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Colors } from '../constants/colors'

const listTransations = [
  {
    id: '1',
    type: 'Domicilio',
    date: 'Jun 20, 12:30',
    payment: '- $19.500'
  },
  {
    id: '2',
    type: 'Recoger',
    date: 'Dic 11, 10:30',
    payment: '- $12.000'
  },
  {
    id: '3',
    type: 'Domicilio',
    date: 'Jun 12, 12:30',
    payment: '+ $12.000'
  }
]

const renderTransactionItem = item => (
  <View key={item.id} style={styles.items}>
    <View style={styles.icon}>
      <Icon name="swap-horizontal" size={25} color={Colors.primary1} />
    </View>
    <View style={styles.itemBody}>
      <Text style={styles.type}>{item.type}</Text>
      <Text style={styles.date}>{item.date}</Text>
    </View>
    <View>
      <Text style={styles.payment}>{item.payment}</Text>
    </View>
  </View>
)

const RecentTransaction = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro Transacciones</Text>
      <View>{listTransations.map(renderTransactionItem)}</View>
    </View>
  )
}

export default RecentTransaction

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 18
  },
  container: {
    marginTop: 16
  },
  items: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 22
  },
  icon: {
    padding: 10,
    backgroundColor: 'white',
    width: 60,
    height: 60,
    shadowColor: '#000',
    shadowOffset: { height: 10, width: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 80,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemBody: {
    flex: 1,
    paddingLeft: 14
  },

  type: {
    fontWeight: '500',
    fontSize: 16
  },

  date: {
    marginTop: 5
  },

  payment: {
    fontWeight: 'bold',
    fontSize: 16
  }
})
