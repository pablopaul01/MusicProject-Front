import React, { useState, useEffect, useContext } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import { GlobalContext } from '../../../context/GlobalContext';
import { getCategories, getSongs } from '../../../context/GlobalActions';
import { axiosInstance } from '../../../config/axiosInstance';
import Swal from 'sweetalert2'

const ModalEditCategory = ({showEdit, setShowEdit,idUser}) => {

  const [errors, setErrors] = useState({});
  const [formDatos, setFormDatos] = useState({
    name: "",
  })
  const [loading, setLoading] = useState(false);
  const {state, dispatch} = useContext(GlobalContext)
  
  const handleClose = () => setShowEdit(false);

  
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
        formData.append("name", formDatos.name)
        const resp = await axiosInstance.put(`/category/${idUser}`, formDatos, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        Swal.fire({
            icon: "success",
            title: "Categoría actualizada correctamente"
          });
          handleClose()
        setLoading(false);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: `Ocurrió un problema! Error${error.response.data.status}`,
          text: `${error.response.data.mensaje}`
        })
      }finally {
        setLoading(false); 
        dispatch(getCategories())
        document.getElementById("formCategory").reset()
      }
    }

  return (  <>


      <Modal show={showEdit} onHide={handleClose} className='back'>
        <div className="glass">
          <Modal.Header closeButton>
            <Modal.Title className='title-modal'>Modificar Categoría</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <form className="form-container" onSubmit={handleSubmit} id='formCategory' encType='multipart/form-data'>
          <div className="mb-2 pt-2">
            <label className="form-label">Nombre de la Categoría</label>
            <input
              type="text"
              className={`form-control `}
              name="name"
              onChange={handleChangeDatos}
              maxLength={40}
              placeholder={"Ingrese el nuevo nombre"}
            />
            {errors.title && <div className="invalid-feedback">Ingresa un nombre válido.</div>}
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
                  <button className="btn btn-danger" type="submit" >Guardar Cambios</button>
                </div>
              )
          }
        </form >
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Salir sin guardar
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </>
      )
}

export default ModalEditCategory