import React, {useState, useEffect, useContext} from 'react'
import {getCategories, getSongs} from '../context/GlobalActions'
import {GlobalContext} from '../context/GlobalContext'
import MiniPlayerCrud from '../components/admin/songs/MiniPlayerCrud'
import ModalSongs from '../components/admin/songs/ModalSongs'
import ModalCategory from '../components/admin/songs/ModalCategory'


const CrudSongs = () => {
    const [currentSong, setCurrentSong] = useState({})
    const [currentTimePlayer, setCurrentTimePlayer] = useState("00:00")
    const [isPlayingPlayer, setIsPlayingPlayer] = useState(false)
    const [showSongs, setShowSongs] = useState(false);
    const [showCategory, setShowCategory] = useState(false);
    const [porcentaje, setPorcentaje] = useState(0)
    const [stateSongs, setStateSongs] = useState([])
    const {state, dispatch} = useContext(GlobalContext)
    const [selectedCategory, setSelectedCategory] = useState('Filtrar por Categoría'); // Estado para la categoría seleccionada
    const [searchTerm, setSearchTerm] = useState('');
    const [currenIndexSong, setCurrenIndexSong] = useState("")

    useEffect(() => {
      dispatch(getCategories())
    }, [])
  
      useEffect(() => {
          dispatch(getSongs())
          setStateSongs(state.songs)
        }, [])

        const handleShowSongs = () => setShowSongs(true);
        const handleShowCategory = () => setShowCategory(true);

        const handleCategoryChange = (e) => {
          setSelectedCategory(e.target.value);
        };

        const handleSearch = (e) => {
          setSearchTerm(e.target.value);
        };
      
        const filteredSongs = state.songs
        .filter((song) =>  selectedCategory==='Filtrar por Categoría' || song.category?._id === selectedCategory)
        .filter((song) => searchTerm === '' || song.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className='main'>
      <div className='container-fluid cabecera'>
        <div className='row'>
          <div className='col d-flex justify-content-around'>
          </div>
        </div>
      </div>
        <section className='container mb-5 pt-5'> 
            <div className="row">
                <div className="col-12 col-md-4 d-flex gap-3 justify-content-center mb-3 mb-md-0">
                    <button className='btn btn-outline-light'  onClick={handleShowSongs}>Agregar canción</button>  
                </div>
                <ModalSongs showSongs={showSongs} setShowSongs={setShowSongs}/>
                <ModalCategory showCategory={showCategory} setShowCategory={setShowCategory}/>
                <div className="col-12 col-md-6 d-flex gap-3 align-items-center flex-column flex-md-row">
                    <select className="form-select" aria-label="Default select example" onChange={handleCategoryChange} style={{width: '180px'}}>
                        <option >Filtrar por Categoría</option>
                        {state.categories.map( (category,idx) => (
                          <option key={idx} value={category._id}>{category.name}</option>
                        ))}
                    </select>
                    <input type="text" className="form-control" placeholder="Buscar canción..." onChange={handleSearch}/>
                </div>
            </div>
        </section>
        <section className='pb-5 px-5'>
          { filteredSongs.length === 0? (

            <p className='ms-5 artistPlayer'>No se encontraron coincidencias...</p>
          
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