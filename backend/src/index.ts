import express from "express";
import cors from "cors";
import { ENV } from "./config/env.js";
import { clerkMiddleware, getAuth } from "@clerk/express";

import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";

const app = express();

// Enable CORS for your frontend
app.use(cors({ origin: ENV.FRONTEND_URL }));

// Attach Clerk auth state to every request
app.use(clerkMiddleware());

// Middleware to parse request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route
app.get("/", (_req, res) => {
  res.json({
    message: "Welcome to ICHIRAKU STORE - WHERE YOU GET ANIME DISHES",
    endpoints: {
      users: "/api/users",
      products: "/api/products",
      comments: "/api/comments",
    },
  });
});

// Example protected route using Clerk
app.get("/protected", (req, res) => {
  const { userId } = getAuth(req);
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  res.json({ userId });
});

// API routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/comments", commentRoutes);

// Start server
app.listen(ENV.PORT, () => {
  console.log("Server is running on port:", ENV.PORT);
});