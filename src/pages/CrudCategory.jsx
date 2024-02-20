import React, {useState, useEffect, useContext} from 'react'
import {getCategories, getSongs, getUsers} from '../context/GlobalActions'
import {GlobalContext} from '../context/GlobalContext'
import ModalCategory from '../components/admin/songs/ModalCategory'
import DataTable from 'react-data-table-component';
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import { ImBlocked } from "react-icons/im";
import Swal from 'sweetalert2'
import "../css/crudUser.css"
import { axiosInstance } from '../config/axiosInstance'
import ModalUsersSongs from '../components/admin/users/ModalUsersSongs';
import ModalEditCategory from '../components/admin/songs/ModalEditCategory';


const CrudCategory = () => {

    const [showSongs, setShowSongs] = useState(false);
    const [showUsersSongs, setShowUsersSongs] = useState(false);
    const [showCategory, setShowCategory] = useState(false);
    const {state, dispatch} = useContext(GlobalContext) // Estado para la categoría seleccionada
    const [searchTerm, setSearchTerm] = useState('');
    const [showEdit, setShowEdit] = useState(false);
    const [idUser, setIdUser] = useState("")
    const [idUserSong, setIdUserSong] = useState("")
    const [userData, SetUserData] = useState({});

    useEffect(() => {
      dispatch(getCategories())
    }, [])

    const handleClose = () => setShowEdit(false);
    const handleShowEdit = () => setShowEdit(true);
    const handleShowCategory = () => setShowCategory(true);
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
            name: "Acciones",
            selector: row => {
                return (
                    <div style={{ display: "flex", gap: "5px", justifyContent: "center" , minWidth: "150px"}}>
                        <button className="btn btn-outline-light btn-sm d-flex align-items-center " title="Editar"  onClick={() => { handleClickEdit(row._id) }}><FaRegEdit className='t-1'/></button>
                        <button className="btn btn-danger btn-sm d-flex align-items-center" title="Eliminar"  onClick={() => { deleteCategory(row._id) }}><FaTrashAlt className='t-1'/></button>
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
      
        const filteredCategories = state.categories
        .filter((category) => searchTerm === '' || category.name.toLowerCase().includes(searchTerm.toLowerCase()));

        const deleteCategory = async (row) => {
          const token = localStorage.getItem("token"); 
          try {
              Swal.fire({
                  title: 'Esta seguro de eliminar la categoría?',
                  text: "No podrás revertir los cambios!",
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Si, eliminar!'
              }).then(async (result) => {
                  if (result.isConfirmed) {
                      await axiosInstance.delete(`/category/${row}`, {
                        headers: {
                          Authorization: `Bearer ${token}`,
                        }
                      });
                      Swal.fire(
                          'Eliminado!',
                          'El usuario fue eliminado',
                          'success'
                      )
                     dispatch( getCategories());
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

  return (
    <div className='main'>
      <div className='container-fluid cabecera'>
        <div className='row'>
          <div className='col d-flex justify-content-around'>
          </div>
        </div>
      </div>
        <section className='container mb-3 pt-5'> 
            <div className="row">
                <div className="col-4 d-flex gap-3">
                    <button className='btn btn-outline-light'  onClick={handleShowCategory}>Crear categoria</button>  
                </div>
                <ModalCategory showCategory={showCategory} setShowCategory={setShowCategory} idUser={idUser} />
                <div className="col-4 d-flex align-items-center">

                </div>
                <div className="col-4 d-flex gap-3 align-items-center">
                    <input type="text" className="form-control" placeholder="Buscar categoria" onChange={handleSearch}/>
                </div>
            </div>
        </section>
        <section className='container pb-5 pt-5'>
          <div className="row d-flex justify-content-center">
            <div className="col-6">
              { filteredCategories.length === 0? (

                <p className='ms-5 artistPlayer'>No se encontraron coincidencias...</p>

                ) :
                (<>
                <DataTable
                  columns={columns}
                  data={filteredCategories}
                  pagination
                  theme='dark'
                  highlightOnHover
                  pointerOnHover
                  paginationComponentOptions={paginationComponentOptions}

                />
                <ModalEditCategory showEdit={showEdit} handleClose={handleClose} setShowEdit={setShowEdit} idUser={idUser}/>
                </>
                )
              }
            </div>
          </div>
        </section>

    </div>
  )
}

export default CrudCategory