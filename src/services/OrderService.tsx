import { ipApi } from './ApiConfig'
// import * as AsyncStorage from "./AsyncStorage"

const url = `${ipApi}/ordenes`

export async function list() {
  const res = await fetch(`${url}/`, { method: 'GET' })
  return res.json()
}

export async function get(id: any) {
  const res = await fetch(`${url}/get/?id=${id}`, { method: 'GET' })
  return res.json()
}

export async function update(state: any, id: any) {
  const res = await fetch(`${url}/update/${state}/?uid=${id}`, {
    method: 'PUT'
  })
  return res.json()
}
