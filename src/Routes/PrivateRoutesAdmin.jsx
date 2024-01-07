import { jwtDecode } from 'jwt-decode';
import React from 'react';
import { Navigate, Outlet } from 'react-router';

import Swal from 'sweetalert2';

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

const PrivateRoutesAdmin = () => {

    return useAuth() ? <Outlet /> :
        (
            <Navigate to="/">{Swal.fire({
                icon: "error",
                title: "Debes ser administrador"
            })}</Navigate>
        )
}

export default PrivateRoutesAdmin;