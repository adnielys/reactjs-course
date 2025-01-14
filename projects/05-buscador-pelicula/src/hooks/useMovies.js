import  {searchMovies } from  '../services/movies.js'

import { useState, useRef, useMemo, useCallback } from 'react'

export function useMovies({search, sort})
{
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const previousSearch = useRef(search)
  
  // useMemo
  // const getMovies = useMemo(()=>{
  //   return async ({search}) => {
  //     if(search === previousSearch.current) return
  //     try{
  //       setLoading(true)
  //       setError(null)
  //       previousSearch.current = search
  //       const newMovies = await searchMovies({search})
  //       setMovies(newMovies)
  //     }catch(e){
  //       setError(e.message)
  //     }
  //     finally{
  //       setLoading(false)
  //     }
  //   }
  // }, [])
  // useCallback is only for funtion

  const getMovies = useCallback(async ({search}) =>{
        if(search === previousSearch.current) return
        try{
          setLoading(true)
          setError(null)
          previousSearch.current = search
          const newMovies = await searchMovies({search})
          setMovies(newMovies)
        }catch(e){
          setError(e.message)
        }
        finally{
          setLoading(false)
        }
      }, [])
  
 
    const sortMovies = useMemo( () => {
       console.log('memoSortedMove')
       if (!movies || movies.length === 0) {
        return movies // Devuelve tal cual si no hay películas
       }
    
         return sort ? [...movies].sort((a,b)=>a.title.localeCompare(b.title)) : movies
       },
    [sort, movies])

  
  return {movies:sortMovies, getMovies, loading, error}

}