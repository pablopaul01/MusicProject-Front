import React from 'react'
import Recover from '../components/recovery-pass/Recover'

const ForgotPass = ({setIsLogged}) => {
    return (
        <div className="container-fluid shadow login">
            <div className="row justify-content-center row-login">
                <div className="col-lg-4 col-md-7 col-sm-9 col-xs-10 px-5 shadow div-login">
                    <div className="py-5 titulo border border-top-0 border-end-0 border-start-0 d-flex justify-content-center align-items-center">
                        <div className='col-6 d-flex justify-content-center align-items-center'>
                            <h2 className="titulo-login text-center mb-0">Recuperar Contraseña</h2>
                        </div>
                        <div className='d-none d-md-block col-6 text-center'>
                            <img src='https://res.cloudinary.com/dtkrptodh/image/upload/v1707952355/media/1-PS_xrqile.png' className="img-fluid" alt="logo" style={{width:"70%"}}/>
                        </div>
                    </div>
                    <Recover setIsLogged={setIsLogged}/>
                </div>
            </div>
        </div>
    )
}

export default ForgotPass