import { jwtDecode } from 'jwt-decode';
import React, {useContext, useEffect} from 'react';
import { Navigate, Outlet } from 'react-router';
import Swal from 'sweetalert2';
import { GlobalContext } from '../context/GlobalContext';



const PrivateRoutesAdmin = () => {
    const {state, dispatch} = useContext(GlobalContext)

    useEffect(() => {
        if (localStorage.getItem("localIsLogged")) {
          dispatch({type: 'SET_IS_LOGGED', payload: true})
        }
      },[])

      const useAuth = () => {
        const token = localStorage.getItem("token");
        if (token) {
            const decode = jwtDecode(token);
            if (decode.role === "user") {
                return false
            }
            return true
        }
        return false
    }
     
    return useAuth() ? <Outlet /> :
        (
            <Navigate to="/">{Swal.fire({
                icon: "error",
                title: "Debes ser administrador"
            })}</Navigate>
        )
}

export default PrivateRoutesAdmin;