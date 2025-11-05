import express from "express";
import passport from "passport";

const FRONTEND_URL =
  process.env.NODE_ENV === "production"
    ? "https://picsearch.onrender.com"
    : "http://localhost:5173";


const router = express.Router(); 

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Google callback 
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: `${FRONTEND_URL}/dashboard`, 
    failureRedirect: "/auth/failure",
  })
);

// GitHub login
router.get("/github", passport.authenticate("github", { scope: ["user:email", "read:user"] }));

// GitHub callback
router.get(
  "/github/callback",
  passport.authenticate("github", {
    successRedirect: `${FRONTEND_URL}/dashboard`,
    failureRedirect: "/auth/failure",
  })
);

// Facebook login
router.get("/facebook", passport.authenticate("facebook", { scope: ["email"] }));

// Facebook callback
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: `${FRONTEND_URL}/dashboard`,
    failureRedirect: "/auth/failure",
  })
);

// Get current user
router.get("/user", (req, res) => {
  if (req.user) {
    res.json({
      id: req.user._id,
      name: req.user.displayName,
      email: req.user.email,
      avatar: req.user.profilePhoto,
      provider: req.user.loginProvider,
    });
  } else {
    res.status(401).json({ message: "Not authenticated" });
  }
});

// Logout
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error("Logout error:", err);
      return res.status(500).json({ message: "Logout failed" });
    }
    res.redirect(`${FRONTEND_URL}`);
  });
});


router.get("/me", (req, res) => {
  if (req.isAuthenticated()) return res.json(req.user);
  res.status(401).json({ user: null });
});


// Failure
router.get("/failure", (req, res) => {
  res.send("Authentication failed. Try again!");
});

export default router;
