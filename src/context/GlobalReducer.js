import { GET_CATEGORIES, GET_SONGS } from "./types";

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
        default:
            return state;
    }
}