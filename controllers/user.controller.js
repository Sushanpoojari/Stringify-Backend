
import { getUserDetails } from "../models/user.model.js";
import { getFailedMessagePayload, getSuccessMessagePayload } from "../utils/globalFunctions/payLoadFunctions.js"

export async function fetchUserDetails(req,res) {
     const { user_id } = req.body
    
        try {
            if (!user_id) return res.status(400).json(getFailedMessagePayload(false, "API Request Failed", "Required User Id"))
            const userData= await getUserDetails({ user_id});
            return res.status(201).json(getSuccessMessagePayload(true,"Successfully fetched User data",userData))
    
        } catch (error) {
            console.error("fetchUserDetails error:", error);
            res.status(500).json(getFailedMessagePayload(false, "Failed to create the user", error?.detail));
        }
}