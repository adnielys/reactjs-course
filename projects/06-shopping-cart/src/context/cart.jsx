import {createContext, useReducer} from 'react'

export const CartContext = createContext()

const initialState =  []

const reducer = (state, action) =>{
    const { type : actionType, payload: actionPayload } = action
    switch(actionType)
    {
        case 'ADD_TO_CART':{
            const { id } = actionPayload
            const productInCartIndex = state.findIndex(item => item.id === id)
            if(productInCartIndex >= 0)
                {
                    const newState = structuredClone(state)
                    newState[productInCartIndex].quantity +=1
                    return newState
                }
            
                return [
                    ...state,
                    {
                        ...actionPayload,
                        quantity: 1
                    }
                ]
        }
        case 'REMOVE_FROM_CART':{
            const { id } = actionPayload
            return state.filter(item => item.id !== id)
        }

        case 'CLEAR_CANT':
            return initialState
    }
    return state
}
// como hacer un text de reducer
// expect(
//     reducer([],{type:'ADD_TO_CART',payload:{id:1}}).toEqual([{id:1,quantity:1}])

// )

export function CartProvider ({children}) {

    //Metodo antiguo para accionar
    // const [cart, setCart] = useState([])

    // const addToCart=(product) => {
    //     // Check if the product is alredy in the cart
    //     const productInCartIndex = cart.findIndex(item => item.id === product.id)
    //     // si el array no es muy grande se puede usar structuredClone para hacer copia profunda del array cart
    //     console.log('index:', productInCartIndex)
    //     if(productInCartIndex >= 0)
    //     {
    //         const newCart = structuredClone(cart)
    //         newCart[productInCartIndex].quantity +=1
    //         return setCart(newCart)
    //     }

    //     // If the product is not in the cart
    //     setCart(prevState=>(
    //         [...prevState,
    //          {
    //             ... product,
    //             quantity:1
    //          }
    //         ]
    //     ))
    // }

    // const removeFromCart= product => {
    //     setCart(prevState => prevState.filter(item => item.id !== product.id)) 
    // }


    // const clearCart = () => {
    //     setCart([])
    // }

    const [state, dispatch] = useReducer (reducer, initialState)

    const addToCart = product =>dispatch({type: 'ADD_TO_CART', payload: product})
    const removeFromCart = product =>dispatch({type: 'REMOVE_FROM_CART', payload: product})
    const clearCart = () =>dispatch({type: 'CLEAR_CANT'})

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