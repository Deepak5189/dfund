import { Response } from "@/components/create-campaign/CreateCampaignForm";
import { CommentPayload } from "@/components/campaign-details/CampaignComments";
import { API, handleApiError } from "./utils"

export const postComment = async (payload: CommentPayload) => {
    try{
        const res: Response = await API.post("/comments", {payload}, {
            headers: {
                "Contnet-Type": "application/json",
            },
        });
        // if(!res.status(201)){
        //     return
        // }
        console.log(res.data);
        return {error: null, data: res.data?.comment};
    }catch(error){
        return handleApiError(error);
    }
}