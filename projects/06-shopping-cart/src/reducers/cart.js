export const initialCartState =  JSON.parse(window.localStorage.getItem('cart'))|| []

export const CART_ACTION_TYPES={
    ADD_TO_CART: 'ADD_TO_CART',
    REMOVE_FROM_CART: 'REMOVE_FROM_CART',
    CLEAR_CANT: 'CLEAR_CANT'
}

export const updateLocalStorage = state =>{
    window.localStorage.setItem('cart', JSON.stringify(state))
}

const UPDATE_STATE_BY_ACTION = {
    [CART_ACTION_TYPES.ADD_TO_CART]:(state, action) =>{
        const { id } = action.payload
        const productInCartIndex = state.findIndex(item => item.id === id)
        if(productInCartIndex >= 0)
            {
                // const newState = structuredClone(state)
                // newState[productInCartIndex].quantity +=1

                //usando el map
                // const newState = state.map(item => {
                //     if(item.id === id)
                //     {
                //         return {
                //             ...item,
                //             quantity: item.quantity + 1
                //         }
                //     }
                //     return item
                // })

                const newState = [
                    ...state.slice(0, productInCartIndex),
                    {...state[productInCartIndex], quantity : state[productInCartIndex].quantity + 1},
                    ...state.slice(productInCartIndex + 1)
                ]


                updateLocalStorage(newState)
                return newState
            }
        
            const newState=[
                ...state,
                {
                    ...action.payload,
                    quantity: 1
                }
            ]
            updateLocalStorage(newState)
            return newState
    },
    [CART_ACTION_TYPES.REMOVE_FROM_CART]:(state, action) =>{
            const { id } = action.payload
            const newState = state.filter(item => item.id !== id)
            updateLocalStorage(newState)
            return newState
    },
    [CART_ACTION_TYPES.CLEAR_CANT]:(state, action) =>{
            console.log('clear',state)
            console.log('clear',action)
            updateLocalStorage([])
            return []
    }
}

export const cartReducer = (state, action) =>{
    const { type : actionType} = action
    console.log(actionType)
    const updateState = UPDATE_STATE_BY_ACTION[actionType]
    return updateState ? updateState(state, action): state

}

// ejemplo con switch
// export const reducer = (state, action) =>{
//     const { type : actionType, payload: actionPayload } = action
//     switch(actionType)
//     {
//         case CART_ACTION_TYPES.ADD_TO_CART:{
//             const { id } = actionPayload
//             const productInCartIndex = state.findIndex(item => item.id === id)
//             if(productInCartIndex >= 0)
//                 {
//                     const newState = structuredClone(state)
//                     newState[productInCartIndex].quantity +=1
//                     updateLocalStorage(newState)
//                     return newState
//                 }
            
//                 const newState=[
//                     ...state,
//                     {
//                         ...actionPayload,
//                         quantity: 1
//                     }
//                 ]
//                 updateLocalStorage(newState)
//                 return newState
//         }
//         case CART_ACTION_TYPES.REMOVE_FROM_CART:{
//             const { id } = actionPayload
//             const newState = state.filter(item => item.id !== id)
//             updateLocalStorage(newState)
//             return newState
//         }

//         case CART_ACTION_TYPES.CLEAR_CANT:
//             updateLocalStorage(initialCartState)
//             return initialCartState
//     }
//     return state
// }



// como hacer un text de reducer
// expect(
//     reducer([],{type:'ADD_TO_CART',payload:{id:1}}).toEqual([{id:1,quantity:1}])

// )