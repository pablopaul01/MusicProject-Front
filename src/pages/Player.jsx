import React, {useState, useEffect, useRef} from 'react'
import { axiosInstance } from '../config/axiosInstance'
import { formatTime } from '../utils/formatTime'
import "../css/player.css"
import {FaPlay, FaPause, FaBackward, FaForward} from "react-icons/fa"
import WaveSurfer from 'wavesurfer.js'

const Player = () => {
  const [songs, setSongs] = useState([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [currenIndexSong, setCurrenIndexSong] = useState(0)
  const [nextIndexSong, setNextIndexSong] = useState(currenIndexSong+1)
  const [currentTime, setCurretTime] = useState("00:00")
  const [duration, setDuration] = useState("00:00")
  const [progress, setProgress] = useState(0)

useEffect(() => {
  getSongs()

}, [])

useEffect(() => {

  if (isPlaying) {
    audioEl.current.play();
    // console.log(audioEl.current.duration)
  } else {
    audioEl.current.pause();
  }
})

  const getSongs = async() => {
    const audios = await axiosInstance.get('/')
    try {
      if (audios) {
        setSongs(audios.data.audios)
      }
    } catch (error) {
      console.log(error)
    }
  }


const skipSong = ( forwards = true) => {
  if (forwards) {
    setCurrenIndexSong(currenIndexSong+1)
  }
  else {
    setCurrenIndexSong(currenIndexSong-1)
  }
}

const updateProgress= ()=>{
  const porcentaje = (audioEl.current.currentTime/audioEl.current.duration)*100;
  setProgress(porcentaje)

}




//hacer la barra de progreso clickeable
function handleProgress(event) {
  const seekTime = (event.target.value / 100) * audioEl.current.duration;
  audioEl.current.currentTime = seekTime;
}

  const audioEl = useRef("null")
  const progressBar = useRef()
  const waveformRef = useRef()

  const createwaveform = async () => {
    const wavesurfer = await WaveSurfer.create({
      container: "#waveform",
      width: 300,
      height: 50,
      waveColor: '#7F9054',
      barGap: 1,
      progressColor: '#40490B',
      fillParent: true,
      media: audioEl.current, // <- this is the important part
    })
  }

  return (
    <>
        <audio src={songs[currenIndexSong]?.url} 
                ref={audioEl}  
                onLoadedData={createwaveform}
                onTimeUpdate={(e)=>{
                  setCurretTime(formatTime(e.target.currentTime.toFixed(2)))
                  updateProgress()
                }}></audio>

        
        <h1>Player</h1>


 
    <section className='container-fluid mainPlayer py-4'>
                <div className="row">
                  <div className="col-3 d-flex gap-5">
                    <div className='d-flex gap-2 align-items-center'>
                      <span onClick={()=>skipSong(false)} className='mainControls'><FaBackward/></span>
                      <span onClick={()=> setIsPlaying(!isPlaying)} className='mainPlay'>{isPlaying ? <FaPause/> : <FaPlay/>}</span>
                      <span onClick={skipSong} className='mainControls'><FaForward/></span>
                    </div>
                    <div className='d-flex align-items-center'>
                      <p className='mb-0'>{currentTime} / {formatTime(songs[currenIndexSong]?.duration)}</p>
                    </div>
                  </div>
                  <div className="col-3 d-flex align-items-center">
                    <p className='mb-0'>
                      {songs[currenIndexSong]?.title} - {songs[currenIndexSong]?.artist}
                    </p>
                  </div>
                  <div className="col-3">
                    {/* <input
                      ref={progressBar}
                      type="range"
                      name=""
                      id=""
                      value={progress || 0}
                      onChange={(e) => handleProgress(e)}
                      className='w-50'
                    />    */}
                    <div id='waveform'></div>
                  </div>

                </div>
        </section>
    </>
  )
}

export default Player