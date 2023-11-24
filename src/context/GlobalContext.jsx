import { createContext } from 'react'


export const initialState = {
    songs: [],
    categories: [],
    currentSong: {},
    isPlaying: false,
    currentIndexSong: 0,
    waveForm: null,
    currentTime: "00:00",

}

export const GlobalContext = createContext({
    state: initialState,
    dispatch: (action) => {}
})