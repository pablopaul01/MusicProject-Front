import React, {useState, useEffect, useContext} from 'react'
import {getSongs} from '../context/GlobalActions'
import {GlobalContext} from '../context/GlobalContext'
import MiniPlayerCrud from '../components/admin/songs/MiniPlayerCrud'
import ModalSongs from '../components/admin/songs/ModalSongs'


const CrudSongs = () => {
    const [currentIndexSong, setCurrenIndexSong] = useState(0)
    const [currentSong, setCurrentSong] = useState({})
    const [currentTimePlayer, setCurrentTimePlayer] = useState("00:00")
    const [isPlayingPlayer, setIsPlayingPlayer] = useState(false)
    const [showSongs, setShowSongs] = useState(false);
    const [porcentaje, setPorcentaje] = useState(0)
    const [stateSongs, setStateSongs] = useState([])
    const {state, dispatch} = useContext(GlobalContext)
  
      useEffect(() => {
          dispatch(getSongs())
          setStateSongs(state.songs)
        }, [state.songs])

        const handleShowSongs = () => setShowSongs(true);
  return (
    <div className='main'>
        <section className='container mb-5 pt-5'> 
            <div className="row">
                <div className="col-4 d-flex gap-3">
                    <button className='btn btn-outline-light'  onClick={handleShowSongs}>Agregar canción</button>  
                    <button className='btn btn-outline-light'>Crear Categoría</button>  
                </div>
                <ModalSongs showSongs={showSongs} setShowSongs={setShowSongs}/>
                <div className="col-4 d-flex align-items-center">

                </div>
                <div className="col-4 d-flex gap-3 align-items-center">
                    <select className="form-select" aria-label="Default select example">
                        <option defaultValue={0}>Filtrar por Categoría</option>
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
                setCurrentSong={setCurrentSong}
                currentSong = {currentSong}
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