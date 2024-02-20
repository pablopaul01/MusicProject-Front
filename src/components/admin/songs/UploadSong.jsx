import React, { useState, useEffect, useContext } from 'react'
import { axiosInstance } from '../../../config/axiosInstance'
import Swal from 'sweetalert2'
import Spinner from 'react-bootstrap/Spinner';
import { GlobalContext } from '../../../context/GlobalContext';
import { getCategories, getSongs } from '../../../context/GlobalActions';



const UploadSong = () => {
  const [audioFile, setAudioFile] = useState([]);
  const [errors, setErrors] = useState({});
  const [formDatos, setFormDatos] = useState({
    title: "",
    artist: "",
    category: "",
  })
  const [loading, setLoading] = useState(false);
  const {state, dispatch} = useContext(GlobalContext)

  useEffect(() => {
    dispatch(getCategories())
  }, [])

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
    const token = localStorage.getItem("token");
    e.preventDefault();
    if (Object.values(errors).some(error => error)) {
    return; 
  }
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", formDatos.title)
      formData.append("artist", formDatos.artist)
      formData.append("category", formDatos.category)
      formData.append("audio", audioFile[0])

      await axiosInstance.post("/", formData, {headers: {Authorization: `Bearer ${token}`}});
      dispatch(getSongs())
      setLoading(false);
    } catch (error) {
      console.log("error",error)
    }
  }

  return (
    <div>
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="mb-2 pt-2">
          <label className="form-label">Titutlo del audio</label>
          <input
            type="text"
            className={`form-control ${errors.title ? 'is-invalid' : ''}`}
            name="title"
            onChange={handleChangeDatos}
            maxLength={40}
            required
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
            required
          />
        </div>

        <div className="mb-2 pt-2">
          <label className="form-label">Categoria del audio</label>
          <select name="category" id="" onChange={handleChangeDatos}
            required  className="form-control">
              <option value=""></option>
            {state.categories && state.categories.map(category => (
              <option key={category._id} value={category._id}>{category.name}</option>
            ))}
          </select>
        </div>

        

        <div className="mb-2 pt-2">
          <label className="form-label">Cargar archivo</label>
          <input
            type="file"
            className="form-control"
            name="imagenes"
            onChange={handleAudioChange}
          />
        </div>
        
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
                <button className="btn btn-danger" type="submit" >Cargar Audio</button>
              </div>
            )
        }
      </form >
    </div >
  )
}

export default UploadSong