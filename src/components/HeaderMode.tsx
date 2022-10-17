import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Colors } from "../constants/colors";

export default function HeaderMode(props) {

  //Create funcion to change the mode
  const changeMode = () => {
    
    props.setActiveTab(props.text)

    //ir a la pantalla de delivery
    if(props.text == "Delivery"){
      props.navigation.navigate("Delivery")
    }
    //ir a la pantalla de pickup
    else if(props.text == "Pickup"){
      props.navigation.navigate("Pickup")
    }
  };



  return (
    <View style={{ flexDirection: "row", alignSelf: "center" }}>
      <HeaderButton
        text="Delivery"
        btnColor= {Colors.primary}
        textColor="white"
        activeTab={props.activeTab}
        setActiveTab={props.setActiveTab}
      />
      <HeaderButton
        text="Pickup"
        btnColor="white"
        textColor="black"
        activeTab={props.activeTab}
        setActiveTab={props.setActiveTab}
      />
    </View>
  );
}

const HeaderButton = (props) => (
  <TouchableOpacity
    style={{
      backgroundColor: props.activeTab === props.text ? Colors.primary1 : "white",
      paddingVertical: 6,
      paddingHorizontal: 16,
      borderRadius: 30,
    }}
    //ir a la pantalla de delivery o pickup
    // onPress={() => changeMode()}

    
  >
    <Text
      style={{
        color: props.activeTab === props.text ? "white" : "black",
        fontSize: 15,
        fontWeight: "900",
      }}
    >
       
      {props.text}
    </Text>
  </TouchableOpacity>
);