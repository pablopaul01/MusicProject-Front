import React, {useState, useEffect, useContext} from 'react'
import {getSongs} from '../context/GlobalActions'
import {GlobalContext} from '../context/GlobalContext'
import MiniPlayerCrud from '../components/admin/songs/MiniPlayerCrud'


const CrudSongs = () => {
    const [currentIndexSong, setCurrenIndexSong] = useState(0)
    const [currentTimePlayer, setCurrentTimePlayer] = useState("00:00")
    const [isPlayingPlayer, setIsPlayingPlayer] = useState(false)
    const [porcentaje, setPorcentaje] = useState(0)
    const {state, dispatch} = useContext(GlobalContext)
  
      useEffect(() => {
          dispatch(getSongs())
        }, [])
  return (
    <div className='main'>
        <section className='container'> 
            <div className="row">
                <div className="col-4 d-flex gap-3">
                    <button className='btn btn-light'>Agregar canción</button>  
                    <button className='btn btn-light'>Crear Categoría</button>  
                </div>
                <div className="col-4 d-flex align-items-center">

                </div>
                <div className="col-4 d-flex gap-3 align-items-center">
                    <select className="form-select" aria-label="Default select example">
                        <option selected>Filtrar por Categoría</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                    </select>
                    <input type="text" className="form-control" placeholder="Buscar canción..."/>
                </div>
            </div>
        </section>
        <section >
          { 
            state.songs.map( (song,idx) => (
              <MiniPlayerCrud 
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

    </div>
  )
}

export default CrudSongs