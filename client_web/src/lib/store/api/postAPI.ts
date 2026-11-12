import { Response } from "@/components/create-campaign/CreateCampaignForm";
import { API, handleApiError } from "./utils"

export const fetchCampaign = async (campaign_ref: string) =>{
    try{
        const res:Response = await API.get(`/posts/${campaign_ref}`, {
            headers:{
                "Content-Type": "application/json"
            },
        });
        // console.log(res.data);
        return {error: null, data: res.data?.post};
    }catch(err){
        return handleApiError(err);
    }
}

export const fetchAllCampaigns = async ()=>{
    try{
        const res:Response = await API.get("/posts", {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return {error: null, data: res.data?.data};
    }catch(error){
        return handleApiError(error);
    }
}