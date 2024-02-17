import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { UPDATE_SCHEMA_ADMIN } from "../../../helpers/validationsSchemas";
import { FiEdit } from "react-icons/fi";
import { axiosInstance } from "../../../config/axiosInstance";
import { GlobalContext } from '../../../context/GlobalContext';
import { getUsers, getSongs } from '../../../context/GlobalActions';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
import Spinner from "react-bootstrap/Spinner";
import "./formEditUser.css"

const FormEditUser = ({ showEdit, setShowEdit, handleClose, idUser }) => {
  const [editInputName, setEditInputName] = useState(true);
  const [editInputMail, setEditInputMail] = useState(true);
  const [role, setRole] = useState("");
  const [editInputLastName, setEditInputLastName] = useState(true);
  const [editInputDni, setEditInputDni] = useState(true);
  const [editInputPhone, setEditInputPhone] = useState(true);
  const [userData, SetUserData] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const {state, dispatch} = useContext(GlobalContext)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    setValue 
  } = useForm({
    resolver: yupResolver(UPDATE_SCHEMA_ADMIN),
  });
  
  const getUserById = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axiosInstance.get(`/usuario/${idUser}`,{
        headers: {
          Authorization: `Bearer ${token}`
      }
      });
      SetUserData(response.data.user);
      setRole(response.data.user.role);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: `Ocurrió un problema! Error${error.response.data.status}`,
        text: `${error.response.data.mensaje}`,
      });
    }
  };
  
  useEffect(() => {
    getUserById();
  }, []);

// Configurar el valor inicial del formulario
useEffect(() => {
    setValue("role", userData.role || "user");
  }, [setValue, userData.role]);

  const onSubmit = async (data) => {
    const token = localStorage.getItem("token");
    try {
      setLoading(true);
      const response = await axiosInstance.put(`/usuario/${idUser}`, data,{
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      handleClose();
      Swal.fire({
        icon: "success",
        title: "Datos del usuario actualizados con éxito",
      });
      dispatch(getUsers());
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: `Ocurrió un problema! Error${error.response.data.status}`,
        text: `${error.response.data.mensaje}`,
      });
    } finally {
      setLoading(false); 
    }
  };

  return (
    <form  onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-2 pt-2">
        <label className="form-label">Correo electrónico</label>
        <div className="input-group mb-3">
          <input
            defaultValue={userData.email || ""}
            disabled={editInputMail}
            type="email"
            className="form-control"
            name="email"
            {...register("email")}
            maxLength="40"
          />
                    <button
            className={
              editInputMail ? "btn btn-outline-edit" : "btn btn-edit"
            }
            type="button"
            onClick={() => setEditInputMail(!editInputMail)}
          >
            <FiEdit />
          </button>
        </div>
      </div>
      <div className="mb-2 pt-2">
        <label className="form-label">Nombre</label>
        <div className="input-group mb-3">
          <input
            disabled={editInputName}
            defaultValue={userData.name || ""}
            type="text"
            className="form-control"
            name="name"
            {...register("name")}
            maxLength="40"
          />
          <button
            className={
              editInputName ? "btn btn-outline-edit" : "btn btn-edit"
            }
            type="button"
            onClick={() => setEditInputName(!editInputName)}
          >
            <FiEdit />
          </button>
        </div>
      </div>
      <p className="text-danger my-1">{errors.name?.message}</p>
      <div className="mb-2 pt-2">
        <label className="form-label">Apellidos</label>
        <div className="input-group mb-3">
          <input
            disabled={editInputLastName}
            defaultValue={userData.lastname || ""}
            type="text"
            className="form-control"
            name="lastname"
            {...register("lastname")}
            maxLength="40"
          />
          <button
            className={
              editInputLastName? "btn btn-outline-edit" : "btn btn-edit"
            }
            type="button"
            onClick={() => setEditInputLastName(!editInputLastName)}
          >
            <FiEdit />
          </button>
        </div>
      </div>
      <p className="text-danger my-1">{errors.lastname?.message}</p>
      <div className="mb-2 pt-2">
        <label className="form-label">Rol de Usuario</label>
        <select name="role" className="form-select" {...register("role")}>
          <option value="user">user</option>
          <option value="admin">admin</option>
        </select>
      </div>
      <div className="mb-2 pt-2">
        <label className="form-label">Nueva contraseña</label>
        <div className="input-group mb-3">
          <input
            type="password"
            className="form-control"
            name="password"
            {...(watch("password") && register("password"))}
            maxLength="40"
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
      {loading ? (
        <div className="text-center mt-4">
          <Spinner />
        </div>
      ) : (
        <>
          <button
            className="btn btn-outline-light mt-3"
            type="submit"
          >
            Guardar Cambios
          </button>
          <Button className="mt-3 mx-2" variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
        </>
      )}
    </form>
  );
};

export default FormEditUser;
