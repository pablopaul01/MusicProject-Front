import { GET_USERS, GET_CATEGORIES, GET_SONGS, SET_WAVEFORM, SET_CURRENT_TIME, SET_CURRENT_SONG, SET_ISPLAYING, SET_PORCENTAJE, SET_CURRENT_INDEX_SONG, SET_CHANGE_PROGRESS, GET_SONGS_BY_USER, SET_IS_LOGGED  } from "./types";

export const GlobalReducer = (state, action) => {
    switch (action?.type) {
        case GET_SONGS: 
            return {
                ...state,
                songs:action?.payload
            }
        case GET_SONGS_BY_USER:
            return {
                ...state,
                songsByUser:action?.payload
            }
        case GET_USERS:
            return {
                ...state,
                users: action?.payload
            };            
        case GET_CATEGORIES:
            return {
                ...state,
                categories: action?.payload
            }
        case SET_WAVEFORM:
            return {
                ...state,
                waveForm: action.payload
            }
        case SET_CURRENT_TIME:
            return {
                 ...state, currentTime: action.payload 
            };
        case SET_CURRENT_SONG:
            return {
                 ...state, currentSong: action.payload 
            };
        case SET_ISPLAYING:
            return {
                 ...state, isPlaying: action.payload 
            };
        case SET_PORCENTAJE:
            return {
                 ...state, porcentaje: action.payload 
            };
        case SET_CURRENT_INDEX_SONG:
            return {
                 ...state, currentIndexSong: action.payload 
            };
        case SET_CHANGE_PROGRESS:
            return {
                 ...state, changeProgress: action.payload 
            };
        case SET_IS_LOGGED:
            return {
                 ...state, isLogged: action.payload 
            };
        default:
            return state;
    }
}