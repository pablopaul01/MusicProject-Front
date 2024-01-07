import React from 'react';
import { Navigate, Outlet } from 'react-router';
import Swal from 'sweetalert2';


const PrivateRoutesUser = () => {
    const isAuth = localStorage.getItem("token");
    return isAuth ?
        <Outlet />
        :
        <Navigate to="/login">{Swal.fire({
            icon: "info",
            title: "Debes iniciar sesión"
        })}</Navigate>
}

export default PrivateRoutesUser;