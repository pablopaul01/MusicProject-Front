import React, {useState, useEffect, useRef, useContext} from 'react'
import { formatTime } from '../utils/formatTime'
import "../css/miniPlayer.css"
import {FaPlay, FaPause, FaBackward, FaForward,FaVolumeUp} from "react-icons/fa"
import WaveSurfer from 'wavesurfer.js'
import { GlobalContext } from '../context/GlobalContext'
import { SET_ISPLAYING } from '../context/types'



const MiniPlayer = ({song, idx,setCurrenIndexSong, currentTimePlayer, setCurrentTimePlayer, setIsPlayingPlayer, porcentaje, setPorcentaje}) => {

  const [isPlaying, setIsPlaying] = useState(false)
  // const [currenIndexSong, setCurrenIndexSong] = useState(0)
  // const [nextIndexSong, setNextIndexSong] = useState(currentIndexSong+1)
  const [currentTime, setCurrentTime] = useState("00:00")
  const [progress, setProgress] = useState(0)
  const [waveForm, setWaveForm] = useState(null)
  const {state,dispatch} = useContext(GlobalContext)


// useEffect(() => {

//   if (isPlaying) {
//     // audioEl.current.play();
//     waveForm.play()

//   } else {
//     audioEl.current.pause();
//   }


// })




const skipSong = ( forwards = true) => {
  if (forwards) {
    if (currenIndexSong + 1 < state.songs.length) {

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
      container: `#miniWaveform${song._id}`,
      width: 400,
      height: 10,
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


  const handleChangeVolumen = (e) => {
    audioEl.current.volume = e.target.value
  }
  
  const containerWave= useRef()

  const handleClick = (e) => {
    const clickX = e.nativeEvent.offsetX;
    const waveWidth = e.target.clientWidth;
    setPorcentaje (clickX / waveWidth);
  }

  const handlePlay = () => {
    // setIsPlaying(!isPlaying)
    // state.id= song._id,
    if (state.currentSong._id !== song._id) {
      
      dispatch({type: 'SET_CURRENT_SONG', payload: song})
      dispatch({type:'SET_ISPLAYING', payload: false})
      dispatch({type: 'SET_ISPLAYING', payload: true})
    }
    else
    {
      dispatch({type: 'SET_ISPLAYING', payload: !state.isPlaying})
    }
  }

  return (
    <>
        <audio src={song?.url} 
                ref={audioEl}  
                onLoadedData={useWave} 
                onTimeUpdate={(e)=>{
                  setCurrentTime(formatTime(e.target.currentTime.toFixed(2)))
                  setCurrentTimePlayer(formatTime(e.target.currentTime.toFixed(2)))
                  // updateProgress()
                }}></audio>

    <section className='container miniPlayer py-2'>
                <div className="row px-4">
                  <div className="col-1 d-flex gap-5">
                    <div className='d-flex gap-2 align-items-center'>
                      <span onClick={handlePlay} className='miniPlay'>{state.currentSong?._id === song._id && state.isPlaying ? <FaPause/> : <FaPlay/>}</span>
                    </div>
                  </div>
                  <div className="col-3 d-flex gap-5 justify-content-center">
                    <div className='d-flex align-items-center'>
                      <p className='mb-0'>{state.currentSong?._id === song._id ? state.currentTime : "00:00"} / {formatTime(song?.duration)}</p>
                    </div>
                    <div className='d-flex flex-column align-items-start'>
                      <p className='mb-0'>
                        {song?.title}
                      </p>
                      <p className='mb-0 artistPlayer'>
                      {song?.artist}
                      </p>
                    </div>
                  </div>
                  <div className="col-6 d-flex align-items-center justify-content-center">
                    <div id={`miniWaveform${song._id}`} ref={containerWave} onClick={e=>{
                      handleClick(e)}}></div>
                  </div>
                  {/* <div className="col-2 d-flex gap-2 align-items-center">
                    <FaVolumeUp/>
                    <input type="range" defaultValue={0.1} max={1} min={0} step={0.1} onChange={e => {
                      handleChangeVolumen(e);
                    }}/>
                  </div> */}
                </div>
        </section>
    </>
  )
}

export default MiniPlayer