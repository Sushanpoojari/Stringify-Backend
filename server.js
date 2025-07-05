
import dotenv from 'dotenv';
dotenv.config();
import express from 'express'
import authRouter from './routes/auth.routes.js';
import dashboardRouter from './routes/dashboard.routes.js';

const app = express();

// FOR PARSING REQUEST INTO JSON FORMAT
app.use(express.json());

// Routes

// Login and Signup API
app.use("/api/auth",authRouter)

// Dashboard API
app.use("/api",dashboardRouter)

// Starting the server
app.listen(process.env.PORT, () => {
  console.log(`Strignify-Backend is listening at:: ${process.env.PORT}`);
});
