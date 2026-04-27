import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    status: { type: String, default: "TODO" },
    priority: { type: String, default: "MEDIUM" },
    dueDate: { type: String, default: null },
    tags: { type: [String], default: [] },
    project: { type: String, default: "" },
  },
  { timestamps: true }
);

export const Task = mongoose.model("Task", taskSchema);
