import {createContext, useReducer} from 'react'
import {cartReducer, initialCartState, CART_ACTION_TYPES} from '../reducers/cart.js'

export const CartContext = createContext()

function useCartReducer (){
    const [state, dispatch] = useReducer (cartReducer, initialCartState)

    const addToCart = product =>dispatch({type: CART_ACTION_TYPES.ADD_TO_CART, payload: product})
    const removeFromCart = product =>dispatch({type: CART_ACTION_TYPES.REMOVE_FROM_CART, payload: product})
    const clearCart = () =>dispatch({type: CART_ACTION_TYPES.CLEAR_CANT})

    return {state, addToCart, removeFromCart , clearCart}
}

export function CartProvider ({children}) {

    
    const {state, addToCart, removeFromCart , clearCart} = useCartReducer()

    return(
        <CartContext.Provider value={{
            cart:state, 
            addToCart, 
            removeFromCart, 
            clearCart}}>
            {children}
        </CartContext.Provider>
    )
}