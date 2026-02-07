import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js'
import noteRoutes from './routes/note.routes.js';
import connectDB from './config/db.js';

const app = express();
const port = 5000;

dotenv.config()
connectDB();
app.use(express.json())
app.use(cookieParser());
app.use(cors({
    origin:[ "http://localhost:5173","http://localhost:5174"],
    credentials: true
}));


app.use('/api/notes', noteRoutes);
app.use("/api/auth", authRoutes);

app.listen(port, () => {
    console.log(`app is listening at ${process.env.PORT}`)
})


