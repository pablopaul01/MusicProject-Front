import React, {useState, useEffect, useContext} from 'react'
import Player from './Player'
import "../css/userInterface.css"
import {getSongs} from '../context/GlobalActions'
import {GlobalContext} from '../context/GlobalContext'


const UserInterface = () => {
    const {state, dispatch} = useContext(GlobalContext)

    useEffect(() => {
        dispatch(getSongs())
      }, [])
      
  return (
    <div>
        <section className='main'></section>
        <Player/>
    </div>
  )
}

export default UserInterface