import { useEffect, useState } from 'react'

const FollowMouse=()=>{
  const [enabled, setEnabled] = useState(false)
  const[position, setPosition] = useState({x:0, y:0})
 
  useEffect(() => {
     console.log('Me monto',{enabled})
     const handleMove = (event) => {
       const {clientX, clientY} = event
       console.log({clientX, clientY})
       setPosition({x: clientX, y: clientY})
     }
     if(enabled){
       window.addEventListener('pointermove', handleMove)
     }
    // cleanup
    // cuando el compomemte se desmonta
    // cuando cambian las dependencias, antes de ejecutar 
    // el efecto de nuevo
     return () => {
       console.log('Me desmonto')
       window.removeEventListener('pointermove', handleMove)
     }
   }, [enabled])

   return (
       <>  
        <div id='shadow' style={{
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        border: '1px solid #fff',
        borderRadius: '50%',
        opacity: 0.8,
        pointerEvents: 'none',
        left: -25,
        top: -25,
        width: 50,
        height: 50,
        transform : `translate(${position.x}px, ${position.y}px)`
       }}/>
      <button onClick={() => setEnabled(!enabled)}>
        {enabled ? 'Desactivar' : 'Activar'}
      </button>
      <p>{enabled ? 'Está activado' : 'Está desactivado'}</p>
      </>
   )
}
function App() {
  const [mounted, setMounted]= useState(true)

  return (
    <main>
    {mounted && <FollowMouse />}
    <button onClick={()=>setMounted(!mounted)} >Toogle mounted FollowMouse componente</button>
    </main>
    
  )
}

export default App
