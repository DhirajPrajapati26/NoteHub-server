import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import noteRoutes from "./routes/note.routes.js";
import connectDB from "./config/db.js";

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();
connectDB();
app.use(express.json());
app.use(cookieParser());
// app.use(
//   cors({
//     origin: ["http://localhost:5173", "http://localhost:5174"],
//     credentials: true,
//   }),
// );

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://notehub-phi.vercel.app",
      "https://notehub.dhirajprajapati.in",
    ],
    credentials: true,
  }),
);

// app.use(
//   cors({
//     origin: process.env.CLIENT_URL,
//     credentials: true,
//   }),
// );

app.get("/", (req, res) => {
  res.send("Backend is Live");
});

app.use("/api/notes", noteRoutes);
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
