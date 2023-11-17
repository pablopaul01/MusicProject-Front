import { createContext } from 'react'


export const initialState = {
    songs: [],
    categories: [],
    id: null,
    isPLaying: false,
    urlSong: "",
    currentIndexSong: 0,
    waveForm: null,
    currentTime: 0,

}

export const GlobalContext = createContext({
    state: initialState,
    dispatch: (action) => {}
})