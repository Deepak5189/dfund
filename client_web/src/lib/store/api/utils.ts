import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const authInterceptor = (req: any) => {
    const profile = localStorage.getItem("profile");
    const accessToken = profile?JSON.parse(profile).accessToken:null;

    if(accessToken){
        req.headers.Authorization = `Bearer ${accessToken}`;
    }
    return req;
};

export const API = axios.create({
    baseURL: BASE_URL,
});

API.interceptors.request.use(authInterceptor);

export const handleApiError = (error: any) => {
    try{
        const errorMessage = error.response?.data?.message || "An unexpected Error occurred. Please try again later.";
        const data = null;
        return {error: errorMessage, data};
    }catch(error){
        throw new Error(`Failed to handle API error: ${error}`);
    }
};