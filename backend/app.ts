import "dotenv/config";
import express from "express";
import cors from "cors";
import taskRoutes from "./src/routes/taskRoutes";
import authRoutes from "./src/routes/authRoutes";
import { connectDB } from "./db/connection";

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api", authRoutes);
app.use("/api", taskRoutes);

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});