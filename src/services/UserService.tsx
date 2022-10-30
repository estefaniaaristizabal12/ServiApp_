import { ipApi } from './ApiConfig'
// import * as AsyncStorage from "./AsyncStorage"

const urlUser = `${ipApi}/usuarios`
const urlOrder = `${ipApi}/ordenes`
const urlCart = `${ipApi}/carros`

//User
export async function getUser(uid: any) {
  const res = await fetch(`${urlUser}/?uid=${uid}`, { method: 'GET' })
  return res.json()
}

export async function create(
  nameUsu: any,
  direction: any,
  email: any,
  pass: any,
  deviceToken: any,
  phone: any
) {
  const data = {
    nombrecliente: nameUsu,
    direccion1: direction,
    e_mail: email,
    password: pass,
    DeviceToken: deviceToken,
    Telefono: phone
  }
  const res = await fetch(`${urlUser}/create/`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
  return res.json()
}

export async function update(
  nameUsu: any,
  direction: any,
  email: any,
  phone: any,
  uid: any
) {
  const data = {
    nombrecliente: nameUsu,
    direccion1: direction,
    e_mail: email,
    Telefono: phone
  }
  const res = await fetch(`${urlUser}/update/?uid=${uid}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
  return res.json()
}

export async function changePassword(newPass: any, uid: any) {
  const data = {
    new_pass: newPass
  }
  const res = await fetch(`${urlUser}/changepass/?uid=${uid}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
  return res.json()
}

export async function updateDeviceToken(deviceToken: any, uid: any) {
  const data = {
    DeviceToken: deviceToken
  }
  const res = await fetch(`${urlUser}/dt/?uid=${uid}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
  return res.json()
}

export async function getCards(uid: any) {
  const res = await fetch(`${urlUser}/cards/?uid=${uid}`, { method: 'GET' })
  return res.json()
}

export async function addCard(
  nameCard: any,
  numCard: any,
  date: any,
  cvv: any,
  type: any,
  uid: any
) {
  const data = {
    Nombre: nameCard,
    NumeroTarjeta: numCard,
    Fecha: date,
    cvv: cvv,
    Tipo: type
  }
  const res = await fetch(`${urlUser}/addcard/?uid=${uid}`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
  return res.json()
}

export async function delCard(numTarjeta: any, uid: any) {
  const data = {
    NumeroTarjeta: numTarjeta
  }
  const res = await fetch(`${urlUser}/delcard/?uid=${uid}`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
  return res.json()
}

//Cart
export async function getCart(uid: any) {
  const res = await fetch(`${urlCart}/?uid=${uid}`, { method: 'GET' })
  return res.json()
}

export async function addProdCart(
  prodId: any,
  cant: any,
  restId: any,
  delivery: any,
  uid: any
) {
  const res = await fetch(
    `${urlCart}/add/${prodId}/${cant}/${restId}/${delivery}/?uid=${uid}`,
    { method: 'POST' }
  )
  return res.json()
}

export async function removeProdCart(prodId: any, uid: any) {
  const res = await fetch(`${urlCart}/remove/${prodId}/?uid=${uid}`, {
    method: 'POST'
  })
  return res.json()
}

export async function clearCart(uid: any) {
  const res = await fetch(`${urlCart}/clear/?uid=${uid}`, { method: 'POST' })
  return res.json()
}

export async function payCart(card: any, total: any, address: any, uid: any) {
  const data = {
    Tarjeta: card,
    Total: total,
    Direccion: address
  }
  const res = await fetch(`${urlCart}/pay/?uid=${uid}`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
  return res.json()
}

//Orders
export async function getOrder(id: any) {
  const res = await fetch(`${urlOrder}/get/?id=${id}`, { method: 'GET' })
  return res.json()
}

export async function getOrders(role: any, delivery: any, uid: any) {
  const res = await fetch(`${urlOrder}/${role}/${delivery}/?uid=${uid}`, {
    method: 'GET'
  })
  return res.json()
}

export async function getDeliveries(uid: any) {
  const res = await fetch(`${urlOrder}/delivery/?uid=${uid}`, {
    method: 'GET'
  })
  return res.json()
}

export async function rateOrder(
  idOrder: any,
  rate: any,
  comment: any,
  uid: any
) {
  const data = {
    id: idOrder,
    Resena: {
      Calificacion: rate,
      Comentario: comment
    }
  }
  const res = await fetch(`${urlOrder}/rate/?uid=${uid}`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
  return res.json()
}

export async function acceptOrder(idOrder: any, uid: any) {
  const data = {
    id: idOrder
  }
  const res = await fetch(`${urlOrder}/accept/?uid=${uid}`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
  return res.json()
}

export async function rejectOrder(idOrder: any, uid: any) {
  const data = {
    id: idOrder
  }
  const res = await fetch(`${urlOrder}/reject/?uid=${uid}`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
  return res.json()
}

export async function getAcceptedOrders(uid: any) {
  const res = await fetch(`${urlOrder}/accepted/?uid=${uid}`, {
    method: 'GET'
  })
  return res.json()
}

export async function getRejectedOrders(uid: any) {
  const res = await fetch(`${urlOrder}/rejected/?uid=${uid}`, {
    method: 'GET'
  })
  return res.json()
}
