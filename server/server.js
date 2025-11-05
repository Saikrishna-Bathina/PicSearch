import express from "express";
import session from "express-session";
import dotenv from "dotenv";
import connectDB from "./configs/db.js";
import MongoStore from "connect-mongo";
import passport from "passport";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process"; // For building the client

import "./configs/passport.js";
import authRoutes from "./routes/authRoutes.js";
import imageRoutes from "./routes/imageRoutes.js";

// Load environment variables based on NODE_ENV
dotenv.config({
  path: process.env.NODE_ENV === "production" ? ".env.production" : ".env.development",
});

const app = express();
connectDB();

// Build the client in production
if (process.env.NODE_ENV === "production") {
  console.log("Building client...");
  try {
    execSync("cd ../client && npm run build", { stdio: "inherit" });
    console.log("Client built successfully.");
  } catch (error) {
    console.error("Failed to build client:", error);
    process.exit(1);
  }
}

// Allowed CORS origins
const isProduction = process.env.NODE_ENV === "production";
const BACKEND_URL = isProduction
  ? "https://picsearch-3knr.onrender.com"
  : "http://localhost:5000";

const allowedOrigins = [
  "http://localhost:5173", // Development client
  "https://picsearch-app.onrender.com", // Production client (if separate)
  BACKEND_URL, // Allow the backend itself for any internal requests
];

app.use(cors({ origin: allowedOrigins, credentials: true }));
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

// API routes
app.use("/auth", authRoutes);
app.use("/api/images", imageRoutes);

// Serve React static files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientBuildPath = path.join(__dirname, "../client/dist");
app.use(express.static(clientBuildPath));

// Express 5-safe catch-all route for React Router
app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api") && !req.path.startsWith("/auth")) {
    res.sendFile(path.join(clientBuildPath, "index.html"));
  } else {
    next();
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
