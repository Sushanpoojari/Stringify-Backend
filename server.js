
import dotenv from 'dotenv';
dotenv.config();
import express from 'express'
import authRouter from './routes/auth.routes.js';

const app = express();

// FOR PARSING REQUEST INTO JSON FORMAT
app.use(express.json());

// Routes
app.use("/api/auth",authRouter)

// Starting the server
app.listen(process.env.PORT, () => {
  console.log(`Strignify-Backend is listening at:: ${process.env.PORT}`);
});
