import {
    View,
    Text,
    BackHandler,
    Image,
    StyleSheet,
    ScrollView,
  } from 'react-native';
  import React, { FunctionComponent, useState } from 'react';
  import { StackScreenProps } from '@react-navigation/stack';
  import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
  
  import { useSafeAreaInsets } from 'react-native-safe-area-context';
  import { SwipeListView } from 'react-native-swipe-list-view';
  import { Colors } from '../../constants/colors';

  import {
    HeaderNavigation,
    IconButton,
    CartQuantityButton,
    IconLabel,
    TextButton,
    LineDivider,
    TextIconButton,
  } from '../../components';
  
  
  const StatusOrder= ({ navigation }) => {

    const insets = useSafeAreaInsets();
  
    const [currentStep, setCurrentStep] = useState(4);
  
    const renderHeader = () => {
      return (
        <HeaderNavigation
          title="DELIVERY STATUS"
          containerStyle={{
            height: 50,
            // marginHorizontal: SIZES.padding,
            marginTop: insets.top,
          }}
          titleStyle={{}}
          leftComponent={
            <IconButton
              icon={ require('../../assets/back.png')}
              containerStyle={styles.leftIconButton}
              iconStyle={{
                width: 16,
                height: 20,
                tintColor: Colors.gray2,
              }}
              onPress={() => navigation.goBack()}
            />
          }
  
          // rightComponent={<CartQuantityButton quantity={3} />}
        />
      );
    };
  
    const renderInfo = () => {
      return (
        <View
          style={{ marginTop: 12, paddingHorizontal: 24 }}>
          <Text
            style={{ textAlign: 'center', color: Colors.gray, fontSize:14 }}>
            Estimated Delivery
          </Text>
  
          <Text style={{ textAlign: 'center', fontSize: 22, color: Colors.black }}>
            21 Sep 2021 / 12:30PM
          </Text>
        </View>
      );
    };
  
    const renderTrackOrder = () => {
      return (
        <View
          style={{
            marginTop: 24,
            paddingVertical: 24,
            borderRadius: 12,
            borderWidth: 2,
            borderColor: Colors.lightGray2,
            backgroundColor: Colors.white2,
            // backgroundColor: 'red',
          }}>
          {/* Tracking Order */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 20,
              paddingHorizontal: 24,
            }}>
            <Text style={{ fontSize: 16, color: Colors.black }}>Track Order</Text>
            <Text style={{ color: Colors.gray, fontSize: 16 }}>NY012345</Text>
          </View>
          <LineDivider
          // lineStyle={{
          //   // marginHorizontal: SIZES.padding,
          //   backgroundColor: 'red',
          //   marginLeft: SIZES.padding,
          //   marginRight: SIZES.padding,
          //   width: '86%',
          // }}
          />
          {/* Status */}
          <View
            style={{
              marginTop: 24,
              paddingHorizontal: 24,
            }}>
            {constants.track_order_status.map((item, index) => {
              return (
                <View key={`StatusList-${index}`} style={{}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginVertical: -5,
                    }}>
                    <Image
                      source={ require('../../assets/check_circle.png')}
                      style={{
                        width: 40,
                        height: 40,
                        tintColor:
                          index <= currentStep
                            ? Colors.primaryItemCard
                            : Colors.lightGray1,
                      }}
                    />
                    <View style={{ marginLeft: 12}}>
                      <Text style={{ fontSize: 16, color: Colors.black }}>
                        {item.title}
                      </Text>
                      <Text style={{ color: Colors.gray3, fontSize: 14 }}>
                        {item.sub_title}
                      </Text>
                    </View>
                  </View>
                  {index < constants.track_order_status.length - 1 && (
                    <View>
                      {index < currentStep && (
                        <View
                          style={{
                            height: 50,
                            width: 3,
                            marginLeft: 18,
                            backgroundColor: Colors.primaryItemCard,
                            zIndex: -1,
                          }}
                        />
                      )}
                      {index >= currentStep && (
                        <Image
                          source={icons.dotted_line}
                          style={{ width: 4, height: 50, marginLeft: 17 }}
                          resizeMode="cover"
                        />
                      )}
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        </View>
      );
    };
  
    const renderFooter = () => {
      return (
        <View style={{ marginTop: SIZES.radius, marginBottom: SIZES.padding }}>
          {currentStep < constants.track_order_status.length - 1 && (
            <View style={{ flexDirection: 'row', height: 55 }}>
              {/* Cancel */}
              <TextButton
                buttonContainerStyle={{
                  width: '40%',
                  borderRadius: SIZES.base,
                  backgroundColor: COLORS.lightGray2,
                }}
                label="Cancel"
                labelStyle={{ color: COLORS.primary }}
                onPress={() => navigation.navigate('FoodDetail')}
              />
              {/* MapView*/}
              <TextIconButton
                containerStyle={{
                  flex: 1,
                  marginLeft: SIZES.radius,
                  borderRadius: SIZES.radius,
                  backgroundColor: COLORS.primary,
                }}
                label="Map View"
                labelStyle={{ color: COLORS.white, ...FONTS.h3 }}
                icon={icons.map}
                iconPosition="LEFT"
                iconStyle={{
                  width: 25,
                  height: 25,
                  marginRight: SIZES.base,
                  tintColor: COLORS.white,
                }}
                onPress={() => navigation.navigate('Map')}
              />
            </View>
          )}
          {currentStep === constants.track_order_status.length - 1 && (
            <TextButton
              buttonContainerStyle={{ height: 55, borderRadius: SIZES.radius }}
              label="DONE"
              onPress={() => navigation.navigate('Home')}
            />
          )}
        </View>
      );
    };
  
    return (
      <View style={styles.container}>
        {/* Header */}
        {renderHeader()}
        {/* Info */}
        {renderInfo()}
        {/* Track Order */}
        <ScrollView showsVerticalScrollIndicator={false}>
          {renderTrackOrder()}
        </ScrollView>
        {/* Footer */}
        {renderFooter()}
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.white,
      paddingHorizontal: SIZES.padding,
    },
    leftIconButton: {
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderRadius: SIZES.radius,
      borderColor: COLORS.gray2,
    },
  });
  
  export default StatusOrder;