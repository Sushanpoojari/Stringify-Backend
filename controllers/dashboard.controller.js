import { getDashboardData } from "../models/dashboard.model.js";
import { getFailedMessagePayload, getSuccessMessagePayload } from "../utils/globalFunctions/payLoadFunctions"

export async function fetchDashboardData(req, res) {
    const { user_id, pageNumber, noOfRecords } = req.body

    try {

        if (!user_id) return res.status(400).json(getFailedMessagePayload(false, "API Request Failed", "Required User Id"))

        const dasboardData= await getDashboardData({ user_id, pageNumber, noOfRecords });
        return res.status(201).json(getSuccessMessagePayload(true,"Fetched Dashboard Data",dasboardData))

    } catch (error) {
        console.error("getDashboardData error:", error);
        res.status(500).json(getFailedMessagePayload(false, "Failed to create the user", error?.detail));
    }

}