import {
  Dimensions,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
} from "react-native";

import React, { useState } from "react";

const SPACING = 10;
const { height } = Dimensions.get("window");
const { width } = Dimensions.get("window");

import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../constants/colors";
import Categories from "../components/Categories";
import products from "../constants/products";
import { normalize } from "../../FontNormalize";

const PickUp = ({}) => {

  const [activeCategoryId, setActiveCategoryId] = useState(null);
  return (
    <>
      <ScrollView>
        <View>
          <ImageBackground
            style={{
              height: height / 2.5,
              padding: SPACING * 2,
              paddingTop: SPACING * 4,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
            source= {require('../../assets/1.jpg')}
           
          >
            <TouchableOpacity
              style={{
                height: SPACING * 4.5,
                width: SPACING * 4.5,
                backgroundColor: Colors.white,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: SPACING * 2.5,
              }}
            >
              <Ionicons
                name="arrow-back"
                size={SPACING * 2.5}
                color={Colors.gray}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: SPACING * 4.5,
                width: SPACING * 4.5,
                backgroundColor: Colors.white,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: SPACING * 2.5,
              }}
            >
              <Ionicons name="cart" size={SPACING * 2.5} color={Colors.gray} />
            </TouchableOpacity>
          </ImageBackground>
          <View
            style={{


              padding: SPACING ,
              paddingTop: SPACING * 3,
              marginTop: -SPACING * 12,
              borderTopLeftRadius: SPACING * 3,
              borderTopRightRadius: SPACING * 3,
              backgroundColor: Colors.white,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                marginBottom: SPACING * 3,
                alignItems: "center",
              }}
            >
              <View style={{ width: "70%" }}>
                <Text
                  style={{
                    fontSize: normalize(SPACING * 3),
                    marginLeft: 17,
                    color: Colors.black,
                    fontWeight: "700",
                  }}
                >
                  El Italiano
                </Text>
              </View>
              <View
                style={{
                  padding: SPACING,
                  paddingHorizontal: SPACING * 3,
                  backgroundColor: Colors.secondary1,
                  flexDirection: "row",
                  borderRadius: SPACING,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Ionicons
                  name="star"
                  color={Colors.black}
                  size={SPACING * 1.7}
                />
                <Text
                  style={{
                    fontSize: normalize(SPACING * 1.6),
                    fontWeight: "600",
                    marginLeft: SPACING / 2,
                    color: Colors.black,
                  }}
                >
                  4.7
                </Text>
              </View>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View
                style={{
                  padding: SPACING,
                  paddingHorizontal: SPACING * 2,
                  backgroundColor: Colors.light,
                  flexDirection: "row",
                  borderRadius: SPACING,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Ionicons
                  name="time"
                  color={Colors.gray}
                  size={SPACING * 1.7}
                />
                <Text
                  style={{
                    fontSize: normalize(SPACING * 1.6),
                    fontWeight: "600",
                    marginLeft: SPACING / 2,
                    color: Colors.gray,
                  }}
                >
                   10min
                </Text>
              </View>
              <View
                style={{
                  padding: SPACING,
                  paddingHorizontal: SPACING * 2,
                  backgroundColor: Colors.light,
                  flexDirection: "row",
                  borderRadius: SPACING,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Ionicons
                  name="bicycle"
                  color={Colors.gray}
                  size={SPACING * 1.7}
                />
                <Text
                  style={{
                    fontSize: normalize(SPACING * 1.6),
                    fontWeight: "600",
                    marginLeft: SPACING / 2,
                    color: Colors.gray,
                  }}
                >
                   $3.000
                </Text>
              </View>
              <View
                style={{
                  padding: SPACING,
                  paddingHorizontal: SPACING * 2,
                  backgroundColor: Colors.light,
                  flexDirection: "row",
                  borderRadius: SPACING,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Ionicons
                  name="restaurant"
                  color={Colors.gray}
                  size={SPACING * 1.7}
                />
                <Text
                  style={{
                    fontSize: normalize(SPACING * 1.6),
                    fontWeight: "600",
                    marginLeft: SPACING / 2,
                    color: Colors.gray,
                  }}
                >
                  9pm
                </Text>
              </View>
            </View>

            <SafeAreaView>
            <ScrollView
              style={{
                padding: SPACING,
                paddingHorizontal: 2 ,
              }}
            >
              <Categories onChange={(id) => setActiveCategoryId(id)} />
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                }}
              >
                {products
                  .filter((products) => {
                    if (activeCategoryId === null) {
                      return true;
                    }
                    return products.categoryId === activeCategoryId;
                  })
                  .map((products) => (
                    <View
                      key={products.id}
                      style={{
                        width: width / 2 - SPACING * 2,
                        marginBottom: SPACING,
                        borderRadius: SPACING * 2,
                        overflow: "hidden",
                      }}
                    >
                      <BlurView
                        tint="dark"
                        intensity={30}
                        style={{
                          padding: SPACING,
                        }}
                      >
                        <TouchableOpacity
                          style={{
                            height: 150,
                            width: "100%",
                          }}
                        >
                          <Image
                            source={products.image}
                            style={{
                              width: "100%",
                              height: "100%",
                              borderRadius: SPACING * 2,
                            }}
                          />
                          <View
                            style={{
                              position: "absolute",
                              right: 0,
                              borderBottomStartRadius: SPACING * 3,
                              borderTopEndRadius: SPACING * 2,
                              overflow: "hidden",
                            }}
                          >
                            <BlurView
                              tint="dark"
                              intensity={45}
                              style={{
                                flexDirection: "row",
                                padding: SPACING - 2,
                              }}
                            >
                              <Ionicons
                                style={{
                                  marginLeft: SPACING / 2,
                                }}
                                name="star"
                                color={Colors.primary}
                                size={SPACING * 1.7}
                              />
                              <Text
                                style={{
                                  color: Colors.white,
                                  marginLeft: SPACING / 2,
                                }}
                              >
                                {products.rating}
                              </Text>
                            </BlurView>
                          </View>
                        </TouchableOpacity>
                        <Text
                          numberOfLines={2}
                          style={{
                            color: Colors.white,
                            fontWeight: "600",
                            fontSize: normalize(SPACING * 1.7),
                            marginTop: SPACING,
                            marginBottom: SPACING / 2,
                          }}
                        >
                          {products.name}
                        </Text>
                        <Text
                          numberOfLines={1}
                          style={{ color: Colors.primary1, fontSize: normalize(SPACING * 1.2) }}
                        >
                          {products.included}
                        </Text>
                        <View
                          style={{
                            marginVertical: SPACING / 2,
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <View style={{ flexDirection: "row" }}>
                            <Text
                              style={{
                                color: Colors.primary,
                                marginRight: SPACING / 2,
                                fontSize: normalize(SPACING * 1.6),
                              }}
                            >
                              $
                            </Text>
                            <Text
                              style={{ color: Colors.white, fontSize: normalize(SPACING * 1.6) }}
                            >
                              {products.price}
                            </Text>
                          </View>
                          <TouchableOpacity
                            style={{
                              backgroundColor: Colors.primary,
                              padding: SPACING / 2,
                              borderRadius: SPACING,
                            }}
                          >
                            <Ionicons
                              name="add"
                              size={SPACING * 2}
                              color={Colors.white}
                            />
                          </TouchableOpacity>
                        </View>
                      </BlurView>
                    </View>
                  ))}
              </View>
            </ScrollView>

           </SafeAreaView>



  


          </View>
        </View>
      </ScrollView>

    </>
  );
};

export default PickUp;

const styles = StyleSheet.create({});
