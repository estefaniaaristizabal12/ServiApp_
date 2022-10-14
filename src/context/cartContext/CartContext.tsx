
import React, { createContext, useReducer } from 'react';
import { cartReducer } from './cartReducer';






// Definir cómo luce, qué información tendré aquí
export interface CartState {
    nombreRestaurante: string;
}

// Estado inicial
export const cartInitialState: CartState = {
    nombreRestaurante:"perrito"
}


// Lo usaremos para decirle a React cómo luce y qué expone el context
export interface CartContextProps {
    cartState: CartState;
    cambioNombre: () => void;

}


// Crear el contexto
export const CartContext = createContext( {} as CartContextProps );

// Componente proveedor del estado
export const CartProvider = ({ children }: any ) => {

    const [ cartState, dispatch] = useReducer( cartReducer, cartInitialState );

    const cambioNombre = () => {
        dispatch({ type: 'cambioNombre' });
    }


    return (
        <CartContext.Provider value={{
            cartState,
            cambioNombre:cambioNombre
        }}>
            { children }
        </CartContext.Provider>
    )

}



