import dotenv from 'dotenv';
dotenv.config();
import { checkIfUserExists, createUser, loginUser } from '../models/user.model.js';
import { getFailedMessagePayload, getSuccessMessagePayload } from '../utils/globalFunctions/payLoadFunctions.js';
import jwt from 'jsonwebtoken';


export async function signup(req, res) {
    const { first_name = "", last_name = "", email = "", password = "", dob = "" } = req.body;
    try {
        // Checking if all fields are received
        if (first_name == "" || last_name == "" || email == "" || password == "" || dob == "") {
            return res.status(400).json(getFailedMessagePayload(false, "Failed to create the user", "Please enter all fields.!"));
        }

        // Checking if the user already exists
        const existingUser = await checkIfUserExists(email);
        if (existingUser) {
            return res.status(400).json(getFailedMessagePayload(false, "Failed to create the user", "Email Already exists"));
        }

        // Creating new users
        const newUser = await createUser({ first_name, last_name, email, password, dob });
        console.log('newUser', JSON.stringify(newUser, null, 2))
        if (newUser?.length > 0) {
            res.status(201).json(getSuccessMessagePayload(true, "User created successfully!"));
        } else {
            res.status(400).json(getFailedMessagePayload(false, "Failed to create the user", " Data was not saved"));

        }
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json(getFailedMessagePayload(false, "Failed to create the user", error?.detail));
    }
};

export async function signin(req, res) {
    const { email, password } = req.body;

    try {
        const user = await loginUser(email, password);
        console.log("object",process.env.REFRESH_SECRET)
        console.log(process.env.ACCESS_SECRET,"---")
        console.log('user', JSON.stringify(user, null, 2))
        if (user) {
            // Generating Access Token 
            const accessToken = jwt.sign(
                { id: user.user_id, email: user.email },
                process.env.ACCESS_SECRET,
                { expiresIn: '15m' }
            );

            // Generating Refresh Token later used to get Access Token
            const refreshToken = jwt.sign(
                { id: user.user_id, email: user.email },
                process.env.REFRESH_SECRET,
                { expiresIn: '7d' }
            );

            res.status(200).json({
                ...getSuccessMessagePayload(true, "User logged in successfully", user),
                accessToken,
                refreshToken
            });
        } else {
            res.status(400).json(getFailedMessagePayload(false, "Login Failed", "User does not exist!"));
        }
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json(getFailedMessagePayload(false, "Login Failed", error?.detail));
    }
};

