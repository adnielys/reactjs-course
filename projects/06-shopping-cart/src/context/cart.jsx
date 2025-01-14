import {createContext, useState} from 'react'

export const CartContext = createContext()

export function CartProvider ({children}) {
    const [cart, setCart] = useState([])

    const addToCart=(product) => {
        // Check if the product is alredy in the cart
        const productInCartIndex = cart.findIndex(item => item.id === product.id)
        // si el array no es muy grande se puede usar structuredClone para hacer copia profunda del array cart
        console.log('index:', productInCartIndex)
        if(productInCartIndex >= 0)
        {
            const newCart = structuredClone(cart)
            newCart[productInCartIndex].quantity +=1
            return setCart(newCart)
        }

        // If the product is not in the cart
        setCart(prevState=>(
            [...prevState,
             {
                ... product,
                quantity:1
             }
            ]
        ))
      
    }
    const clearCart = () => {
        setCart([])
    }

    return(
        <CartContext.Provider value={{cart,addToCart, clearCart}}>
            {children}
        </CartContext.Provider>
    )
}