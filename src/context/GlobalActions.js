import { axiosInstance } from "../config/axiosInstance";
import { GET_SONGS, GET_CATEGORIES, GET_USERS, GET_SONGS_BY_USER } from "./types";


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

export const getSongsByUser = async (id) => {
    const token = localStorage.getItem("token");
    try {
        const response = await axiosInstance.get(`/usuario/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return {
            type:GET_SONGS_BY_USER,
            payload: response.data.user.audioList
        }
    } catch (error) {
        console.log(error)
    }
}

export const getCategories = async () => {
    try {
        const response = await axiosInstance.get('/categories')
        return {
            type:GET_CATEGORIES,
            payload: response.data.categories
        }
    } catch (error) {
        console.log(error)
    }
}

export const getUsers = async () => {
    const token = localStorage.getItem("token");
    try {
        const response = await axiosInstance.get('/usuarios', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return {
            type:GET_USERS,
            payload: response.data.users
        }
    } catch (error) {
        console.log(error)
    }
}