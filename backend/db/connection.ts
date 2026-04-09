import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://atharvatiwari345_db_user:NmyeomSbLM4oPOIk@cluster0.691lgbk.mongodb.net/?appName=Cluster0");
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("DB Connection Error", error);
  }
}; 