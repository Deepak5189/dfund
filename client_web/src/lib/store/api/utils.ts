import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const authInterceptor = (req: any) => {
    return req;
};

export const API = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
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