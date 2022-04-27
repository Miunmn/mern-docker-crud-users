import express from 'express';
import cors from 'cors';
import connectDB from './backend/config/db.js';
import userRoute from './backend/routes/userRoute.js';

connectDB();

const app = express();

app.use(cors());

app.use(express.json());

app.use('', userRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`App is running in ${process.env.NODE_ENV} mode on port ${PORT}`));