import React, { useEffect } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Text, Image, View , StyleSheet,Dimensions} from "react-native";

const { width, height } = Dimensions.get("screen");

const Card = ({ title, description, image, location, onPress }) => {
  return (
      <TouchableOpacity onPress={onPress} style={style.card}>
        <View style={{ flexDirection: "row" }}>
          <View style={style.cardImage}>
            <Image
              style={{ width: "100%", height: "100%", borderRadius: 20 }}
              source={image}
            />
          </View>
          <View style={{ flex: 0.6, marginHorizontal: 12, overflow: "hidden" }}>
            <Text style={style.cardTitle}>{title}</Text>
            <Text style={style.cardLocation}>{location}</Text>
            <Text style={style.cardDescription}>{description}</Text>
          </View>
        </View>
      </TouchableOpacity>
  );
};

const style = StyleSheet.create({
    card: {
      marginVertical: 10,
      backgroundColor: "#fff",
      paddingVertical: 10,
      paddingHorizontal: 15,
      width: width / 1.1,
      marginHorizontal: 20,
      borderRadius: 20,
  
      height: height / 8,
  
      shadowColor: "#000",
      shadowOffset: {
        width: 2,
        height: 2,
      },
      shadowOpacity: 0.3,
      shadowRadius: 1.5,
    },
  
    cardTitle: {
      fontWeight: "bold",
      fontSize: 16,
      marginLeft: 10,
    },
  
    cardLocation: {
      fontSize: 11.5,
      color: "#777",
      marginLeft: 10,
    },
  
    cardDescription: {
      fontSize: 12,
      marginVertical: 8,
      marginLeft: 10,
    },
  
    cardImage: {
      flex: 0.3,
    },
});

export default Card;

