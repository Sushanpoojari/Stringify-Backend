import express from "express";
import { fetchUserDetails } from "../controllers/user.controller.js";


const userRouter= express.Router();

userRouter.post("/profile",fetchUserDetails)
export default userRouter