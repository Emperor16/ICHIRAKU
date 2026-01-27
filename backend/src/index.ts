import express from 'express';
import cors from 'cors';
import { ENV } from "./config/env.js";
import { clerkMiddleware } from '@clerk/express'
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import commentRoutes from './routes/commentRoutes.js';

const app = express();

app.use(cors({origin: ENV.FRONTEND_URL})); //enable CORS
app.use(clerkMiddleware()); //auth object will be attached to req
app.use(express.json()); //middleware to parse json body
app.use(express.urlencoded({ extended: true })); //middleware to parse urlencoded body(like HTML forms)

app.get("/", (_req, res) => {

  res.json({
    message: "Welcome to ICHIRAKU STORE- WHERE YOU GET ANIME DISHES",
    endpoints: {
      users: "/api/users",
      products: "/api/products",
      comments: "/api/comments",
    }
  }
  );
});

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/comments", commentRoutes);


app.listen(ENV.PORT, () => {
  console.log('Server is running on port:',ENV.PORT);
});