import React, {useState, useEffect, useRef, useContext} from 'react'
import { formatTime } from '../utils/formatTime'
import "../css/miniPlayer.css"
import {FaPlay, FaPause, FaBackward, FaForward,FaVolumeUp} from "react-icons/fa"
import WaveSurfer from 'wavesurfer.js'
import { GlobalContext } from '../context/GlobalContext'
import { SET_ISPLAYING } from '../context/types'
import { MdOutlineFileDownload } from "react-icons/md";


const MiniPlayer = ({song, idx,setCurrenIndexSong, currentTimePlayer, setCurrentTimePlayer, setIsPlayingPlayer, porcentaje, setPorcentaje}) => {

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

const downloadAudio = () => {
  const aTag = document.createElement('a');
  aTag.href=song.url;
  aTag.setAttribute("download",song.title);
  aTag.setAttribute("target","blank");
  document.body.appendChild(aTag);
  aTag.click();
  aTag.remove()
}
  return (
    <>
        <audio src={song?.url} 
                ref={audioEl}  
                onLoadedData={useWave} 
                onTimeUpdate={(e)=>{
                }}></audio>

    <section className='container miniPlayer py-2'>
                <div className="row px-4 d-flex gap-0 gap-md-1 gap-md-0 justify-content-around">
                  <div className="col-1 d-flex">
                    <div className='d-flex gap-2 align-items-center'>
                      <span onClick={handlePlay} className='miniPlay'>{state.currentSong?._id === song._id && state.isPlaying ? <FaPause/> : <FaPlay/>}</span>
                    </div>
                  </div>
                  <div className="col d-md-flex justify-content-center d-none">
                    <div className='d-md-flex align-items-center  just'>
                        <p className='mb-0'>{state.currentSong?._id === song._id ? state.currentTime : "00:00"} / {formatTime(song?.duration)}</p>
                    </div>
                  </div>
                  <div className="col-6 col-md-2 d-flex gap-5 justify-content-center">
                    <div className='d-flex flex-column align-items-center'>
                      <p className='mb-0'>
                        {song?.title}
                      </p>
                      <p className='mb-0 artistPlayer'>
                      {song?.artist}
                      </p>
                    </div>
                  </div>
                  <div className="col-2 col-md-5 d-md-flex align-items-center justify-content-center d-none">
                    <div className='miniWave w-100' id={`miniWaveform${song._id}`} ref={containerWave} onClick={e=>{
                      handleClickWave(e)}}></div>
                  </div>
                  <div className='col-1 d-flex py-2 justify-content-center'><button className='btn download' onClick={downloadAudio}><MdOutlineFileDownload style={{fontSize: "1.5rem"}}/></button></div>
                </div>
        </section>
    </>
  )
}

export default MiniPlayer