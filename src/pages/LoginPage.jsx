import React from 'react'
import Login from '../components/login/Login'

const LoginPage = ({setIsLogged}) => {
    return (
        <div className="container-fluid shadow login">
            <div className="row justify-content-center row-login">
                <div className="col-lg-5 col-md-7 col-sm-9 col-xs-10 px-5 shadow div-login">
                    <div className="titulo border border-top-0 border-end-0 border-start-0">
                        <div className='my-5 ms-5'>
                            <h2 className="titulo-login">Iniciar Sesión</h2>
                        </div>
                        <div className='d-none d-md-block d-lg-block'>
                            <img src='https://res.cloudinary.com/dcv6aut2v/image/upload/v1697100801/RollingHotel-transparente_qah5k2.png' className="ms-5 img-fluid w-75" alt="logo-Rolling-Hotel" />
                        </div>
                    </div>
                    <Login setIsLogged={setIsLogged}/>
                </div>
            </div>
        </div>
    )
}

export default LoginPage