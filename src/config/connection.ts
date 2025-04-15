import mongoose, { Connection } from "mongoose";

// Create an async function to establish the connection
async function connectDB(): Promise<Connection> {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/postsTags");
    console.log("MongoDB connected successfully");
    return mongoose.connection;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
}

// Export the connection function
export default connectDB;
