import React, { useState, useEffect, useContext } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import { GlobalContext } from '../../../context/GlobalContext';
import { getCategories, getSongs } from '../../../context/GlobalActions';
import { axiosInstance } from '../../../config/axiosInstance';
import Swal from 'sweetalert2'

const ModalEditSongs = ({showSongs, setShowSongs,song}) => {

  const [audioFile, setAudioFile] = useState([]);
  const [errors, setErrors] = useState({});
  const [formDatos, setFormDatos] = useState({
    title: "",
    artist: "",
    category: "",
  })
  const [loading, setLoading] = useState(false);
  const {state, dispatch} = useContext(GlobalContext)
  
  const handleClose = () => setShowSongs(false);

  
    const validateCategoryName = (name) => {
      const regex = /^[A-Za-z0-9\s]+$/;
      return regex.test(name);
    };
  
  
    const handleChangeDatos = (e) => {
  
      const { name, value } = e.target;
      setFormDatos({
        ...formDatos,
        [e.target.name]: e.target.value,
      })
    }
  
    const handleAudioChange = (e) => {
      setAudioFile([...e.target.files])
    }
  
    const handleSubmit = async (e) => {
      // const token = localStorage.getItem("token");
      e.preventDefault();
      if (Object.values(errors).some(error => error)) {
      return; 
    }
      try {
        setLoading(true);
        const formData = new FormData();
        if (formDatos.title === "") {
          formDatos.title = song.title
        }
        if (formDatos.artist === "") {
          formDatos.artist = song.artist
        }
        if (formDatos.category === "") {
          formDatos.category = song.category._id
        }
        formData.append("title", formDatos.title)
        formData.append("artist", formDatos.artist)
        formData.append("category", formDatos.category)
        console.log("id song",song._id)
        // formData.append("audio", audioFile[0])
        console.log("formData", formData)
        console.log("fomDatos", formDatos)
        const resp = await axiosInstance.put(`/${song._id}`, formData)
        Swal.fire({
            icon: "success",
            title: "Canción agregada correctamente"
          });
        //   reset()
        // await updateSongs();
          handleClose()
                  // getCategories()
        // handleCloseC()
        setLoading(false);
      } catch (error) {
        console.log("error", error)
        Swal.fire({
          icon: "error",
          title: `Ocurrió un problema! Error${error.response}`,
          text: `${error.response}`
        })
      }finally {
        dispatch(getSongs())
        setLoading(false); 
        document.getElementById("formSong").reset()
      }
    }

  return (  <>


      <Modal show={showSongs} onHide={handleClose} className='back'>
        <Modal.Header closeButton className='glass'>
          <Modal.Title className='titleUser'>Editar canción</Modal.Title>
        </Modal.Header>
        <Modal.Body className='glass'>
        <form className="form-container" onSubmit={handleSubmit} id='formSong' encType='multipart/form-data'>
        <div className="mb-2 pt-2">
          <label className="form-label">Titutlo del audio</label>
          <input
            type="text"
            className={`form-control ${errors.title ? 'is-invalid' : ''}`}
            name="title"
            onChange={handleChangeDatos}
            maxLength={40}
            // value={formDatos.title}
            placeholder={formDatos.title==="" ? song.title : formDatos.title}
          />
           {errors.title && <div className="invalid-feedback">Ingresa un nombre válido.</div>}
        </div>

        <div className="mb-2 pt-2">
          <label className="form-label">Artista</label>
          <input
            type="text"
            className="form-control"
            name="artist"
            onChange={handleChangeDatos}
            placeholder={formDatos.artist==="" ? song.artist : formDatos.artist}
            // defaultValue={song.artist}
          />
        </div>

        <div className="mb-2 pt-2">
          <label className="form-label">Categoria del audio</label>
          <select name="category" id="" onChange={handleChangeDatos}
             className="form-control">
              <option value={song.category._id}>{song.category.name}</option>
            {state.categories && state.categories.map(category => (
              <option key={category._id} value={category._id}>{category.name}</option>
            ))}
          </select>
        </div>

        

        {/* <div className="mb-2 pt-2">
          <label className="form-label">Cargar archivo</label>
          <input
            type="file"
            className="form-control"
            name="imagenes"
            onChange={handleAudioChange}
          />
        </div> */}
        
        {
          loading ?
            (
              <div className="d-grid mt-3 justify-content-center mt-4 mb-3">
                <Spinner />
              </div>
            )
            :
            (
              <div className="d-grid mt-5 mb-4">
                <button className="btn btn-save" type="submit" >Guardar Cambios</button>
              </div>
            )
        }
      </form >
        </Modal.Body>
        <Modal.Footer className='glass'>
          <Button variant="secondary" onClick={handleClose} className='btn-cancel'>
            Salir sin guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
      )
}

export default ModalEditSongs