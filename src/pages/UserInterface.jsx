import React, {useState, useEffect, useContext} from 'react'
import Player from '../components/Player'
import "../css/userInterface.css"
import {getSongs, getSongsByUser, getCategories} from '../context/GlobalActions'
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
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Filtrar por Categoría');
  const [activeFilter, setActiveFilter] = useState(false);
  const [categoryName, setCategoryName] = useState('');

  const {id} = useParams()
    useEffect(() => {
        dispatch(getSongsByUser(id))
      }, [])

      const getUserById = async () => {
        const token = localStorage.getItem("token");
        if (id) {
          try {
            const response = await axiosInstance.get(`/usuario/${id}`, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
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

      const filteredSongs = state.songsByUser
      .filter((song) =>  selectedCategory==='Filtrar por Categoría' || song.category === selectedCategory)
      .filter((song) => searchTerm === '' || song.title.toLowerCase().includes(searchTerm.toLowerCase()));

    useEffect(() => {
      dispatch(getCategories())
    }, [])

    const handleCategoryChange = (e) => {
      setSelectedCategory(e.target.value);
    };

    const handleSearch = (e) => {
      setSearchTerm(e.target.value);
    };

    const handleCategoryClick = (id,name) => {
      setSelectedCategory(id);
      setActiveFilter(true)
      setCategoryName(name)
    }

    const clearFilter = () => {
      setSearchTerm('');
      setSelectedCategory('Filtrar por Categoría');
      setActiveFilter(false);
    }

  return (
    <div className='main'>
      <div className='container-fluid cabecera'>
        <div className='row'>
          <div className='col d-flex justify-content-around'>
          </div>
        </div>
      </div>
      <div className='container-fluid'>
        <div className='py-5 text-center'>
          <img src="https://res.cloudinary.com/dtkrptodh/image/upload/v1707952332/media/1-S_ukyccj.png" alt="" style={{width:"13rem"}}/>
        </div>
      </div>
      
        <section className='songsTable container-fluid'>
        
          <div className="row">
            <div className="col-2 d-md-flex align-items-center d-none">
              <div className='text-center the-scroll' id='global'>
                <div id='mensajes'>
                  {
                    activeFilter ? 
                    (
                      <div> 
                        <button className='btn btn-outline-light my-4' onClick={clearFilter}>
                            Limpiar filtro
                        </button>
                        <div>
                        {categoryName}
                        </div>
                      </div>
                    ) 
                    : 
                    (
                      state.categories.map( (category,idx) => (
                        <div key={idx} className="texto" onClick={()=> handleCategoryClick(category._id,category.name)}>
                          {category.name}
                        </div>
                      ))
                    )
                  }
                </div>
              </div>
            </div>
            <div className="col-12 col-md-10">
              <div className="row justify-content-end mb-4 pe-5 me-5 gap-2 gap-md-0">
                <div className="col-8 col-md-3 d-flex gap-3 align-items-center">
                    <select className="form-select d-inline d-md-none" aria-label="Default select example" onChange={handleCategoryChange}>
                        <option >Filtrar por Categoría</option>
                        {state.categories.map( (category,idx) => (
                          <option key={idx} value={category._id}>{category.name}</option>
                        ))}
                    </select>
                </div>
                <div className="col-8 col-md-3 me-md-5">
                  <input type="text" className="form-control" placeholder="Buscar canción..." onChange={handleSearch}/>
                </div>
              </div>
              { filteredSongs.length === 0? 
              (
                <p className='ms-5 notFound'>No se encontraron coincidencias...</p>
              )
              
              :
              (
                filteredSongs.map( (song,idx) => (
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
              )
              }
            </div>
          </div>

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