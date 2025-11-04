import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GitHubStrategy } from "passport-github2";
import { Strategy as FacebookStrategy } from "passport-facebook";
import dotenv from "dotenv"; 
import User from "../models/user.js";

dotenv.config();

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log(" Google profile received:", profile);

        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          user = await User.create({
            googleId: profile.id,
            displayName: profile.displayName || "No Name",
            email: profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null,
            profilePhoto: profile.photos && profile.photos.length > 0 ? profile.photos[0].value : null,
            loginProvider: "google",
          });
          console.log("🆕 New user created:", user);
        } else {
          console.log("👤 Existing user found:", user.displayName);
        }

        return done(null, user);
      } catch (err) {
        console.error(" Google Strategy Error:", err);
        return done(err, null);
      }
    }
  )
);


passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/github/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log(" GitHub profile received:", profile._json);

        const { id, name, email, avatar_url, login } = profile._json;

        let user = await User.findOne({ githubId: id });

        if (!user) {
          user = await User.create({
            githubId: id,
            displayName: name || login || "No Name",
            email: email || null,
            profilePhoto: avatar_url || null,
            loginProvider: "github",
          });
          console.log("🆕 New GitHub user created:", user);
        } else {
          console.log("👤 Existing GitHub user:", user.displayName);
        }

        return done(null, user);
      } catch (err) {
        console.error(" GitHub Strategy Error:", err);
        return done(err, null);
      }
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/facebook/callback",
      profileFields: ["id", "displayName", "emails", "photos"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log(" Facebook profile received:", profile);

        let user = await User.findOne({ facebookId: profile.id });

        if (!user) {
          user = await User.create({
            facebookId: profile.id,
            displayName: profile.displayName || "No Name",
            email: profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null,
            profilePhoto: profile.photos && profile.photos.length > 0 ? profile.photos[0].value : null,
            loginProvider: "facebook",
          });
          console.log(" New Facebook user created:", user);
        } else {
          console.log(" Existing Facebook user found:", user.displayName);
        }

        return done(null, user);
      } catch (err) {
        console.error(" Facebook Strategy Error:", err);
        return done(err, null);
      }
    }
  )
);


export default passport;
