import './Filters.css'
import { useId} from 'react'
import { useFilters } from '../hooks/useFilters'

export function Filters(){
    
    const minPriceFilterId = useId()
    const categoryFilterId = useId()
    const {filters, setFilters} = useFilters()

    const handlerChangeMinPrice = (event) =>{
       
        setFilters((prevState) => ({
            ...prevState,
            minPrice:event.target.value
        }))
    }

    const handlerChangeCategory = (event) =>{
        console.log(event.target.value)
        setFilters((prevState)=> ({
            ...prevState,
            category:event.target.value
        }))
    }

    return(
        <section className='filters'>
          <div>
            <label htmlFor={minPriceFilterId}>Min price</label>
            <input value={filters.minPrice} type='range' id={minPriceFilterId} min='0' max='1000' onChange={handlerChangeMinPrice}/>
            <span> ${filters.minPrice} </span>
          </div>
          <div>
           <label htmlFor={categoryFilterId}>Category</label>
           <select id={categoryFilterId} onChange={handlerChangeCategory}>
            <option value='all'>All</option>
            <option value='skincare'>Skincare</option>
            <option value='fragrances'>Fragrances</option>
            <option value='laptops'>Laptops</option>
           </select>
          </div>
        </section>
    )
}