import express from "express";
import { fetchDashboardData } from "../controllers/dashboard.controller.js";

const dashboardRouter= express.Router();

dashboardRouter.post("/dashboard",fetchDashboardData)

export default dashboardRouter;