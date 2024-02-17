import React, { useState, useContext } from 'react'
import "./recover.css"
import { Link, useNavigate } from 'react-router-dom'
import { axiosInstance } from '../../config/axiosInstance'
import Swal from 'sweetalert2'
import Spinner from 'react-bootstrap/Spinner';
import { GlobalContext } from '../../context/GlobalContext'


const Recover = ({setIsLogged}) => {
    const [email, setEmail] = useState()
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false);
    const {state,dispatch} = useContext(GlobalContext)

    const navigate = useNavigate();
    
    const handleSubmit = (e) => {
        e.preventDefault()
        axiosInstance.post('/usuario/recuperar', {email})
        .then(res => {
            if(res.data.Status === "Success") {
                navigate('/')
               
            }
        }).catch(err => console.log(err))
    }

    return (

        <form className="text-white" onSubmit={handleSubmit}>
            <div className="mb-2 pt-4">
                <label className="form-label">Correo electrónico</label>
                <input
                    type="email"
                    className="form-control"
                    name="email"
                    maxLength={40}
                    onChange={(e) => setEmail(e.target.value)}
                />
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
                            <button type='submit' className="btn btn-outline-light boton-login mt-2">Recibir mail de recuperación</button>
                        </div>
                    )
            }

            <div className="text-center">
                <Link className="btn link mb-4">Si el correo ingresado es correcto recibirás un mail para reestablecer tu contraseña</Link>
            </div>
        </form>

    )
}

export default Recover