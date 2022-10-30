import { CartState } from './CartContext'

type CartAction = { type: 'cambioNombre' }

// generaEstado
export const cartReducer = (
  state: CartState,
  action: CartAction
): CartState => {
  switch (action.type) {
    case 'cambioNombre':
      return {
        ...state,
        nombreRestaurante: 'prueba'
      }

    default:
      return state
  }
}
