import { ipApi } from "./ApiConfig"

const url = `${ipApi}/restaurantes`;

export async function getRestaurants() {
  const res = await fetch(`${url}/`, { method: 'GET' })
  return res.json()
}
