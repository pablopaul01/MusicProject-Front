import React, {useState, useEffect, useRef} from 'react'
import { axiosInstance } from '../config/axiosInstance'
import { formatTime } from '../utils/formatTime'


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
console.log("songs", songs)
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

  const onLoadedMetadata = () => {
    if (audioEl.current) {
        setDuration(formatTime(audioEl.current.duration))
        
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
  return (
    <>
        <audio src={songs[currenIndexSong]?.url} 
                ref={audioEl}  
                onLoadedMetadata={onLoadedMetadata}
                onTimeUpdate={(e)=>{
                  setCurretTime(formatTime(e.target.currentTime.toFixed(2)))
                  updateProgress()
                }}></audio>
        <h1>Player</h1>
        <h4>Artista {songs[currenIndexSong]?.artist}</h4>
        <button onClick={()=>skipSong(false)}>ANTERIOR</button>
        <button onClick={()=> setIsPlaying(!isPlaying)}>{isPlaying ? "Pausar" : "Play"}</button>
        <button onClick={skipSong}>SIGUIENTE</button>
        <p>Duration Time: {duration}</p>
        <p>Current Time: {currentTime}</p>
        <input
      ref={progressBar}
      type="range"
      name=""
      id=""
      value={progress || 0}
      onChange={(e) => handleProgress(e)}
      className='w-50'
    />    
    </>
  )
}

export default Player