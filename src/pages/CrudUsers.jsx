import React, {useState, useEffect, useContext} from 'react'
import {getCategories, getSongs, getUsers} from '../context/GlobalActions'
import {GlobalContext} from '../context/GlobalContext'
import MiniPlayerCrud from '../components/admin/songs/MiniPlayerCrud'
import ModalSongs from '../components/admin/songs/ModalSongs'
import ModalCategory from '../components/admin/songs/ModalCategory'
import DataTable from 'react-data-table-component';
import { set } from 'react-hook-form'

import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import { ImBlocked } from "react-icons/im";
import "../css/crudUser.css"
import ModalUsers from '../components/admin/users/ModalUsers'

const CrudUsers = () => {

    const [showSongs, setShowSongs] = useState(false);
    const [showCategory, setShowCategory] = useState(false);
    const {state, dispatch} = useContext(GlobalContext) // Estado para la categoría seleccionada
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
      dispatch(getUsers())
    }, [])
  
      // useEffect(() => {
      //     dispatch(getSongs())
      //     setStateSongs(state.songs)
      //   }, [])
  console.log("state users", state.users)
        const handleShowSongs = () => setShowSongs(true);
        const handleShowCategory = () => setShowCategory(true);

        const handleCategoryChange = (e) => {
          setSelectedCategory(e.target.value);
          console.log("categoria elegida",e.target.value)
        };

        const handleSearch = (e) => {
          setSearchTerm(e.target.value);
        };

        const columns = [
          {
            name: '#',
            cell: (row, index) => index+1,
            sortable: true,
            maxWidth: "10px"
          },
          {
            name: 'Nombre',
            selector: row => row.name,
            sortable: true,
          },
          {
            name: 'Apellido',
            selector: row => row.lastname,
            sortable: true,
          },
          {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
            center: true,
          },
          {
            name: 'Rol',
            selector: row => row.role,
            sortable: true,
          },
          {
            name: 'Estado',
            selector: row => (row.state === true ? 'Activo' : 'Inactivo'),

          },
          {
            name: "Acciones",
            selector: row => {
                return (
                    <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                        <button className="btn btn-warning btn-sm d-flex align-items-center " title="Editar"  ><FaRegEdit className='t-1'/></button>
                        <button className="btn btn-dark btn-sm d-flex align-items-center" title="Suspender/Activar" ><ImBlocked id='t-1'/></button>
                        <button className="btn btn-danger btn-sm d-flex align-items-center" title="Eliminar" ><FaTrashAlt className='t-1'/></button>
                    </div>
                )
            },
            center: true,
            minWidth: "150px"
        }
        ];
      
        const filteredUsers = state.users
        .filter((user) => searchTerm === '' || user.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className='main'>
        <section className='container mb-5 pt-5'> 
            <div className="row">
                <div className="col-4 d-flex gap-3">
                    <button className='btn btn-outline-light'  onClick={handleShowSongs}>Crear usuario</button>  
                </div>
                <ModalUsers showSongs={showSongs} setShowSongs={setShowSongs}/>
                <ModalCategory showCategory={showCategory} setShowCategory={setShowCategory}/>
                <div className="col-4 d-flex align-items-center">

                </div>
                <div className="col-4 d-flex gap-3 align-items-center">
                    <input type="text" className="form-control" placeholder="Buscar usuario..." onChange={handleSearch}/>
                </div>
            </div>
        </section>
        <section className='container mb-5 pt-5'>
          { filteredUsers.length === 0? (

            <p className='ms-5 artistPlayer'>No se encontraron coincidencias...</p>
          
          ) :
          (
            <DataTable
			        columns={columns}
			        data={filteredUsers}
              pagination
              theme='dark'
              highlightOnHover
		          pointerOnHover

		        />
          )
          }
        </section>

    </div>
  )
}

export default CrudUsers