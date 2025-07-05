import express from "express";
import { authenticateAccessToken } from "../middleware/authMiddleware";
import { fetchdasboardData, fetchDashboardData } from "../controllers/dashboard.controller";
const dashboardRouter= express.Router

dashboardRouter.post("/dashboard", authenticateAccessToken,fetchDashboardData)

export default dashboardRouter;