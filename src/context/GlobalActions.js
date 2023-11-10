import { axiosInstance } from "../config/axiosInstance";
import { GET_SONGS } from "./types";

export const getSongs = async () => {
    try {
        const response = await axiosInstance.get('/')
        return {
            type:GET_SONGS,
            payload: response.data.audios
        }
    } catch (error) {
        console.log(error)
    }
}