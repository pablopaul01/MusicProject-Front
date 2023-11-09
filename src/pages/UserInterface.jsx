import React, {useState, useEffect} from 'react'
import Player from './Player'
import { axiosInstance } from '../config/axiosInstance'
import "../css/userInterface.css"

const UserInterface = () => {
    const [songs, setSongs] = useState([])

    useEffect(() => {
        getSongs()
      
      }, [])

      const getSongs = async() => {
        const audios = await axiosInstance.get('/')
        try {
          if (audios) {
            setSongs(audios.data.audios)
          }
        } catch (error) {
          console.log(error)
        }
      }
      
  return (
    <div>
        <section className='main'></section>
        <Player songs={songs}/>
    </div>
  )
}

export default UserInterface