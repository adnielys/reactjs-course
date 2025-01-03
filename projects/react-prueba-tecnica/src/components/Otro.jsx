import { useCatImage } from '../hook/useCatImage'
export function Otro () {
  const { imageUrl } = useCatImage({ fact: 'Random fact' })
  return (
    <>
      {imageUrl && <img src={imageUrl} />}
    </>
  )
}
