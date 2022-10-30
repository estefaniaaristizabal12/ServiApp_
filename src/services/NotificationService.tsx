import { Platform, Alert, Linking } from 'react-native'
import * as Notifications from 'expo-notifications'
import * as UserService from './UserService'

export async function updateToken(uid: any) {
  console.log('Getting expo token for Notifications')

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true
    })
  })

  const { status } = await Notifications.requestPermissionsAsync()
  // if (status !== 'granted') {
  //   alert('Failed to get push token for push notification!');
  //   return null;
  // }
  if (status !== 'granted') {
    Alert.alert(
      'No Notification Permission',
      'please goto setting and on notification permission manual',
      [
        { text: 'cancel', onPress: () => console.log('cancel') },
        { text: 'Allow', onPress: () => Linking.openSettings() }
      ],
      { cancelable: false }
    )
  }
  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C'
    })
  }

  try {
    const token = (await Notifications.getExpoPushTokenAsync()).data
    // const token = (await Notifications.getDevicePushTokenAsync()).data;
    console.log('deviceToken:', token)
    UserService.updateDeviceToken(token, uid)
  } catch (error) {
    console.error('error getting expo push token', error)
  }
}

const expoUrl = 'https://exp.host/--/api/v2/push/send'

export async function sendOrderStatusUpdate(token: any, msg: any) {
  const data = {
    to: token,
    title: 'Actualización de estado de tu pedido 😊',
    body: msg
  }
  const res = await fetch(`${expoUrl}`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
  return res.json()
}
