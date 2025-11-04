import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  googleId: { type: String, sparse: true },
  githubId: { type: String, sparse: true },
  facebookId: { type: String, sparse: true },
  displayName: { type: String, required: true },
  email: { type: String, sparse: true },
  profilePhoto: { type: String },
  loginProvider: { 
    type: String, 
    enum: ["google", "github", "facebook"], 
    required: true 
  },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;
