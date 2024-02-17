import React, {useState, useEffect, useRef, useContext} from 'react'
import { formatTime } from '../utils/formatTime'
import "../css/player.css"
import {FaPlay, FaPause, FaBackward, FaForward,FaVolumeUp} from "react-icons/fa"
import WaveSurfer from 'wavesurfer.js'
import { GlobalContext } from '../context/GlobalContext'



const Player = ({currentIndexSong, currentTimePlayer,isPlayingPlayer, setIsPlayingPlayer, porcentaje}) => {

  const [isPlaying, setIsPlaying] = useState(false)
  
  const [currentTime, setCurretTime] = useState("00:00")
  const [volumen, setVolumen] = useState(1)
  const [waveForm, setWaveForm] = useState(null)
  const {state,dispatch} = useContext(GlobalContext)


  const waveformContainer = useRef(null);

  useEffect(() => {
    if (state.isPlaying) {
      audioEl.current?.play();
    } else {
      audioEl.current.pause();
    }

    
  }, );

useEffect(() => {
  if (waveForm) {
    waveForm.seekTo(porcentaje)
  }
}, [porcentaje])

useEffect(() => {
  if (Object.keys(state.currentSong).length === 0 && state.songsByUser?.length > 0){
    dispatch({type: 'SET_CURRENT_SONG', payload: state.songsByUser[0]})
  } 
})

const skipSong = ( forwards = true) => {
  dispatch({type:'SET_ISPLAYING', payload: false})
  if (forwards) {
    if (state.currentIndexSong + 1 < state.songsByUser.length) {
      dispatch({type:'SET_CURRENT_INDEX_SONG',payload: state.currentIndexSong+1})
      dispatch({type: 'SET_CURRENT_SONG', payload: state.songsByUser[state.currentIndexSong+1]})
      dispatch({type: 'SET_ISPLAYING', payload: true})
    }
  }
  else {
    if (state.currentIndexSong -1 >= 0) {

      dispatch({type:'SET_CURRENT_INDEX_SONG',payload: state.currentIndexSong-1})
      dispatch({type: 'SET_CURRENT_SONG', payload: state.songsByUser[state.currentIndexSong-1]})
      dispatch({type: 'SET_ISPLAYING', payload: true})
    }
  }
}


  const audioEl = useRef("null")
  const waveformRef = useRef()

  const createwaveform = () => {
    const wavesurfer = WaveSurfer.create({
      container: "#waveform",
      height: 30,
      waveColor: '#C0C0C0',
      progressColor: '#7F9054',
      fillParent: true,
      media: audioEl.current,
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
  
  const handleClickWave = (e) => {
    const clickX = e.nativeEvent.offsetX;
    const waveWidth = e.target.clientWidth;
    dispatch({ type:'SET_PORCENTAJE', payload: (clickX / waveWidth)});
  }


  const updateProgress= ()=>{

    if (waveForm){
      const porcentaje = (waveForm.getCurrentTime()/waveForm.getDuration());
    dispatch({type:'SET_PORCENTAJE',payload:porcentaje})
    }
  
  }

  useEffect(() => {
    if (waveForm && state.changeProgress) {
      waveForm.seekTo(state.porcentaje)
      dispatch({ type:'SET_CHANGE_PROGRESS', payload: false});
    }
  
  
  }, [state.porcentaje])
  
  return (
    <>
        <audio src={state.currentSong?.url} 
                ref={audioEl}  
                onLoadedData={useWave} 
                onTimeUpdate={(e)=>{
                  dispatch({type:'SET_CURRENT_TIME',  payload: formatTime(e.target.currentTime.toFixed(2))})
                  updateProgress()
                }}></audio>

    <section className='container-fluid mainPlayer py-4'>
                <div className="row px-0 px-md-4 d-flex justify-content-around">
                  <div className="col-4 col-md-1 d-flex gap-5">
                    <div className='d-flex gap-2 align-items-center'>
                      <span onClick={()=>skipSong(false)} className='mainControls'><FaBackward/></span>
                      <span onClick={()=> dispatch({type: 'SET_ISPLAYING', payload: !state.isPlaying})} className='mainPlay'>{state.isPlaying ? <FaPause/> : <FaPlay/>}</span>
                      <span onClick={skipSong} className='mainControls'><FaForward/></span>
                    </div>
                  </div>
                  <div className="col-3 d-md-flex gap-5 justify-content-center d-none">
                    <div className='d-flex align-items-center'>
                      <p className='mb-0'>{state.currentTime} / {formatTime(state.currentSong?.duration)}</p>
                    </div>
                    <div className='d-flex flex-column align-items-start'>
                      <p className='mb-0'>
                        {state.currentSong?.title}
                      </p>
                      <p className='mb-0 artistPlayer'>
                      {state.currentSong?.artist}
                      </p>
                    </div>
                  </div>
                  <div className="col-8 col-md-6 d-flex align-items-center">
                    <div className="w-100" id='waveform' onClick={e=>{
                      handleClickWave(e)}}></div>
                  </div>
                  <div className="col-2 d-md-flex gap-2 align-items-center d-none justify-content-center">
                    <FaVolumeUp/>
                    <input type="range" defaultValue={volumen} max={1} min={0} step={0.1} onChange={e => {
                      handleChangeVolumen(e);
                    }}/>
                  </div>
                </div>
        </section>
    </>
  )
}

export default Player