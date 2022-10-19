import { ipApi } from "./ApiConfig"
// import * as AsyncStorage from "./AsyncStorage"

const url = `${ipApi}/usuarios`;

export async function getUser(uid: any) {
  const res = await fetch(`${url}/?uid=${uid}`, { method: 'GET' })
  return res.json()
}

export async function getCart(uid: any) {
  const res = await fetch(`${url}/cart/?uid=${uid}`, { method: 'GET' })
  return res.json()
}

export async function addProdCart(prodId: any, cant: any, restId: any, delivery: any, uid: any) {
  const res = await fetch(`${url}/addcart/${prodId}/${cant}/${restId}/${delivery}/?uid=${uid}`, { method: 'POST' })
  return res.json()
}

export async function removeProdCart(prodId: any, uid: any) {
  const res = await fetch(`${url}/removecart/${prodId}/?uid=${uid}`, { method: 'POST' })
  return res.json()
}

export async function clearCart(uid: any) {
  const res = await fetch(`${url}/clearcart/?uid=${uid}`, { method: 'POST' })
  return res.json()
}

export async function payCart(delivery: boolean, card: any, total: any, uid: any) {
  const data = {
    Domicilio: delivery,
    Tarjeta: card,
    Total: total
  }
  const res = await fetch(`${url}/pay/?uid=${uid}`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  })
  return res.json()
}

export async function getCards(uid: any) {
  const res = await fetch(`${url}/cards/?uid=${uid}`, { method: 'GET' })
  return res.json()
}

export async function addCard(nameCard: any, numCard: any, date: any, cvv: any, type: any, uid: any) {
  const data = {
    Nombre: nameCard,
    NumeroTarjeta: numCard,
    Fecha: date,
    cvv: cvv,
    Tipo: type
  }
  const res = await fetch(`${url}/addcard/?uid=${uid}`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  })
  return res.json()
}

export async function delCard(numTarjeta: any, uid: any) {
  const data = {
    NumeroTarjeta: numTarjeta
  }
  const res = await fetch(`${url}/delcard/?uid=${uid}`, {
    method: 'POST', body: JSON.stringify(data),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  })
  return res.json()
}

export async function create(nameUsu: any, direction: any, email: any, pass: any, deviceToken: any, phone: any) {
  const data = {
    nombrecliente: nameUsu,
    direccion1: direction,
    e_mail: email,
    password: pass,
    DeviceToken: deviceToken,
    Telefono: phone
  }
  const res = await fetch(`${url}/create/`, {
    method: 'POST', body: JSON.stringify(data),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  })
  return res.json()
}

export async function update(nameUsu: any, direction: any, email: any, phone: any, uid: any) {
  const data = {
    nombrecliente: nameUsu,
    direccion1: direction,
    e_mail: email,
    Telefono: phone
  }
  const res = await fetch(`${url}/update/?uid=${uid}`, {
    method: 'PUT', body: JSON.stringify(data),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  })
  return res.json()
}

export async function changePassword(newPass: any, uid: any) {
  const data = {
    new_pass: newPass
  }
  const res = await fetch(`${url}/changepass/?uid=${uid}`, {
    method: 'PUT', body: JSON.stringify(data),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  })
  return res.json()
}

export async function updateDeviceToken(deviceToken: any, uid: any) {
  const data = {
    DeviceToken: deviceToken
  }
  const res = await fetch(`${url}/dt/?uid=${uid}`, {
    method: 'PUT', body: JSON.stringify(data),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  })
  return res.json()
}

export async function getOrders(role: any, uid: any) {
  const res = await fetch(`${url}/orders/${role}/?uid=${uid}`, { method: 'GET' })
  return res.json()
}

export async function rateOrder(idOrder: any, rate: any, uid: any) {
  const data = {
    id: idOrder,
    Calificacion: rate
  }
  const res = await fetch(`${url}/rateorder/?uid=${uid}`, {
    method: 'POST', body: JSON.stringify(data),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  })
  return res.json()
}
