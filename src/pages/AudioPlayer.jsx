import React, { useState, useEffect, useContext, useRef } from 'react';
// import TimelinePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.min.js';
// import RegionsPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.regions.min.js';
// import { FileContext } from '../contexts/fileContext';
import wavesurfer from 'wavesurfer.js';
// import ToggleButton from './ToggleButton';

const AudioPlayer = () => {
	const wavesurferRef = useRef(null);
	// const timelineRef = useRef(null);

	// fetch file url from the context
	// const { fileURL, setFileURL } = useContext(FileContext);

	// crate an instance of the wavesurfer
	const [wavesurferObj, setWavesurferObj] = useState();

	const [playing, setPlaying] = useState(true); // to keep track whether audio is currently playing or not
	const [volume, setVolume] = useState(1); // to control volume level of the audio. 0-mute, 1-max
	const [zoom, setZoom] = useState(1); // to control the zoom level of the waveform
	const [duration, setDuration] = useState(0); // duration is used to set the default region of selection for trimming the audio

	// create the waveform inside the correct component
	useEffect(() => {
		if (wavesurferRef.current && !wavesurferObj) {
			setWavesurferObj(
				wavesurfer.create({
					container: '#waveform',
					autoCenter: true,
					cursorColor: 'violet',
					loopSelection: true,
					waveColor: '#211027',
					progressColor: '#69207F',
					responsive: true,
          fillParent:true,
          url: "https://res.cloudinary.com/dtkrptodh/video/upload/v1699239913/j2jymrxgakzrst4t4q52.mp3"
				})
			);
		}
	}, [wavesurferRef, wavesurferObj]);

	// once the file URL is ready, load the file to produce the waveform
	// useEffect(() => {
	// 	if (fileURL && wavesurferObj) {
	// 		wavesurferObj.load(fileURL);
	// 	}
	// }, [fileURL, wavesurferObj]);

	// useEffect(() => {
	// 	if (wavesurferObj) {
	// 		// once the waveform is ready, play the audio
	// 		wavesurferObj.on('ready', () => {
	// 			wavesurferObj.play();
	// 			// wavesurferObj.enableDragSelection({}); // to select the region to be trimmed
	// 			setDuration(Math.floor(wavesurferObj.getDuration())); // set the duration in local state
	// 		});

	// 		// once audio starts playing, set the state variable to true
	// 		wavesurferObj.on('play', () => {
	// 			setPlaying(true);
	// 		});

	// 		// once audio starts playing, set the state variable to false
	// 		wavesurferObj.on('finish', () => {
	// 			setPlaying(false);
	// 		});
	// 	}
	// }, [wavesurferObj]);

	// // set volume of the wavesurfer object, whenever volume variable in state is changed
	// useEffect(() => {
	// 	if (wavesurferObj) wavesurferObj.setVolume(volume);
	// }, [volume, wavesurferObj]);


	// // when the duration of the audio is available, set the length of the region depending on it, so as to not exceed the total lenght of the audio
	// useEffect(() => {
	// 	if (duration && wavesurferObj) {
	// 		// add a region with default length
	// 		wavesurferObj.addRegion({
	// 			start: Math.floor(duration / 2) - Math.floor(duration) / 5, // time in seconds
	// 			end: Math.floor(duration / 2), // time in seconds
	// 			color: 'hsla(265, 100%, 86%, 0.4)', // color of the selected region, light hue of purple
	// 		});
	// 	}
	// }, [duration, wavesurferObj]);

	const handlePlayPause = (e) => {
		wavesurferObj.playPause();
		setPlaying(!playing);
	};

	const handleReload = (e) => {
		// stop will return the audio to 0s, then play it again
		wavesurferObj.stop();
		wavesurferObj.play();
		setPlaying(true); // to toggle the play/pause button icon
	};

	// const handleVolumeSlider = (e) => {
	// 	setVolume(e.target.value);
	// };

	// const handleZoomSlider = (e) => {
	// 	setZoom(e.target.value);
	// };

	

	return (
		<section className='waveform-container'>
			<div ref={wavesurferRef} id='waveform' className='w-100'/>
			{/* <div ref={timelineRef} id='wave-timeline' /> */}
			<div className='all-controls'>
				<div className='left-container'>
					{/* <ToggleButton /> */}
					<button
						title='play/pause'
						className='controls'
						onClick={handlePlayPause}>
						{playing ? (
							<i className='material-icons'>pause</i>
						) : (
							<i className='material-icons'>play_arrow</i>
						)}
					</button>
					{/* <button
						title='reload'
						className='controls'
						onClick={handleReload}>
						<i className='material-icons'>replay</i>
					</button>
					<button className='trim' onClick={handleTrim}>
						<i
							style={{
								fontSize: '1.2em',
								color: 'white',
							}}
							className='material-icons'>
							content_cut
						</i>
						Trim
					</button>
				</div>
				<div className='right-container'>
					<div className='volume-slide-container'>
						<i className='material-icons zoom-icon'>
							remove_circle
						</i>
						<input
							type='range'
							min='1'
							max='1000'
							value={zoom}
							onChange={handleZoomSlider}
							class='slider zoom-slider'
						/>
						<i className='material-icons zoom-icon'>add_circle</i>
					</div>
					<div className='volume-slide-container'>
						{volume > 0 ? (
							<i className='material-icons'>volume_up</i>
						) : (
							<i className='material-icons'>volume_off</i>
						)}
						<input
							type='range'
							min='0'
							max='1'
							step='0.05'
							value={volume}
							onChange={handleVolumeSlider}
							className='slider volume-slider'
						/>
					</div> */}
				</div>
			</div>
		</section>
	);
};

export default AudioPlayer;
