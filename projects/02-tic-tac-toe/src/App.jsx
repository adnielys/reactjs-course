import { useState,useEffect } from 'react'
import confetti from 'canvas-confetti'
import {Square} from './components/Square.jsx'
import {TURNS} from './constants.js'
import {checkWinnerFrom,checkEndGame} from './logic/board.js'
import {WinnerModal} from './components/WinnerModal.jsx'
import {saveStorage, resetStorage} from './logic/storage/index.js'
import './App.css'


function App() {

  const [board,setBoard]= useState(()=>{
     const boardFromStorage = window.localStorage.getItem('board')
     if (boardFromStorage) return JSON.parse(boardFromStorage)
     return Array(9).fill(null)
  }
    
  )
  console.log(board)

  const [turn, setTurn] =useState(()=>{
      const turnFromStorage = window.localStorage.getItem('turn')
      return turnFromStorage ?? TURNS.X
    }
  )

  
  const [winner, setWinner] = useState(null) //null no hay gandore, false empate, true winner

 
  
  const updateBoard = (index) =>{
    if(board[index] || winner) return
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
   // Guardar aqui partida
    saveStorage({board:newBoard, turn:newTurn})

    const newWinner = checkWinnerFrom(newBoard)
    if(newWinner){
      confetti()
      setWinner(newWinner)
      //TODO: check is game is over
    }
    else if(checkEndGame(newBoard)){
      setWinner(false)
    }
  }

  const resetGame = () =>{
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    resetStorage()
  }

  useEffect(()=>{
    console.log('effect')
  },[winner])

  console.log(board)
  return (
    <main className='board'>
        <h1>Tic tac toe</h1>
        <button onClick={resetGame}>Resetear juego</button>
        <section className='game'>
          {
            board.map((square, index) => {
              return (
                <Square key={index} index={index} updateBoard={updateBoard}>
                 {square}
                 </Square>
              )
            })
          }

        </section>
        <section className='turn'>
          <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
          <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
        </section>
        <WinnerModal winner={winner} resetGame={resetGame}/>
    </main>
    
  )
}

export default App
