import {API, handleApiError} from "./utils";
import {Response} from "../../../components/create-campaign/CreateCampaignForm"

export const getCurrentUser = async () => {
    try{
        const response = await API.get("/users/me", {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return {error: null, data: response.data};
    }catch(error){
        return handleApiError(error);
    }
};

export const signIn = async (formData: any) => {
    try{
        const response = await API.post("/users/signin", formData, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return {error: null, data: response.data};
    }catch(error){
        return handleApiError(error);
    }
};

export const signUp = async (formData: any) => {
    try{
        const response = await API.post("/users/signup", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return {error: null, data: response.data};
    }catch(error){
        return handleApiError(error);
    }
};

export const logout = async () => {
    try{
        const response = await API.post("/users/logout", {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return {error: null, data: response.data};
    }catch(error){
        return handleApiError(error);
    }
};

export const createPost = async (formData: any): Promise<Response> => {
    try{
        const response = await API.post("/posts/create-post", formData, {
            headers: {
                "Content-Type": "application/json",
            }
        });
        return {error: null, data: response.data};
    }catch(error: any){
        return handleApiError(error);
    }
};