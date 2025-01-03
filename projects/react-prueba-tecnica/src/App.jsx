import './App.css'
import { useCatFact } from './hook/useCatFact.js'
import { useCatImage } from './hook/useCatImage.js'
import { Otro } from './components/Otro.jsx'

// const CAT_ENPOIND_IMG_URL=`https://catass.com/cat/says/${firstWorld}?size=50&color=red&json=true`

// const CAT_PREFIX_URL = 'https://catasa.com'

export function App () {
  const { fact, refreshRandomFact } = useCatFact()
  const { imageUrl } = useCatImage({ fact })

  const handlerClick = async () => {
    refreshRandomFact()
  }

  return (
    <main>
      <h1>App de gatitos</h1>
      <button onClick={handlerClick}>Get new fact</button>
      {fact && <p>{fact}</p>}
      {/* {imageUrl && <img src={`${CAT_PREFIX_URL}${imageUrl}`} alt={`Image extracted using the first three world for the ${fact}`} />} */}
      {imageUrl && <img src={imageUrl} alt={`Image extracted using the first three world for the ${fact}`} />}
      <Otro />
    </main>
  )
}
