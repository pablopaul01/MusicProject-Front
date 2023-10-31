import React, {useState, useEffect, useRef} from 'react'
import { axiosInstance } from '../config/axiosInstance'


const Player = () => {
  const [songs, setSongs] = useState([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [currenIndexSong, setCurrenIndexSong] = useState(0)
  const [nextIndexSong, setNextIndexSong] = useState(currenIndexSong+1)


useEffect(() => {
  getSongs()

}, [])

useEffect(() => {
  if (isPlaying) {
    audioEl.current.play();
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
    console.log("currenIndexSong" + currenIndexSong)
  }
  else {
    setCurrenIndexSong(currenIndexSong-1)
  }
}
console.log(songs)
  const audioEl = useRef("null")
  return (
    <>
        <audio src={songs[currenIndexSong]?.url} ref={audioEl}></audio>
        <h1>Upload</h1>
        <h4>Artista {songs[currenIndexSong]?.artist}</h4>
        <button onClick={()=>skipSong(false)}>ANTERIOR</button>
        <button onClick={()=> setIsPlaying(!isPlaying)}>{isPlaying ? "Pausar" : "Play"}</button>
        <button onClick={skipSong}>SIGUIENTE</button>

    </>
  )
}

export default Player