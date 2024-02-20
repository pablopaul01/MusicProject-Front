import { jwtDecode } from 'jwt-decode';
import React from 'react';
import { Navigate, Outlet } from 'react-router';
import Swal from 'sweetalert2';


const PrivateRoutesUser = () => {
    const isAuth = localStorage.getItem("token");
    const decode = jwtDecode(isAuth);
    
    return isAuth && decode.state === true ?
        <Outlet />
        :
        <Navigate to="/login">{Swal.fire({
            icon: "info",
            title: "Debes iniciar sesión"
        })}</Navigate>
}

export default PrivateRoutesUser;