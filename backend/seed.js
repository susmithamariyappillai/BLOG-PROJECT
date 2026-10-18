import "dotenv/config";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import Post from "./models/Post.js";

// Adds 3 sample posts (with online images) if the database is empty.
// Run once with:  npm run seed
const samples = [
  {
    title: "Getting started with React",
    category: "Tech",
    excerpt: "A short intro to components.",
    content: "React lets you build user interfaces from small, reusable pieces called components.\n\nIn this post I explain props, state and how a page updates when data changes.",
    imageUrl: "https://picsum.photos/seed/react-post/600/300",
  },
  {
    title: "A weekend in Pondicherry",
    category: "Travel",
    excerpt: "Beaches, cafes and old streets.",
    content: "Pondicherry is a perfect place for a short break.\n\nWalk through the French Quarter, enjoy the sea breeze on the promenade and try the local cafes.",
    imageUrl: "https://picsum.photos/seed/pondicherry/600/300",
  },
  {
    title: "My portfolio journey",
    category: "Projects",
    excerpt: "What I learned building this.",
    content: "I built this blog with React, Express, MongoDB and Firebase.\n\nThe hardest part was login and admin access. The best part was seeing my first post go live.",
    imageUrl: "https://picsum.photos/seed/portfolio/600/300",
  },
];

await connectDB();
if ((await Post.countDocuments()) === 0) {
  await Post.insertMany(samples);
  console.log("3 sample posts added");
} else {
  console.log("Posts already exist, nothing added");
}
await mongoose.disconnect();
