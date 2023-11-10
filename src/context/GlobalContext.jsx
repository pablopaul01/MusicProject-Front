import { createContext } from 'react'


export const initialState = {
    songs: [],
    categories: []
}

export const GlobalContext = createContext({
    state: initialState,
    dispatch: (action) => {}
})