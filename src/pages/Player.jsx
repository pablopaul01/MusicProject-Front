import React, {useState, useEffect, useRef} from 'react'

import { formatTime } from '../utils/formatTime'
import "../css/player.css"
import {FaPlay, FaPause, FaBackward, FaForward} from "react-icons/fa"
import WaveSurfer from 'wavesurfer.js'

const Player = ({songs}) => {

  const [isPlaying, setIsPlaying] = useState(false)
  const [currenIndexSong, setCurrenIndexSong] = useState(0)
  const [nextIndexSong, setNextIndexSong] = useState(currenIndexSong+1)
  const [currentTime, setCurretTime] = useState("00:00")
  const [progress, setProgress] = useState(0)
  const [waveForm, setWaveForm] = useState(null)

useEffect(() => {

  if (isPlaying) {
    audioEl.current.play();
  } else {
    audioEl.current.pause();
  }
})




const skipSong = ( forwards = true) => {
  if (forwards) {
    if (currenIndexSong + 1 < songs.length) {

      setCurrenIndexSong(currenIndexSong+1)
    }
  }
  else {
    if (currenIndexSong -1 >= 0) {

      setCurrenIndexSong(currenIndexSong-1)
    }
  }
}

const updateProgress= ()=>{
  const porcentaje = (audioEl.current.currentTime/audioEl.current.duration)*100;
  setProgress(porcentaje)

}

  const audioEl = useRef("null")
  const progressBar = useRef()
  const waveformRef = useRef()

  const createwaveform = () => {
    const wavesurfer = WaveSurfer.create({
      container: "#waveform",
      width: 700,
      height: 30,
      waveColor: '#C0C0C0',
      barGap: 1,
      progressColor: '#96989A',
      fillParent: true,
      media: audioEl.current, // <- this is the important part
    })
    setWaveForm(wavesurfer)
  }

  const useWave = () => {
    waveForm?.destroy()
    createwaveform()
  }


  

  return (
    <>
        <audio src={songs[currenIndexSong]?.url} 
                ref={audioEl}  
                onLoadedData={useWave} 
                onTimeUpdate={(e)=>{
                  setCurretTime(formatTime(e.target.currentTime.toFixed(2)))
                  updateProgress()
                }}></audio>

    <section className='container-fluid mainPlayer py-4'>
                <div className="row px-4">
                  <div className="col-1 d-flex gap-5">
                    <div className='d-flex gap-2 align-items-center'>
                      <span onClick={()=>skipSong(false)} className='mainControls'><FaBackward/></span>
                      <span onClick={()=> setIsPlaying(!isPlaying)} className='mainPlay'>{isPlaying ? <FaPause/> : <FaPlay/>}</span>
                      <span onClick={skipSong} className='mainControls'><FaForward/></span>
                    </div>
                  </div>
                  <div className="col-3 d-flex gap-5 justify-content-center">
                    <div className='d-flex align-items-center'>
                      <p className='mb-0'>{currentTime} / {formatTime(songs[currenIndexSong]?.duration)}</p>
                    </div>
                    <div className='d-flex flex-column align-items-start'>
                      <p className='mb-0'>
                        {songs[currenIndexSong]?.title}
                      </p>
                      <p className='mb-0 artistPlayer'>
                      {songs[currenIndexSong]?.artist}
                      </p>
                    </div>
                  </div>
                  <div className="col-7 d-flex align-items-center">
                    <div id='waveform'></div>
                  </div>

                </div>
        </section>
    </>
  )
}

export default Player