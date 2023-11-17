import { GET_CATEGORIES, GET_SONGS, SET_WAVEFORM, SET_CURRENT_TIME  } from "./types";

export const GlobalReducer = (state, action) => {
    switch (action?.type) {
        case GET_SONGS: 
            return {
                ...state,
                songs:action?.payload
            }
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
        case 'SET_CURRENT_TIME':
            return {
                 ...state, currentTime: action.payload 
            };
        default:
            return state;
    }
}