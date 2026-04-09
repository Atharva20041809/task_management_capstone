import express from "express";
import cors from "cors";
import taskRoutes from "./src/routes/taskRoutes";
import { connectDB } from "./db/connection";

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api", taskRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});