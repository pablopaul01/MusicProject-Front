import React, {useState, useEffect, useCallback,useRef} from 'react'
import WaveSurfer from 'wavesurfer.js'
import Timeline from 'https://unpkg.com/wavesurfer.js@7/dist/plugins/timeline.esm.js'





  // Swap the audio URL
//   const onUrlChange = useCallback(() => {
//     urls.reverse()
//     setAudioUrl(urls[0])
//   }, [])

const WaveSurferPlayer = (props) => {
  // WaveSurfer hook
  const useWavesurfer = (containerRef, options) => {
    const [wavesurfer, setWavesurfer] = useState(null)
  
    // Initialize wavesurfer when the container mounts
    // or any of the props change
    useEffect(() => {
      if (!containerRef.current) return
  
      const ws = WaveSurfer.create({
        ...options,
        container: containerRef.current,
      })
  
      setWavesurfer(ws)
  
      return () => {
        ws.destroy()
      }
    }, [options, containerRef])
  
    return wavesurfer
  }


    const containerRef = useRef()
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const wavesurfer = useWavesurfer(containerRef, props)
console.log(props)
    
  
    // On play button click
    // const onPlayClick = useCallback(() => {
    //   wavesurfer.isPlaying() ? wavesurfer.pause() : wavesurfer.play()
    // }, [wavesurfer])
    

    useEffect(() => {
      isPlaying ? wavesurfer?.play() : wavesurfer?.pause()

    }, [isPlaying])
    
  
    // Initialize wavesurfer when the container mounts
    // or any of the props change
    useEffect(() => {
      if (!wavesurfer) return
  
      setCurrentTime(0)
      setIsPlaying(false)
  
      const subscriptions = [
        wavesurfer.on('play', () => setIsPlaying(true)),
        wavesurfer.on('pause', () => setIsPlaying(false)),
        wavesurfer.on('timeupdate', (currentTime) => setCurrentTime(currentTime)),
      ]
  
      return () => {
        subscriptions.forEach((unsub) => unsub())
      }
    }, [wavesurfer])
  
    return (
      <>
        <div ref={containerRef} style={{ minHeight: '120px' }} />
  
        <button onClick={()=>setIsPlaying(!isPlaying)} style={{ marginTop: '1em' }}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>
  
        <p>Seconds played: {currentTime}</p>
      </>
    )
  }

export default WaveSurferPlayer