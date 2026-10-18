import "dotenv/config"; // must be first: loads .env
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import postRoutes from "./routes/posts.js";
import authRoutes from "./routes/auth.js";

const app = express();



app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://blog-project-9rk9-two.vercel.app"
  ],
  credentials: true
}));
app.use(express.json());

app.get("/", (req, res) => res.send("Blog API is running"));
app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
});
