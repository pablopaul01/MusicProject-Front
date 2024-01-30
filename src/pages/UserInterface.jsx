import React, {useState, useEffect, useContext} from 'react'
import Player from '../components/Player'
import "../css/userInterface.css"
import {getSongs} from '../context/GlobalActions'
import {GlobalContext} from '../context/GlobalContext'
import MiniPlayer from '../components/MiniPlayer'
import { useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import { axiosInstance } from '../config/axiosInstance'


const UserInterface = () => {
  const [currentIndexSong, setCurrenIndexSong] = useState(0)
  const [currentTimePlayer, setCurrentTimePlayer] = useState("00:00")
  const [isPlayingPlayer, setIsPlayingPlayer] = useState(false)
  const [porcentaje, setPorcentaje] = useState(0)
  const [userData, SetUserData] = useState({});
  const {state, dispatch} = useContext(GlobalContext)

  const {id} = useParams()
    useEffect(() => {
        // dispatch(getSongs())
        getUserById()
      }, [])

      const getUserById = async () => {
        // const token = localStorage.getItem("token");
        if (id) {
          try {
            const response = await axiosInstance.get(`/usuario/${id}`);
            SetUserData(response.data.user);
          } catch (error) {
            Swal.fire({
              icon: "error",
              title: `Ocurrió un problema! Error${error}`,
              text: `${error}`,
            });
          }
        }
      };
      
      // state.id="1231231asd"
// useEffect(() => {
// console.log("id", state.id)
// }, [state.id])
console.log(state)

  return (
    <div className='main'>
        <section >
          { 
            userData?.audioList?.map( (song,idx) => (
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