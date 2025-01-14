import { createContext , useState} from "react";

// Singelton -> Modulo de Javascript
// 1- Crear context
export const FiltersContext = createContext()

//2- Crear el Provider, para proveer el context a los componentes
export function FilterProvider ({children}) {

    const [filters,setFilters]= useState({
          category: 'all',
          minPrice:0
    })
    
    return(
        <FiltersContext.Provider value={{filters, setFilters}}>
            {children}
        </FiltersContext.Provider>
    )
}
