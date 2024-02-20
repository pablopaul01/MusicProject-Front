import React from 'react'
import "../css/home.css"

const Home = ({setIsLogged}) => {
    return (
        <div className="container-fluid shadow main-home">
            <div className="row justify-content-center">
                <div className="d-none col-6 col-md-7 col-lg-5 d-md-flex flex-column justify-content-center align-items-center gap-5">
                    <div className='items-home text-center py-4 px-4'>CLASES DE RITMICA E IMPROVISACION ARABE</div>
                    <div className='items-home text-center py-4'>CLASES EN ACADEMIAS Y PARTICULARES</div>
                    <div className='items-home text-center py-4'>PRACTICA CON CHINCHINES Y DERBAKE</div>
                    <div className='items-home text-center py-4'>SHOWS</div>
                    <div className='items-home text-center py-4'>SEMINARIOS</div>
                </div>
                <div className="col-12 col-md-5 col-lg-7 container-img-home px-0">
                    <div className='img d-flex justify-content-center' alt="">   
                        <div className="d-flex d-md-none flex-column justify-content-center align-items-center gap-5">
                            <div className='items-home-sm text-center py-4 px-4'>CLASES DE RITMICA E IMPROVISACION ARABE</div>
                            <div className='items-home-sm text-center py-4'>CLASES EN ACADEMIAS Y PARTICULARES</div>
                            <div className='items-home-sm text-center py-4'>PRACTICA CON CHINCHINES Y DERBAKE</div>
                            <div className='items-home-sm text-center py-4'>SHOWS</div>
                            <div className='items-home-sm text-center py-4'>SEMINARIOS</div>
                        </div> 
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home