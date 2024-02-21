import React, {useState, useEffect, useRef, useContext} from 'react'
import {FaPlay, FaPause, FaBackward, FaForward,FaVolumeUp, FaTrashAlt, FaEdit } from "react-icons/fa"
import { GlobalContext } from '../../../context/GlobalContext'
import { SET_ISPLAYING } from '../../../context/types'
import { formatTime } from '../../../utils/formatTime'
import WaveSurfer from 'wavesurfer.js'
import "../../../css/miniPlayer.css"
import { axiosInstance } from '../../../config/axiosInstance'
import Swal from 'sweetalert2'
import ModalEditSongs from './ModalEditSong'
import { getSongs } from '../../../context/GlobalActions'




const MiniPlayerCrud = ({song, idx,setCurrenIndexSong, currentTimePlayer, setCurrentTimePlayer, setIsPlayingPlayer, porcentaje, setPorcentaje,setCurrentSong,currentSong}) => {

  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState("00:00")
  const [progress, setProgress] = useState(0)
  const [waveForm, setWaveForm] = useState(null)
  const {state,dispatch} = useContext(GlobalContext)
  const [showSongs, setShowSongs] = useState(false);


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
    setCurrentSong(song)
    setIsPlaying(!isPlaying)
  }

  useEffect(() => {
    if (isPlaying) {
      audioEl.current?.play();
    } else {
      audioEl.current.pause();
    }

    
  }, [isPlaying]);

  useEffect(()=>{
    if (currentSong._id !== song._id) {
      audioEl.current.pause();
      setIsPlaying(false)
    }
  },[currentSong._id])



  const handleClickWave = (e) => {
    const clickX = e.nativeEvent.offsetX;
    const waveWidth = e.target.clientWidth;
  }

  const updateProgress= ()=>{
    if (waveForm){
      const porcentaje = (waveForm.getCurrentTime()/waveForm.getDuration());
      setProgress(porcentaje)
    }
  }

  const deleteSong = async () => {
    try {
      Swal.fire({
        title: 'Esta seguro de eliminar el audio?',
        text: "No podrás revertir los cambios!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar!'
    }).then(async (result) => {
      const token = localStorage.getItem("token");
        if (result.isConfirmed) {
          const resp = await axiosInstance.delete(
            `/${song._id}`,{
              headers: {
                Authorization: `Bearer ${token}`,
              }
            }
          );
            Swal.fire(
                'Eliminado!',
                'El audio fue eliminado',
                'success'
            )
            dispatch(getSongs())
        }
    })
    } catch (error) {
      Swal.fire({
        title: '¡Error!',
        text: 'No se pudo eliminar la canción',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      })
    }
  }

  const handleShowSongs = () => setShowSongs(true);
  return (
    <>
        <audio src={song?.url} 
                ref={audioEl}  
                onLoadedData={useWave} 
                onTimeUpdate={(e)=>{
                    setCurrentTime(formatTime(e.target.currentTime.toFixed(2)))
                    updateProgress()}}></audio>

    <section className='container-fluid miniPlayer py-2'>
                <div className="row px-4 d-flex gap-5 gap-md-0 justify-content-around">
                  <div className="col-1 d-flex gap-5 ">
                    <div className='d-flex gap-2 align-items-center'>
                      <span onClick={handlePlay} className='miniPlay'>{currentSong?._id === song._id && isPlaying ? <FaPause/> : <FaPlay/>}</span>
                    </div>
                  </div>
                  <div className="col-2 d-flex justify-content-center">
                  <div className='d-md-flex align-items-center d-none just'>
                      <p className='mb-0'>{currentSong?._id === song._id ? currentTime : "00:00"} / {formatTime(song?.duration)}</p>
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
                    <button className='btn btn-outline-light d-flex justify-content-center align-items-center' onClick={handleShowSongs}><FaEdit /></button>
                    <button className='btn btn-danger d-flex justify-content-center align-items-center' onClick={deleteSong}><FaTrashAlt /></button>
                    <ModalEditSongs showSongs={showSongs} setShowSongs={setShowSongs} song={song}/>
                </div>

                </div>
        </section>
    </>
  )
}

export default MiniPlayerCrud