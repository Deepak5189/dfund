import axios from "axios";
import { AppDispatch } from "../store";

const API = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        "Content-type": "application/json",
    },
});

API.interceptors.request.use((req) => {
    const profile = localStorage.getItem("profile");
    const accessToken = profile?JSON.parse(profile).accessToken:null;
    if(accessToken){
        req.headers.Authorization = `Bearer ${accessToken}`;
    }
    return req;
});

export const refreshTokenAction = (refreshToken: string) => async (dispatch: AppDispatch) =>{
    try{
        const rawProfile = localStorage.getItem("profile");
        const response = await API.post("/users/refresh-token", {refreshToken});
        const profile = rawProfile?JSON.parse(rawProfile): null;
        const payload = response.data;

        localStorage.setItem("profile", JSON.stringify({...profile, ...payload}));

        dispatch({
            type: "REFRESH_TOKEN_SUCCESS",
            payload: payload,
        });
    }catch(error: any){
        localStorage.removeItem("profile");
        dispatch({
            type: "REFRESH_TOKEN_FAIL",
            payload: error.response.data,
        })
    }
}