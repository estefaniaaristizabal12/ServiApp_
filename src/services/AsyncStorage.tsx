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

// TODO: eliminar?
export async function saveCart(cart: {}) {
  await AsyncStorage.removeItem('@cart')
  await AsyncStorage.setItem('@cart', JSON.stringify(cart))
  // await AsyncStorage.removeItem('@cart')
}

// TODO: eliminar?
export async function addProdCart(prod: {}) {
  // const cartStr = await AsyncStorage.getItem('@cart');
  // if(cartStr) return 
  // let cart = JSON.parse(cartStr)
  // cart.Productos.push(prod)
  // await AsyncStorage.setItem('@cart', JSON.stringify(cart))
}

// TODO: eliminar?
export async function getCart() {
  const user = await AsyncStorage.getItem('@cart');
  await AsyncStorage.removeItem('@cart')
  return JSON.parse(user)
}

