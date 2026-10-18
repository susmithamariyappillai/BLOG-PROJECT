import dns from "dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]); // fixes SRV lookup errors on some networks
import mongoose from "mongoose";

// Connects to MongoDB Atlas using the MONGO_URI from .env
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

export default connectDB;
