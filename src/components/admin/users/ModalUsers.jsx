import React, { useState, useEffect, useContext } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import { GlobalContext } from '../../../context/GlobalContext';
import { getUsers, getSongs } from '../../../context/GlobalActions';
import { axiosInstance } from '../../../config/axiosInstance';
import { REGISTRO_SCHEMA } from '../../../utils/validationsSchemas';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import "./modalUser.css"

import Swal from 'sweetalert2'

const ModalUsers = ({showSongs, setShowSongs}) => {

    const handleClose = () => setShowSongs(false);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const {state, dispatch} = useContext(GlobalContext)
  
    const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
    } = useForm({
      resolver: yupResolver(REGISTRO_SCHEMA),
    });

  
    const onSubmit = async (data) => {
      const token = localStorage.getItem("token");
      try {
        setLoading(true);
        const response = await axiosInstance.post("/registrar", data, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
  
        Swal.fire({
          icon: "success",
          title: "Cuenta creada con éxito",
        });
        dispatch(getUsers());
        reset();
        
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: `Ocurrió un problema! Error${error.response.data.status}`,
          text: `${error.response.data.mensaje}`,
        });
      } finally {
        setLoading(false);
        handleClose();
      }
    };
  

  return (  <>


      <Modal show={showSongs} onHide={handleClose} className='back'>
        <div className='glass'>
          <Modal.Header closeButton >
            <Modal.Title ><div className='title-modal'>Crear usuario</div></Modal.Title>
          </Modal.Header>
          <Modal.Body  >
          
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='d-flex'>
                <div className="mb-2 pt-2 w-100 me-1">
                  <label className="form-label">Nombre</label>
                  <input
                    placeholder="Juan Perez"
                    type="text"
                    className="form-control"
                    name="name"
                    {...register("name")}
                    maxLength="40"
                  />
                </div>
                <p className="text-danger my-1">{errors.name?.message}</p>
                <div className="mb-2 pt-2 w-100 ms-1">
                  <label className="form-label">Apellido</label>
                  <input
                    placeholder="Juan Perez"
                    type="text"
                    className="form-control"
                    name="lastname"
                    {...register("lastname")}
                    maxLength="40"
                  />
                </div>
                <p className="text-danger my-1">{errors.lastname?.message}</p>
              </div>
              <div className="mb-2 pt-2">
                <label className="form-label">Correo electrónico</label>
                <input
                  placeholder="ejemplo@ejemplo.com"
                  type="email"
                  className="form-control"
                  name="email"
                  {...register("email")}
                  maxLength="40"
                />
              </div>
              <p className="text-danger my-1">{errors.username?.message}</p>
              <div className="mb-2 pt-2">
                <label className="form-label">Rol de Usuario</label>
                <select defaultValue={"user"} name="role" className="form-select" {...register("role")}>
                  <option value="user">
                    user
                  </option>
                  <option value="admin">admin</option>
                </select>
              </div>
              <div className="mb-2 pt-2">
                <label className="form-label">Contraseña</label>
                <div className="input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    name="password"
                    {...register("password")}
                    maxLength={16}
                    minLength={8}
                  />
                  <span
                    className={
                      showPassword
                        ? "input-group-text btn btn-danger"
                        : "input-group-text btn btn-outline-danger"
                    }
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ cursor: "pointer" }}
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </div>
              </div>
              <p className="text-danger my-1">{errors.password?.message}</p>
              <div className="mb-2 pt-2">
                <label className="form-label">Repetir Contraseña</label>
                <div className="input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    name="repassword"
                    {...register("repassword")}
                    maxLength={16}
                    minLength={8}
                  />
                  <span
                    className={
                      showPassword
                        ? "input-group-text btn btn-danger"
                        : "input-group-text btn btn-outline-danger"
                    }
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ cursor: "pointer" }}
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </div>
              </div>
              <p className="text-danger my-1">{errors.repassword?.message}</p>
              <small className="text-secondary">
                La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito,
                al menos una minúscula y al menos una mayúscula.
              </small>
              {loading ? (
                <div className="d-grid mt-2 justify-content-center mt-3 mb-3">
                  <Spinner />
                </div>
              ) : (
                <div className="d-grid mt-2">
                  <button className="btn btn-outline-light boton-login" type="submit">
                    Crear Usuario
                  </button>
                </div>
              )}
          </form>
          </Modal.Body>
          <Modal.Footer className='glass'>
            <Button variant="secondary" onClick={handleClose}>
              Salir sin guardar
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </>
      )
}

export default ModalUsers