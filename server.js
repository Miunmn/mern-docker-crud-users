import express from 'express';
import cors from 'cors';
import connectDB from './backend/config/db.js';
// import userRoute from './backend/routes/userRoute.js';
import app from './app.js';

connectDB();

app.use(cors());

app.use(express.json());

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`App is running in ${process.env.NODE_ENV} mode on port ${PORT}`));