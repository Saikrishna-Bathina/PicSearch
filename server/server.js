import express from "express";
import session from "express-session";
import dotenv from "dotenv";
import connectDB from "./configs/db.js";
import MongoStore from "connect-mongo"; 
import passport from "passport";
import cors from "cors";

import "./configs/passport.js"; 
import authRoutes from "./routes/authRoutes.js";
import imageRoutes from "./routes/imageRoutes.js";

dotenv.config({
  path: process.env.NODE_ENV === "production" ? ".env.production" : ".env.development",
});
const app = express();
connectDB();

// Middlewares
const allowedOrigins = [
  "http://localhost:5173",
  "https://picsearch-app.onrender.com",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());

// Session setup
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false, 
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  })
);

// Passport setup
app.use(passport.initialize());
app.use(passport.session());




// Routes
app.use("/auth", authRoutes);
app.use("/api/images", imageRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
