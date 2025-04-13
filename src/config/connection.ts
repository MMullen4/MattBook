import mongoose, { Connection } from "mongoose";

// use environment variables for connection string
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/postsTags";

// Create an async function to establish the connection
async function connectDB(): Promise<Connection> {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Successfully connected to MongoDB.");
    return mongoose.connection;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
}

// Create the connection
const dbConnection = connectDB();

// Handle connection events
mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

// Handle application termination
process.on("SIGINT", async () => {
  await mongoose.connection.close();
  process.exit(0);
});

export default dbConnection;
