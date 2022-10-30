import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import React, { useState } from 'react'

import categoriesProducts from '../constants/categoriesProducts'
import { Colors } from '../constants/colors'

const SPACING = 10

const Categories = ({ onChange }) => {
  const [activeCategoryId, setActiveCategoryId] = useState(null)

  const handlePress = id => {
    setActiveCategoryId(id)
    onChange(id)
  }

  return (
    <FlatList
      horizontal={true}
      data={categoriesProducts}
      keyExtractor={item => item.id}
      contentContainerStyle={{ marginVertical: SPACING }}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => handlePress(item.id)}
          style={{ marginRight: SPACING * 2, alignItems: 'center' }}
        >
          <Text
            style={[
              { color: Colors.secondary, fontSize: SPACING * 2 },
              activeCategoryId === item.id && {
                color: Colors.primary
              }
            ]}
          >
            {item.name}
          </Text>
          {activeCategoryId === item.id && (
            <View
              style={{
                height: SPACING,
                width: SPACING,
                backgroundColor: Colors.primary,
                borderRadius: SPACING / 2,
                marginTop: SPACING / 2
              }}
            />
          )}
        </TouchableOpacity>
      )}
    />
  )
}

export default Categories

const styles = StyleSheet.create({})
