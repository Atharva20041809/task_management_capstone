import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: { type: String, default: "pending" }
});

export const Task = mongoose.model("Task", taskSchema);