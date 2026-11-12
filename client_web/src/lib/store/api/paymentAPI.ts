import { API, handleApiError } from "./utils"

export interface CheckoutSessionPayload {
    amount: number;
    currency: string;
}

export const getCheckoutSession = async (payload: CheckoutSessionPayload)=>{
    try{
        const response = await API.post(
            "/payment/create-checkout-session", 
            payload,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        return {error: null, data: response.data};
    }catch(error){
        return handleApiError(error);
    }
}