import React from 'react'
import "../css/footer.css"
import { FaInstagram } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa6";


const Footer = () => {
  return (
    <div className='container-fluid footer'>
            <div className="row pt-4 d-flex justify-content-center gap-5">
                <div className="col-12 col-md-2 d-flex justify-content-center align-items-center gap-1"><FaInstagram className='icons-footer'/> <a href='https://www.instagram.com/luis.isa.alyabal.ok' className='mb-0' target='blank'> Luis.isa.alyabalok</a></div>
                <div className="col-12 col-md-2 d-flex justify-content-center align-items-center gap-2"><FaFacebook className='icons-footer'/> <a href='https://www.facebook.com/LuisFranciscoIsa/' className='mb-0' target='blank'> Luis Isa</a></div>
                <div className="col-12 col-md-2 d-flex justify-content-center align-items-center gap-1"><FaWhatsapp className='icons-footer'/> <a href='https://wa.me/+5493813857319' className='mb-0' target='blank'>+5493813857319</a></div>
                <div className="col-12 col-md-2 d-flex justify-content-center align-items-center gap-2"><FaYoutube className='icons-footer'/> <a href="https://www.youtube.com/@LuisIsaderbake" className='mb-0' target='blank'>@LuisIsaderbake</a></div>
            </div>
            <div className="row justify-content-center">
                <div className="col-12 col-md-6 text-center">
                    <p className="text-center mt-4 autor">Diseñado por <a href='https://jpsalomon.com.ar/' className='autor' target='blank'>JPSalomon</a></p>
                </div>
            </div>
    </div>
  )
}

export default Footer