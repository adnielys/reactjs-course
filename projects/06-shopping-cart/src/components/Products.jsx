import './Products.css'
import { AddToCartIcon } from './Icons.jsx'
import { useCart } from '../hooks/useCart.js'

export function Products ({ products }) {
    const {cart, removeFromCart, addToCart} = useCart()
    
    const checkProductInCart = product => {
        return cart.some(item => item.id === product.id)
    }
    
    return(
        <main className='products'>
            <ul>
                {
                    products.slice(0,10).map(product=>{
                        const isProductInCart = checkProductInCart(product)

                        return( <li key={product.id}>
                            <img 
                            src={product.thumbnail}
                            alt={product.title} />
                            <div>
                                <strong>{product.title}</strong> - ${product.price}
                            </div>
                            <div>
                               <button style={{backgroundColor:isProductInCart? 'red': '#09f' }} onClick={()=>isProductInCart ? removeFromCart(product) : addToCart(product)}>
                                <AddToCartIcon />
                               </button>
                            </div>
                        </li>)
                       
                     }

                    )
                }
            </ul>
        </main>
    )
}