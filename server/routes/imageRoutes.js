import express from "express";
import axios from "axios";
import Search from "../models/search.js"; // ✅ model to store searches
import { ensureAuth } from "../middlewares/auth.js"; // ✅ auth middleware (you can just check req.isAuthenticated)

const router = express.Router();

// 🔒 Only authenticated users can access
const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  return res.status(401).json({ message: "Unauthorized" });
};

// 🧠 Top searches across all users
router.get("/top-searches", async (req, res) => {
  try {
    const topTerms = await Search.aggregate([
      { $group: { _id: "$term", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);

    res.json(topTerms.map((t) => t._id));
  } catch (err) {
    console.error("Error fetching top searches:", err);
    res.status(500).json({ message: "Failed to fetch top searches" });
  }
});

//  Search Unsplash API + store history
router.post("/search", ensureAuthenticated, async (req, res) => {
  const { term } = req.body;
  if (!term) return res.status(400).json({ message: "Search term required" });

  try {
    // Save search term in DB
    await Search.create({ userId: req.user._id, term, timestamp: new Date() });

    // Fetch images from Unsplash
    const response = await axios.get("https://api.unsplash.com/search/photos", {
      params: { query: term, per_page: 20 },
      headers: { Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}` },
    });

    res.json(response.data.results);
  } catch (err) {
    console.error("Search API error:", err);
    res.status(500).json({ message: "Search failed" });
  }
});

router.get("/history", ensureAuth, async (req, res) => {
  try {
    const uniqueTerms = await Search.aggregate([
      { $match: { userId: req.user._id } },
      { $sort: { timestamp: -1 } },
      {
        $group: {
          _id: "$term",
          latestTimestamp: { $first: "$timestamp" },
        },
      },
      { $sort: { latestTimestamp: -1 } },
      { $limit: 5 },
      {
        $project: {
          _id: 0,
          term: "$_id",
          timestamp: "$latestTimestamp",
        },
      },
    ]);

    // Return in array of objects [{ term, timestamp }]
    res.status(200).json(uniqueTerms);
  } catch (err) {
    console.error("Error fetching history:", err);
    res.status(500).json({ message: "Failed to fetch history" });
  }
});


export default router;
