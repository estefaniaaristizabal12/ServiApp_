import React, { useState } from "react";
import { View, Text, TouchableOpacity, Switch } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Colors } from "../constants/colors";
import { StyleSheet } from "react-native";

const DrawerItem = (props) => {

    const { iconName, text, pro, notification } = props;

    const [isEnable, setIsEnable] = useState(false);
    const toggleSwitch = () => setIsEnable((state) => !state);

    return(
        <TouchableOpacity disabled={notification} onPress={() => {}}>
            <View style={styles.container}>
                <View style={styles.row}>
                    <View style={[styles.iconContainer, { backgroundColor: pro ? Colors.primaryLigth : Colors.primaryLigth} ]}>
                        <Icon name={iconName} size={30} color={pro ? Colors.primary1 : Colors.primary1} />
                    </View>
                    <Text style={[styles.text, { fontWeight: pro ? 'bold' : '500' } ]}>{text}</Text>
                </View>
                <View>
                    {notification ? 
                        <Switch 
                            trackColor={{ false: Colors.lightGrey, true: Colors.primary1}}
                            thumbColor={isEnable ? Colors.lightGrey : Colors.primary1}
                            ios_backgroundColor={Colors.lightGrey}
                            onValueChange={toggleSwitch}
                            value={isEnable}
                        />
                    : 
                    <Icon name="chevron-right" size={25} color={Colors.grey} /> }
                    
                </View>
            </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
        marginHorizontal: 15,
        alignItems: 'center',   
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        backgroundColor: Colors.primary,
        marginRight: 20,
        padding: 8,
        borderRadius: 10,
    },
    text: {
        color: Colors.black,
        fontSize: 20,
    }
});



export default DrawerItem;


