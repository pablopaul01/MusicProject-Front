import React, {useState, useEffect, useContext} from 'react'
import Player from './Player'
import { axiosInstance } from '../config/axiosInstance'
import "../css/userInterface.css"
import {getSongs} from '../context/GlobalActions'
import {GlobalContext} from '../context/GlobalContext'


const UserInterface = () => {
    // const [songs, setSongs] = useState([])
    const {state, dispatch} = useContext(GlobalContext)
    console.log(dispatch)
    console.log(state)
    useEffect(() => {
        // getSongs()
        dispatch(getSongs())
      }, [])

      // const getSongs = async() => {
      //   const audios = await axiosInstance.get('/')
      //   try {
      //     if (audios) {
      //       setSongs(audios.data.audios)
      //     }
      //   } catch (error) {
      //     console.log(error)
      //   }
      // }
      
  return (
    <div>
        <section className='main'></section>
        <Player/>
    </div>
  )
}

export default UserInterface