import './App.css'
import { useMovies } from './hooks/useMovies.js'
import { Movies } from './components/Movies.jsx'
import { useRef, useState, useEffect, useCallback } from 'react'
import  debounce from 'just-debounce-it'

function useSearch(){
  const [search, updateSearch] = useState('')
  const [error, setError] = useState(false)
  const isFirstInput = useRef(true)

  useEffect(()=>{
    console.log('effect', search)
    if(isFirstInput.current)
    {
      isFirstInput.current = search === ''
      return
    }
    if(search === '')
    { 
      setError('No se puede buscar una pelicula vacia.')
      return
    }

    if(search.match(/^\d+$/))
    {
      setError('No se puede buscar una pelicula con numero.')
      return
    }

    if(search.length < 3)
    {
      setError('La pelicula debe tener al menos 3 caracteres.')
      return
    }
    setError(null)

  }, [search])
  return { search, updateSearch, error}
}

function App() {
  const [sort, setSort] = useState(false)
  const {search, updateSearch, error} = useSearch()
  const { movies, getMovies,loading} = useMovies({search, sort})
 
  const getDebounceMovies  = useCallback( debounce(search=>{
    console.log('getDebounceMovies', search)
    getMovies({search})
  },300), [getMovies])

  // const [query, setQuery ] = useState('')

  // Declaracion del hook useRef
  // const inputRef = useRef()

  // Aqui se define un useRef para probar como este aunq se renderee mas de una vez el componente
  // este valor  va mutando, diferente de la declaracion de una variable tipo let
 const counter = useRef(0) // valor q persiste entre render
 counter.current ++
 console.log('counter',counter.current)

 let i = 0
 i++
 console.log(i)

  const handSubmit = (event) =>{
    event.preventDefault()
    //Forma de recuperar  todos los input de un form por la forma basica de js vanilla
    // const data = new window.FormData(event.target)
    // const query_form = data.get('query')
    //Forma de recuperarla con todos los input como objetos
    // const fields = Object.fromEntries(new window.FormData(event.target))
    //Object { query: "ffff", otro: "gggg" }
   
   //Forma de recuperarla con  react usando hook useRef
    // const value = inputRef.current.value

    getMovies({search})
    console.log({search})
   
  }
  const handlerChange = (event) =>{
     const newSearch = event.target.value
     updateSearch(newSearch)
     getDebounceMovies(newSearch)
  } 

  const handlerSort = () => {
    setSort(!sort)
  }
  


  return (
    <div className='page'>
      <header>
        <h1>Buscador de peliculas</h1>
        <form className='form' onSubmit={handSubmit}>
          {/* <input ref={inputRef} name="query" placeholder='Advenger, the Matrix, Start Wars ...'/> */}
          <input style={{border: '1px solid transparent', borderColor: error ? 'red': 'transparent'}} value={search}  onChange={handlerChange} name="query" placeholder='Advenger, the Matrix, Start Wars ...'/>
          <input type='checkbox' onChange={handlerSort} checked={sort}/>
          <button type='submit'>Buscar</button>
        </form>
        {error && <p style={{color :'red'}}> {error} </p>}
      </header>

      <main>
        {
          loading ? <p>...Cargando</p> : <Movies movies={ movies }/>
        }
        
      </main>
    </div>
   )
}

export default App
