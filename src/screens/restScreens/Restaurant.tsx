import React from 'react'
import { Text } from 'react-native'
import { View } from 'react-native-animatable'
import Button from '../../components/Button'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const Restaurant = ({ navigation }) => {
    const { top: paddingTop } = useSafeAreaInsets();
    return (
        <View style={{paddingTop}}>
            <Text> RESTAURANTE </Text>
            <Button title="Product" onPress={() => navigation.navigate('Product')} />

        </View>
    )
}
