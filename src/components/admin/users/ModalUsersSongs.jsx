import React, { useState, useEffect, useContext } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import { GlobalContext } from '../../../context/GlobalContext';
import { getUsers, getSongs } from '../../../context/GlobalActions';
import { axiosInstance } from '../../../config/axiosInstance';
import { REGISTRO_SCHEMA } from '../../../utils/validationsSchemas';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaEye, FaTrashAlt } from "react-icons/fa";
import DataTable from 'react-data-table-component';
import Swal from 'sweetalert2'
import { formatTime } from '../../../utils/formatTime';
import { IoMdAddCircleOutline } from "react-icons/io";

const ModalUsersSongs = ({showUsersSongs, setShowUsersSongs, idUserSong, userData, setUserData, getUserById}) => {
    const handleClose = () => setShowUsersSongs(false);
    const [showPassword, setShowPassword] = useState(false);
    // const [errors, setErrors] = useState({});
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
    let filteredSongs = []
    if (showUsersSongs && idUserSong === userData._id){
      const userDataAudioListIds = userData?.audioList?.map(audio => audio._id.toString());

      // Filtra las canciones en state.songs que no están en userData.audioList
      filteredSongs = state.songs.filter(song => !userDataAudioListIds?.includes(song._id.toString()));
    }


  
    const onSubmit = async (data) => {
      try {
        setLoading(true);
        const response = await axiosInstance.post("/registrar", data);
  
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

    const columns = [
      {
        name: '#',
        selector: (row, index) => index+1,
        width: "fit-content",
      },
      {
        name: 'Artista',
        selector: row => row.artist,
        sortable: true,
        center: "true",
      },
      {
        name: 'Titulo',
        selector: row => row.title,
        sortable: true,
        center: "true",
      },
      {
        name: 'Duración',
        selector: row => formatTime(row.duration),
        sortable: true,
        center: "true",
      },
      {
        name: "Acciones",
        selector: row => {
            return (
                <div style={{ display: "flex", gap: "10px", justifyContent: "center" , minWidth: "150px"}}>
                    <button className="btn btn-danger btn-sm d-flex align-items-center " title="Quitar canción"  onClick={()=>handleClickDelete(row._id)}><FaTrashAlt  className='t-1'/></button>
                </div>
            )
        },
        center: "true",
    }
    ];

    const columnSongs = [
      {
        name: '#',
        selector: (row, index) => index+1,
        width: "fit-content",
      },
      {
        name: 'Artista',
        selector: row => row.artist,
        sortable: true,
        center: "true",
      },
      {
        name: 'Titulo',
        selector: row => row.title,
        sortable: true,
        center: "true",
      },
      {
        name: 'Duración',
        selector: row => formatTime(row.duration),
        sortable: true,
        center: "true",
      },
      {
        name: "Acciones",
        selector: row => {
            return (
                <div style={{ display: "flex", gap: "10px", justifyContent: "center" , minWidth: "150px"}}>
                    <button className="btn btn-warning btn-sm d-flex align-items-center " title="Agregar canción" onClick={()=>handleClickAdd(row._id)} ><IoMdAddCircleOutline  className='t-1'/></button>
                </div>
            )
        },
        center: "true",
    }
    ];
    const paginationComponentOptions = {
      rowsPerPageText: 'Filas por página',
      rangeSeparatorText: 'de',
      selectAllRowsItem: true,
      selectAllRowsItemText: 'Todos',
  };
  
  const handleClickAdd = async (row) => {
    try {
      const response = await axiosInstance.post(`/usuario/audios/${userData._id}`,{"_id": row}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      });
      Swal.fire({
        icon: "success",
        title: "Canción agregada con éxito",
      });
      dispatch(getUserById(userData._id));;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: `Ocurrió un problema! Error${error.response.data.status}`,
        text: `${error.response.data.mensaje}`,
      });
    }
  }

  const handleClickDelete = async (row) => {
    try {
      Swal.fire({
        title: 'Esta seguro de eliminar el audio?',
        text: "No podrás revertir los cambios!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar!'
    }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await axiosInstance.put(`/usuario/audios/${userData._id}`,{"_id": row});
            Swal.fire(
                'Eliminado!',
                'El audio fue eliminado',
                'success'
            )
            dispatch(getUserById(userData._id));;
        }
    })

    } catch (error) {
      Swal.fire({
        icon: "error",
        title: `Ocurrió un problema! Error${error.response.data.status}`,
        text: `${error.response.data.mensaje}`,
      });
    }
  }

  return (  <>


      <Modal size='lg' show={showUsersSongs} onHide={handleClose} className='back'>
        <div className='glass'>
          <Modal.Header>
            <Modal.Title className='title-modal'>Canciones del usuario</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Lista de canciones seleccionadas</p>
            <DataTable
                columns={columns}
                data={userData.audioList}
                pagination
                theme='dark'
                highlightOnHover
                pointerOnHover
                paginationComponentOptions={paginationComponentOptions}
                noDataComponent="No hay canciones seleccionadas para este usuario aún"
              />
            <p className='mt-5'>Agregar Caciones</p>
            <DataTable
                columns={columnSongs}
                data={filteredSongs}
                pagination
                theme='dark'
                highlightOnHover
                pointerOnHover
                paginationComponentOptions={paginationComponentOptions}
                noDataComponent="No hay canciones disponibles para agregar"
              />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose} className='btn-cancel'>
              Salir
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </>
      )
}

export default ModalUsersSongs