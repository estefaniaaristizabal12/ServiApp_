import {
  View,
  Text,
  BackHandler,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform
} from 'react-native'
import React, { FunctionComponent, useState, useEffect, useRef } from 'react'
//   import { StackScreenProps } from '@react-navigation/stack';

import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions'
import { LinearGradient } from 'expo-linear-gradient'
import { Colors } from '../../constants/colors'
import IconButton from '../../components/IconButton'
import dummyData from '../../constants/dummyData'
const { width, height } = Dimensions.get('window')
import { Dimensions } from 'react-native'
import { normalize } from '../../../FontNormalize'

const Map = ({ navigation, route }) => {
  const mapView = useRef()
  const [region, setRegion] = useState(null)
  const [toLoc, setToLoc] = useState(null)
  const [fromLoc, setFromLoc] = useState(null)
  const [angle, setAngle] = useState(0)
  const [isReady, setIsReady] = useState(false)
  const [duration, setDuration] = useState('')

  useEffect(() => {
    let initialRegion = {
      latitude: 1.5496614931250685,
      longitude: 110.36381866919922,
      latitudeDelta: 0.02,
      longitudeDelta: 0.02
    }

    let destination = {
      latitude: 1.5496614931250685,
      longitude: 110.36381866919922
    }

    setToLoc(destination)
    setFromLoc(dummyData.fromLocs[1])
    setRegion(initialRegion)
  }, [])

  const renderMap = () => {
    return (
      <MapView
        ref={mapView}
        style={{ flex: 1 }}
        provider={PROVIDER_GOOGLE}
        initialRegion={region}
      >
        {fromLoc && (
          <Marker
            key={'FromLoc'}
            coordinate={fromLoc}
            tracksViewChanges={false}
            icon={require('../../../assets/navigator1.png')}
            rotation={angle}
            anchor={{ x: 0.5, y: 0.5 }}
          />
        )}
        {toLoc && (
          <Marker
            key={'ToLoc'}
            coordinate={toLoc}
            tracksViewChanges={false}
            icon={require('../../../assets/location_pin.png')}
            anchor={{ x: 0.5, y: 0.5 }}
          />
        )}
        {/* <MapViewDirections
            origin={fromLoc}
            destination={toLoc}
            apikey={'-g'}
            strokeWidth={5}
            strokeColor={Colors.primaryItemCard}
            optimizeWaypoints={true}
            onReady={result => {
              setDuration(Math.ceil(result.duration));
              if (!isReady) {
                mapView.current.fitToCoordinates(result.coordinates, {
                  edgePadding: {
                    right: width * 0.1,
                    bottom: 400,
                    left: width * 0.1,
                    top: height * 0.1,
                  },
                });
                // Reposition the navigator
                if (result.coordinates.length >= 2) {
                  let angle = utils.calculateAngle(result.coordinates);
                  setAngle(angle);
                }
                setIsReady(true);
              }
            }}
          /> */}
      </MapView>
    )
  }

  const renderHeaderButtons = () => {
    return (
      <>
        <IconButton
          icon={require('../../../assets/back.png')}
          containerStyle={{
            position: 'absolute',
            top: 24 * 2,
            left: 24,
            ...styles.buttonStyle
          }}
          iconStyle={{
            width: 20,
            height: 20,
            tintColor: Colors.gray2
          }}
          onPress={() => navigation.goBack()}
        />

        <View
          style={{
            position: 'absolute',
            top: 24 * 2,
            right: 24
          }}
        >
          <IconButton
            icon={require('../../../assets/globe.png')}
            containerStyle={{ ...styles.buttonStyle }}
            iconStyle={{
              width: 20,
              height: 20,
              tintColor: Colors.gray3
            }}
          />
          <IconButton
            icon={require('../../../assets/focus.png')}
            containerStyle={{
              marginTop: 12,
              ...styles.buttonStyle
            }}
            iconStyle={{
              width: 20,
              height: 20,
              tintColor: Colors.gray3
            }}
          />
        </View>
      </>
    )
  }

  const renderInfo = () => {
    return (
      <View style={{ position: 'absolute', bottom: 0, width: '100%' }}>
        {/* Linear gradient */}
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          colors={[Colors.transparent, Colors.lightGray1]}
          style={{
            position: 'absolute',
            top: -20,
            left: 0,
            right: 0,
            height: Platform.OS === 'ios' ? 200 : 50
          }}
        />

        {/*Info Container*/}
        <View
          style={{
            padding: 24,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            backgroundColor: Colors.white
          }}
        >
          {/* Delivery Time */}
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={require('../../../assets/clock.png')}
              style={{
                width: 40,
                height: 40,
                tintColor: Colors.black
              }}
            />
            <View style={{ marginLeft: 24 }}>
              <Text
                style={{
                  color: Colors.gray,
                  fontSize: normalize(14)
                }}
              >
                Your delivery time
              </Text>
              <Text
                style={{
                  fontSize: normalize(16),
                  color: Colors.black
                }}
              >
                {duration} minutes
              </Text>
            </View>
          </View>
          {/* Address */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 24
            }}
          >
            <Image
              source={require('../../../assets/focus.png')}
              style={{
                width: 40,
                height: 40,
                tintColor: Colors.black
              }}
            />
            <View style={{ marginLeft: 24 }}>
              <Text
                style={{
                  color: Colors.gray,
                  fontSize: normalize(14)
                }}
              >
                Your Address
              </Text>
              <Text
                style={{
                  fontSize: normalize(16),
                  color: Colors.black
                }}
              >
                88, Jln Padungan, Kuching
              </Text>
            </View>
          </View>
          {/* Delivery Man Detail */}
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              height: 70,
              marginTop: 24,
              borderRadius: 12,
              paddingHorizontal: 12,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: Colors.primaryItemCard
            }}
          >
            <Image
              source={require('../../../assets/profile.png')}
              style={{ width: 40, height: 40, borderRadius: 5 }}
            />
            <View style={{ marginLeft: 12, flex: 1 }}>
              <Text
                style={{
                  color: Colors.white,
                  fontSize: normalize(16)
                }}
              >
                Nguyen Quoc Viet
              </Text>
              <Text
                style={{
                  color: Colors.white,
                  fontSize: normalize(14)
                }}
              >
                Delivery Man
              </Text>
            </View>
            <View
              style={{
                height: 40,
                width: 40,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1,
                borderRadius: 5,
                borderColor: Colors.white,
                backgroundColor: Colors.transparentWhite1
              }}
            >
              <Image
                source={require('../../../assets/call.png')}
                style={{ width: 30, height: 30 }}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {/* Map */}
      {renderMap()}
      {/* Header Buttons */}
      {renderHeaderButtons()}
      {/* Footer / Info */}
      {renderInfo()}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  buttonStyle: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.gray2,
    backgroundColor: Colors.white
  }
})

export default Map
