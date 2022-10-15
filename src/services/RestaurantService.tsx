import { ipApi } from "./ApiConfig"

const url = `${ipApi}/restaurantes`;

export async function getRestaurants() {
  const res = await fetch(`${url}/`, { method: 'GET' })
  return res.json()
}

export async function getRestaurantsDelivery() {
  const res = await fetch(`${url}/domi/`, { method: 'GET' })
  return res.json()
}
