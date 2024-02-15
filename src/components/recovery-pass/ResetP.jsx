import React, { useState, useContext } from 'react'
import "./recover.css"
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { LOGIN_SCHEMA } from '../../helpers/validationsSchemas'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { axiosInstance } from '../../config/axiosInstance'
import Swal from 'sweetalert2'
import { FaEye } from 'react-icons/fa'
import { FaEyeSlash } from 'react-icons/fa'
import Spinner from 'react-bootstrap/Spinner';
import { jwtDecode } from 'jwt-decode'
import { GlobalContext } from '../../context/GlobalContext'




const ResetP = ({setIsLogged}) => {
    const [password, setPassword] = useState()
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false);
    const {state,dispatch} = useContext(GlobalContext)
    // const { register, handleSubmit, formState: { errors }, reset } = useForm({
    //     resolver: yupResolver(LOGIN_SCHEMA)
    // })

    const navigate = useNavigate();
    const {id, token} = useParams()

    const handleSubmit = (e) => {
        e.preventDefault()
        axiosInstance.put(`/usuario/reset/${id}/${token}`, {password})
        .then(res => {
            if(res.data.Status === "Success") {
                navigate('/')
               
            }
        }).catch(err => console.log(err))
    }

    // const onSubmit = async (data) => {

    //     try {
    //         setLoading(true);
    //         const response = await axiosInstance.post("/login", data)
    //         localStorage.setItem("token", response.data.token);
    //         if (response.data.token) {
    //             const decode = jwtDecode(response.data.token);
    //             if (decode.role === "user") {
    //                 navigate(`/audioPlayer/${decode.sub}`);
    //             }
    //             else
    //             {
    //                 navigate(`/users`);
    //             }
    //         }
    //         dispatch({type: 'SET_IS_LOGGED', payload: true})
    //         localStorage.setItem("localIsLogged", true);
    //         Swal.fire({
    //             icon: "success",
    //             title: "Bienvenido"
    //         })
    //         setIsLogged(true)
    //     } catch (error) {
    //         console.log(error.response);
    //         Swal.fire({
    //             icon: "error",
    //             title: `Ocurrió un problema!`,
    //             text: `${error.response.data.mensaje}`
    //         })
    //     } finally {

    //         setLoading(false); 
    //         reset();
    //     }
    // }





    return (

        <form className="text-white" onSubmit={handleSubmit}>
            <div className="mb-2 pt-4">
                <label className="form-label">Contraseña nueva</label>
                <div className="mb-2 input-group">
                    <input
                        type={showPassword ? "text" : "password"}
                        className="form-control"
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                        maxLength={40}
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
            </div>
            {/* <p className="text-danger my-1 text-center">
                {errors.username?.message}
            </p> */}
            
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
                            <button  type={'submit'} className="btn btn-outline-light boton-login mt-2">Actualizar</button>
                        </div>
                    )
            }

            <div className="text-center">
                <Link className="btn link mb-4">Si el correo ingresado es correcto recibirás un mail para reestablecer tu contraseña</Link>
            </div>
        </form>

    )
}

export default ResetP