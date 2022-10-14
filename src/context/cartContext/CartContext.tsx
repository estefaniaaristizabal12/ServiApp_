
import React, { createContext, useReducer } from 'react';
import { cartReducer } from './cartReducer';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../screens/firebaseConfig';
import * as UserService from '../../services/UserService'
import { getAuth } from 'firebase/auth';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);



// Definir cómo luce, qué información tendré aquí
export interface CartState {
    nombreRestaurante: string;
    productos: any [];

}

let carrito: any;
const getCart = async () => {
    UserService.getCart(auth.currentUser.uid)
      .then(data => {
        carrito: data;
      })
      .catch(error => {
        console.error("getCart: ", error)
      });
  };

// Estado inicial
export const cartInitialState: CartState = {
    nombreRestaurante:"perrito",
    productos: carrito

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



