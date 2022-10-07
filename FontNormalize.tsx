import { Dimensions, Platform, PixelRatio } from 'react-native';
import { RFValue, RFPercentage} from 'react-native-responsive-fontsize';

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');

// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 320;

export function normalize(size: any) {
  const newSize = size * scale 
  if (Platform.OS === 'ios') {
    // return Math.round(PixelRatio.roundToNearestPixel(newSize))
    return size
  } else {
    // return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 8
    // return size - 3
    return RFValue(size, SCREEN_HEIGHT)
    // return size 
  }
}
