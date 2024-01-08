import React, {useState, useEffect, useRef, useContext} from 'react'
import {FaPlay, FaPause, FaBackward, FaForward,FaVolumeUp, FaTrashAlt, FaEdit } from "react-icons/fa"
import { GlobalContext } from '../../../context/GlobalContext'
import { SET_ISPLAYING } from '../../../context/types'
import { formatTime } from '../../../utils/formatTime'
import WaveSurfer from 'wavesurfer.js'
import "../../../css/miniPlayer.css"



const MiniPlayerCrud = ({song, idx,setCurrenIndexSong, currentTimePlayer, setCurrentTimePlayer, setIsPlayingPlayer, porcentaje, setPorcentaje}) => {

  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState("00:00")
  const [progress, setProgress] = useState(0)
  const [waveForm, setWaveForm] = useState(null)
  const {state,dispatch} = useContext(GlobalContext)


  const audioEl = useRef("null")
  const progressBar = useRef()
  const waveformRef = useRef()

  const createwaveform = () => {
    const wavesurfer = WaveSurfer.create({
      container: `#miniWaveform${song._id}`,
      height: 20,
      waveColor: '#C0C0C0',
      progressColor: '#96989A',
      fillParent: true,
      media: audioEl.current,
       // <- this is the important part
    })
    setWaveForm(wavesurfer)
  }

  const useWave = () => {
    waveForm?.destroy()
    createwaveform()
  }
  
  const containerWave= useRef()

  const handlePlay = () => {

    if (state.currentSong._id !== song._id) {
      dispatch({type: 'SET_CURRENT_SONG', payload: song})
      dispatch({type:'SET_ISPLAYING', payload: false})
      dispatch({type: 'SET_ISPLAYING', payload: true})
      dispatch({type: 'SET_CURRENT_INDEX_SONG', payload: idx})
    }
    else
    {
      dispatch({type: 'SET_ISPLAYING', payload: !state.isPlaying})
    }
  }

  useEffect(() => {
    if (state.isPlaying && state.currentSong._id === song._id) {
      audioEl.current?.play();
    } else {
      audioEl.current.pause();
    }

    
  }, );

  useEffect(() => {
    if (waveForm && state.currentSong._id === song._id) {
      waveForm.seekTo(state.porcentaje)
    }
  
  
  }, [state.porcentaje])

  const handleClickWave = (e) => {
    const clickX = e.nativeEvent.offsetX;
    const waveWidth = e.target.clientWidth;
    if (state.currentSong._id === song._id) {

      dispatch({ type:'SET_PORCENTAJE', payload: (clickX / waveWidth)});
      dispatch({ type:'SET_CHANGE_PROGRESS', payload: true});
      
    }

  }
  const updateProgress= ()=>{

    if (waveForm){
      const porcentaje = (waveForm.getCurrentTime()/waveForm.getDuration());
    dispatch({type:'SET_PORCENTAJE',payload:porcentaje})
    }
  
  }
  return (
    <>
        <audio src={song?.url} 
                ref={audioEl}  
                onLoadedData={useWave} 
                onTimeUpdate={(e)=>{
                    dispatch({type:'SET_CURRENT_TIME',  payload: formatTime(e.target.currentTime.toFixed(2))})
                    updateProgress()}}></audio>

    <section className='container miniPlayer py-2'>
                <div className="row px-4 d-flex gap-5 gap-md-0 justify-content-around">
                  <div className="col-1 d-flex gap-5 ">
                    <div className='d-flex gap-2 align-items-center'>
                      <span onClick={handlePlay} className='miniPlay'>{state.currentSong?._id === song._id && state.isPlaying ? <FaPause/> : <FaPlay/>}</span>
                    </div>
                  </div>
                  <div className="col-2 d-flex justify-content-center">
                  <div className='d-md-flex align-items-center d-none just'>
                      <p className='mb-0'>{state.currentSong?._id === song._id ? state.currentTime : "00:00"} / {formatTime(song?.duration)}</p>
                    </div>
                  </div>
                  <div className="col-2 d-flex gap-5 justify-content-center">

                    <div className='d-flex flex-column align-items-center'>
                      <p className='mb-0'>
                        {song?.title}
                      </p>
                      <p className='mb-0 artistPlayer'>
                      {song?.artist}
                      </p>
                    </div>
                  </div>
                  <div className="col-5 d-md-flex align-items-center justify-content-center d-none">
                    <div className='miniWave w-100' id={`miniWaveform${song._id}`} ref={containerWave} onClick={e=>{
                      handleClickWave(e)}}></div>
                  </div>
                  <div className='col-2 d-flex py-2 justify-content-center gap-3'>
                    <button className='btn btn-warning d-flex justify-content-center align-items-center'><FaEdit /></button>
                    <button className='btn btn-danger d-flex justify-content-center align-items-center'><FaTrashAlt /></button>

                </div>

                </div>
        </section>
    </>
  )
}

export default MiniPlayerCrud