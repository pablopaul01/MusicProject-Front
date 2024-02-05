import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { UPDATE_SCHEMA_ADMIN } from "../../../helpers/validationsSchemas";
import { FiEdit } from "react-icons/fi";
import { axiosInstance } from "../../../config/axiosInstance";
import { GlobalContext } from '../../../context/GlobalContext';
import { getUsers, getSongs } from '../../../context/GlobalActions';
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
import Spinner from "react-bootstrap/Spinner";
import datos from "../../../helpers/data";

const FormEditUser = ({ showEdit, setShowEdit, handleClose, idUser }) => {
  const [editInputName, setEditInputName] = useState(true);
  const [editInputMail, setEditInputMail] = useState(true);
  const [role, setRole] = useState("");
  const [editInputLastName, setEditInputLastName] = useState(true);
  const [editInputDni, setEditInputDni] = useState(true);
  const [editInputPhone, setEditInputPhone] = useState(true);
  const [userData, SetUserData] = useState({});

  const [loading, setLoading] = useState(false);
  const {state, dispatch} = useContext(GlobalContext)

  const {
    register,
    handleSubmit,
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
    // const token = localStorage.getItem("token");
    try {
      setLoading(true);
      const response = await axiosInstance.put(`/usuario/${idUser}`, data);
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
              editInputMail ? "btn btn-outline-light" : "btn btn-danger"
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
              editInputName ? "btn btn-outline-light" : "btn btn-danger"
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
              editInputLastName? "btn btn-outline-light" : "btn btn-danger"
            }
            type="button"
            onClick={() => setEditInputLastName(!editInputLastName)}
          >
            <FiEdit />
          </button>
        </div>
      </div>
      <p className="text-danger my-1">{errors.name?.message}</p>
      <div className="mb-2 pt-2">
        <label className="form-label">Rol de Usuario</label>
        <select name="role" className="form-select" {...register("role")}>
          <option value="user">user</option>
          <option value="admin">admin</option>
        </select>
      </div>
      <p className="text-danger my-1">{errors.role?.message}</p>
      {loading ? (
        <div className="text-center mt-4">
          <Spinner />
        </div>
      ) : (
        <>
          <button
            className="btn btn-outline-light boton-login mt-3"
            type="submit"
          >
            Guardar Cambios
          </button>
          <Button variant="light" className="mt-3 mx-2" onClick={handleClose}>
            Cancelar
          </Button>
        </>
      )}
    </form>
  );
};

export default FormEditUser;
