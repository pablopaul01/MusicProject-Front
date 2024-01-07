import React, { useState } from 'react'
import "./login.css"
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { LOGIN_SCHEMA } from '../../helpers/validationsSchemas'
import { Link, useNavigate } from 'react-router-dom'
import { axiosInstance } from '../../config/axiosInstance'
import Swal from 'sweetalert2'
import { FaEye } from 'react-icons/fa'
import { FaEyeSlash } from 'react-icons/fa'
import Spinner from 'react-bootstrap/Spinner';


const Login = ({setIsLogged}) => {

    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(LOGIN_SCHEMA)
    })

    const navigate = useNavigate();



    const onSubmit = async (data) => {

        try {
            setLoading(true);
            const response = await axiosInstance.post("/login", data)
            localStorage.setItem("token", response.data.token);
            navigate("/");
            Swal.fire({
                icon: "success",
                title: "Bienvenido"
            })
            setIsLogged(true)
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: `Ocurrió un problema! Error${error.response.data.status}`,
                text: `${error.response.data.mensaje}`
            })
        } finally {

            setLoading(false); 
            reset();
        }
    }



    return (

        <form className="text-white" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-2 pt-4">
                <label className="form-label">Correo electrónico</label>
                <input
                    type="email"
                    className="form-control"
                    name="username"
                    {...register("username")}
                    maxLength={40}
                />
            </div>
            <p className="text-danger my-1 text-center">
                {errors.username?.message}
            </p>
            <label className="form-label">Contraseña</label>
            <div className="mb-2 input-group">
                <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    name="password"
                    {...register("password")}
                    minLength={8}
                    maxLength={16}
                />
                <span
                    className={showPassword ? ("input-group-text btn btn-danger") : ("input-group-text btn btn-outline-danger")}
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ cursor: "pointer" }} >
                    {
                        showPassword ? (<FaEye />) : (<FaEyeSlash />)
                    }
                </span>
            </div>
            <p className="text-danger my-1 text-center">
                {errors.password?.message}
            </p>
            
            {
                loading ?
                    (
                        <div className="d-grid mt-3 justify-content-center mt-4">
                            <Spinner />
                        </div>
                    )
                    :
                    (
                        <div className="d-grid mt-3">
                            <button className="btn btn-outline-light boton-login mt-2">Iniciar Sesión</button>
                        </div>
                    )
            }

            <div className="mt-3 text-center" id="btn-registro">
                <span>¿No tienes una cuenta registrada?
                    <Link to="/registro" className="btn link">Regístrate</Link></span>
            </div>
            <div className="text-center">
                <Link to="/error" className="btn link mb-4">¿Olvidaste tu contraseña?</Link>
            </div>
        </form>

    )
}

export default Login