import React from 'react'
// import "../main.css"
import "../css/input.css"
import Header from '../components/Header'

const AudioPlayer = () => {
  return (
    <div className='audioplayer'> 
        <div className="inside_content">
            {<Header />}
            {/* {<Actions />} */}
            {/* {<Playlist />} */}
        </div>
       {/* { <Controls/>} */}
    </div>
  )
}

export default AudioPlayer