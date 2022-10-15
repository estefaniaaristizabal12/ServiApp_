import { ipApi } from "./ApiConfig"

const url = `${ipApi}/productos`;

export async function getProducts() {
  const res = await fetch(`${url}/`, { method: 'GET' })
  return res.json()
}

export async function getProduct(idProd: any, idRest:any) {
  const res = await fetch(`${url}/get/${idProd}/${idRest}/`, { method: 'GET' })
  return res.json()
}

export async function getProductsRest(idRest:any) {
  const res = await fetch(`${url}/rest/${idRest}/`, { method: 'GET' })
  return res.json()
}

export async function getProductsRestDelivery(idRest:any) {
  const res = await fetch(`${url}/restdomi/${idRest}/`, { method: 'GET' })
  return res.json()
}

