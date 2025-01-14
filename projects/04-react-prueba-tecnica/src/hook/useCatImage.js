// import {useState, useEffect} from 'react'

export function useCatImage ({ fact }) {
//   const [imageUrl, setImageUrl] = useState()
//   useEffect(() => {
//     if (!fact) return
//     const firstWorld = fact.split(' ')[0]
//     console.log('first', firstWorld)
//     fetch(`https://cataas.com/cat/says/${firstWorld}?size=50&color=red&json=true`).then(res => {
//       if (!res.ok) throw new Error('Algo salió mal')
//       return res.json()
//     }
//     ).then(response => {
//       const { url } = response
//       setImageUrl(url)
//       console.log(url)
//     }).catch((err) => {
//       console.log(err)
//     })
//   }, [fact])
  return { imageUrl: 'https://www.ngenespanol.com/wp-content/uploads/2024/02/este-es-el-origen-de-las-diferentes-razas-de-gatos.jpg' }
}
