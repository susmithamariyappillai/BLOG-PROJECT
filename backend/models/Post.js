import mongoose from "mongoose";

// One document in the "posts" collection = one blog post
const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    excerpt: { type: String, required: true, trim: true }, // short summary
    content: { type: String, required: true },
    imageUrl: { type: String, default: "" },
    category: { type: String, default: "General", trim: true },
    author: { type: String, default: "Admin" },
  },
  { timestamps: true } // adds createdAt and updatedAt automatically
);

export default mongoose.model("Post", postSchema);
