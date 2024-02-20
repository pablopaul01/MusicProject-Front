import React, {useState, useEffect, useContext} from 'react'
import { getSongs, getUsers} from '../context/GlobalActions'
import {GlobalContext} from '../context/GlobalContext'
import ModalCategory from '../components/admin/songs/ModalCategory'
import DataTable from 'react-data-table-component';
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import { ImBlocked } from "react-icons/im";
import ModalUsers from '../components/admin/users/ModalUsers'
import Swal from 'sweetalert2'
import "../css/crudUser.css"
import { MdAudiotrack } from "react-icons/md";
import { axiosInstance } from '../config/axiosInstance'
import ModalEditUser from '../components/admin/users/ModalEditUser'
import ModalUsersSongs from '../components/admin/users/ModalUsersSongs';
import { jwtDecode } from 'jwt-decode';


const CrudUsers = () => {

    const [showSongs, setShowSongs] = useState(false);
    const [showUsersSongs, setShowUsersSongs] = useState(false);
    const [showCategory, setShowCategory] = useState(false);
    const {state, dispatch} = useContext(GlobalContext) // Estado para la categoría seleccionada
    const [searchTerm, setSearchTerm] = useState('');
    const [showEdit, setShowEdit] = useState(false);
    const [idUser, setIdUser] = useState("")
    const [idUserSong, setIdUserSong] = useState("")
    const [userData, SetUserData] = useState({});
    const [filterType, setFilterType] = useState("")
    const [stateSongs, setStateSongs] = useState([])

    useEffect(() => {
      dispatch(getUsers())
      dispatch(getSongs())
      setStateSongs(state.songs)
    }, [])

    const handleClose = () => setShowEdit(false);
    const handleShowEdit = () => setShowEdit(true);
    const handleShowUsersSongs = () => setShowUsersSongs(true);
    let filteredSongs = []
    

    const handleClickEdit = (row) => {
        handleShowEdit();
        setIdUser(row)
    }

    const handleClickUserSong = (row) => {
      handleShowUsersSongs();
      setIdUserSong(row)
  }

        const handleShowSongs = () => setShowSongs(true);

        const handleSearch = (e) => {
          setSearchTerm(e.target.value);
        };

        const columns = [
          {
            name: '#',
            selector: (row, index) => index+1,
            width: "fit-content",
          },
          {
            name: 'Nombre',
            selector: row => row.name,
            sortable: true,
            center: "true",
          },
          {
            name: 'Apellido',
            selector: row => row.lastname,
            sortable: true,
            center: "true",
          },
          {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
            center: "true",
          },
          {
            name: 'Rol',
            selector: row => row.role,
            sortable: true,
            width: "fit-content",
            center: "true",
          },
          {
            name: 'Estado',
            selector: row => (row.state === true ? 'Activo' : 'Inactivo'),
                        center: "true",
                        width: "fit-content",
          },
          {
            name: "Acciones",
            selector: row => {
                return (
                    <div style={{ display: "flex", gap: "5px", justifyContent: "center" , minWidth: "150px"}}>
                        <button className="btn btn-outline-light btn-sm d-flex align-items-center " title="Editar"  onClick={() => { handleClickEdit(row._id) }}><FaRegEdit className='t-1'/></button>
                        <button className="btn btn-outline-light btn-sm d-flex align-items-center" title="Asignar Audios" onClick={() => { handleClickUserSong(row._id)}} ><MdAudiotrack  className='t-1'/></button>
                        <button className="btn btn-danger btn-sm d-flex align-items-center" title="Suspender/Activar" onClick={() => { disabledUser(row._id) }}><ImBlocked id='t-1'/></button>
                        <button className="btn btn-danger btn-sm d-flex align-items-center" title="Eliminar"  onClick={() => { deleteUser(row._id) }}><FaTrashAlt className='t-1'/></button>
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
      
      let filteredUsers = []
      if (filterType === "Por nombre") {
        filteredUsers = state.users.filter((user) => searchTerm === '' || user.name.toLowerCase().includes(searchTerm.toLowerCase()))
      }
      else if (filterType === "Por apellido") {
        filteredUsers = state.users.filter((user) => searchTerm === '' || user.lastname.toLowerCase().includes(searchTerm.toLowerCase()))
      }
      else if (filterType === "Por email") {
        filteredUsers = state.users.filter((user) => searchTerm === '' || user.email.toLowerCase().includes(searchTerm.toLowerCase()))
      }
      else {
        filteredUsers = state.users
      }

        const deleteUser = async (row) => {
          const token = localStorage.getItem("token");
          const decoded = jwtDecode(token);   
          if (decoded.sub === row) {
            Swal.fire({
                  icon: 'error',
                  title: 'No puedes eliminar un usuario',
                  text: 'No puedes eliminar un usuario que estes logueado',
              })
          }else{

            try {
                Swal.fire({
                    title: 'Esta seguro de eliminar el usuario?',
                    text: "No podrás revertir los cambios!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si, eliminar!'
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        await axiosInstance.delete(`/usuario/${row}`, {
                          headers: {
                            Authorization: `Bearer ${token}`,
                          }
                        });
                        Swal.fire(
                            'Eliminado!',
                            'El usuario fue eliminado',
                            'success'
                        )
                       dispatch( getUsers());
                    }
                })
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: `Ocurrió un problema! Error${error.response.data.status}`,
                    text: `${error.response.data.mensaje}`
                })
            }
          }
          
      }


      const disabledUser = async (row) => {
        const token = localStorage.getItem("token");
        try {
            await axiosInstance.put(`/desactivar/usuario/${row}`,null , {
              headers: {
                Authorization: `Bearer ${token}`,
              }
            });
           
            Swal.fire(
                'Bien hecho!',
                `Estado actualizado`,
                'success'
            )
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: `Ocurrió un problema! Error${error.response.data.status}`,
                text: `${error.response.data.mensaje}`
            })
        } finally {
            dispatch(getUsers());
        }
    }


    const getUserById = async () => {
      // const token = localStorage.getItem("token");
      if (idUserSong) {
        try {
          const response = await axiosInstance.get(`/usuario/${idUserSong}`);
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
    
    useEffect(() => {
      getUserById();
    }, [idUserSong]);

    const handleFilterType = (e) => {
      setFilterType(e.target.value);
    }

  return (
    <div className='main'>
      <div className='container-fluid cabecera'>
        <div className='row'>
          <div className='col d-flex justify-content-around'>
          </div>
        </div>
      </div>
        <section className='container pb-3 pt-5'> 
            <div className="row justify-content-between">
                <div className="col-12 col-md-4 d-flex gap-3 justify-content-start mb-3 mb-md-0">
                    <button className='btn btn-outline-light'  onClick={handleShowSongs}>Crear usuario</button>  
                </div>
                <ModalUsers showSongs={showSongs} setShowSongs={setShowSongs}/>
                <ModalCategory showCategory={showCategory} setShowCategory={setShowCategory}/>

                <div className="col-12 col-md-6 d-flex gap-3 align-items-center flex-column flex-md-row">
                    <select name="filterTyper" id="filterType" className='form-select' style={{width: '180px'}} onChange={handleFilterType}>
                      <option value="">Tipo de busqueda</option>
                      <option value="Por nombre">Por nombre</option>
                      <option value="Por apellido">Por apellido</option>
                      <option value="Por email">Por email</option>
                    </select>
                    <input type="text" className="form-control" placeholder="Buscar..." onChange={handleSearch}/>
                </div>
            </div>
        </section>
        <section className='container pb-5 pt-5'>
          { filteredUsers.length === 0? (

            <p className='ms-5 artistPlayer'>No se encontraron coincidencias...</p>
          
          ) :
          (<>
            <DataTable
			        columns={columns}
			        data={filteredUsers}
              pagination
              theme='dark'
              highlightOnHover
		          pointerOnHover
              paginationComponentOptions={paginationComponentOptions}

		        />
            <ModalEditUser showEdit={showEdit} handleClose={handleClose} setShowEdit={setShowEdit} idUser={idUser}/>
            <ModalUsersSongs showUsersSongs={showUsersSongs} setShowUsersSongs={setShowUsersSongs} idUserSong={idUserSong} userData={userData} SetUserData={SetUserData} getUserById={getUserById}/>
            </>
          )
          }

        </section>

    </div>
  )
}

export default CrudUsers