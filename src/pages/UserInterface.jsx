import React, {useState, useEffect, useContext} from 'react'
import Player from '../components/Player'
import "../css/userInterface.css"
import {getSongs} from '../context/GlobalActions'
import {GlobalContext} from '../context/GlobalContext'
import MiniPlayer from '../components/MiniPlayer'


const UserInterface = () => {
  const [currentIndexSong, setCurrenIndexSong] = useState(0)
  const [currentTimePlayer, setCurrentTimePlayer] = useState("00:00")
  const [isPlayingPlayer, setIsPlayingPlayer] = useState(false)
  const [porcentaje, setPorcentaje] = useState(0)
  const {state, dispatch} = useContext(GlobalContext)

    useEffect(() => {
        dispatch(getSongs())
      }, [])
      
      // state.id="1231231asd"
// useEffect(() => {
// console.log("id", state.id)
// }, [state.id])
console.log(state)

  return (
    <div className='main'>
        <section >
          { 
            state.songs.map( (song,idx) => (
              <MiniPlayer 
                song={song} 
                key={song._id} 
                idx={idx} 
                setCurrenIndexSong={setCurrenIndexSong} 
                setCurrentTimePlayer={setCurrentTimePlayer} 
                setIsPlayingPlayer={setIsPlayingPlayer}
                waveForm={state.waveForm}
                porcentaje={porcentaje}
                setPorcentaje = {setPorcentaje}
                />
            ))
          }
        </section>
        <Player 
          currentIndexSong={currentIndexSong} 
          currentTimePlayer={currentTimePlayer} 
          isPlayingPlayer={isPlayingPlayer} 
          setIsPlayingPlayer={setIsPlayingPlayer}
          porcentaje={porcentaje}
          />
    </div>
  )
}

export default UserInterface