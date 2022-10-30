import AsyncStorage from '@react-native-async-storage/async-storage';

export async function saveUser(user: {}) {
  await AsyncStorage.setItem('@user', JSON.stringify(user))
}

export async function clearUser() {
  await AsyncStorage.removeItem('@user')
}

export async function getUser() {
  const user = await AsyncStorage.getItem('@user')
  return JSON.parse(user)
}

