import React from 'react'
import Login from '../components/login/Login'
import "../components/login/login.css"

const LoginPage = () => {
    return (
        <div className="main">

            <div className="main__figure">
                <img src="../../public/vite" class="main__img" />  
            </div>

            <div className="main__contact">

                <h2 className="main__title">Bienvenido!</h2>
                <p className="main__paragraph">Gracias por volver!</p>

                <Login />
            </div>

        </div>
    )
}

export default LoginPage