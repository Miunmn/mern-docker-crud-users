import express from 'express';
import userRoute from './backend/routes/userRoute.js';
const app = express();

app.use('', userRoute);

export default app;