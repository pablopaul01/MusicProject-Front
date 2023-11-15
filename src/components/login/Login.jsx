import React, { useState } from 'react'
import "./login.css"
// import { useForm } from 'react-hook-form'
// import { yupResolver } from '@hookform/resolvers/yup'
// import { LOGIN_SCHEMA } from '../../helpers/validationsSchemas'
import { Link, useNavigate } from 'react-router-dom'
import { axiosInstance } from '../../config/axiosInstance'
import Swal from 'sweetalert2'
import { FaEye } from 'react-icons/fa'
import { FaEyeSlash } from 'react-icons/fa'
import Spinner from 'react-bootstrap/Spinner'

const Login = () => {


    const [showPassword, setShowPassword] = useState(false)
    // const [loading, setLoading] = useState(false);

    // const { register, handleSubmit, formState: { errors }, reset } = useForm({
    //     resolver: yupResolver(LOGIN_SCHEMA)
    // })

    return (
        <form className="main__form">

            <input
                type="text"
                placeholder="Username o email"
                className="main__input" />

            <input
                type="password"
                placeholder="Contraseña"
                className="main__input" />

            <button type="submit" className="main__input main__input--send">
                Ingresar
            </button>

        </form>
    )
}

export default Login