import React from 'react'
import { Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export const Product = () => {
    const { top: paddingTop } = useSafeAreaInsets();
    return (
        <View style={{paddingTop}}>
            <Text> PRODUCTTOOO </Text>
        </View>
    )
}
