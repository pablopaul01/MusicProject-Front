import React, {useState, useEffect, useContext} from 'react'
import {getCategories, getSongs} from '../context/GlobalActions'
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
    const [selectedCategory, setSelectedCategory] = useState(''); // Estado para la categoría seleccionada
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
      dispatch(getCategories())
    }, [])
  
      useEffect(() => {
          dispatch(getSongs())
          setStateSongs(state.songs)
        }, [])

        const handleShowSongs = () => setShowSongs(true);

        const handleCategoryChange = (e) => {
          setSelectedCategory(e.target.value);
        };

        const handleSearch = (e) => {
          setSearchTerm(e.target.value);
        };
      
        const filteredSongs = state.songs
        .filter((song) => selectedCategory === 'Filtrar por Categoría' || song.category._id === selectedCategory)
        .filter((song) => searchTerm === '' || song.title.toLowerCase().includes(searchTerm.toLowerCase()));

        if (searchTerm !== '' && filteredSongs.length === 0) {
          // No hubo coincidencias, puedes manejarlo según tus necesidades
          console.log('No se encontraron canciones que coincidan con la búsqueda.');
          console.log("filteredSongs",filteredSongs);
        }
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
                    <select className="form-select" aria-label="Default select example" onChange={handleCategoryChange}>
                        <option defaultValue="">Filtrar por Categoría</option>
                        {state.categories.map( (category,idx) => (
                          <option key={idx} value={category._id}>{category.name}</option>
                        ))}
                    </select>
                    <input type="text" className="form-control" placeholder="Buscar canción..." onChange={handleSearch}/>
                </div>
            </div>
        </section>
        <section >
          { !filteredSongs.length && searchTerm === ''? (
            state.songs?.map( (song,idx) => (
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
          
          ) :
            filteredSongs.map( (song,idx) => (
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