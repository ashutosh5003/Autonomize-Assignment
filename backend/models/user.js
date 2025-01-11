const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  name: { type: String },
  bio: { type: String },
  avatar_url: { type: String },
  profile_url: { type: String },
  location: { type: String },
  public_repos: { type: Number },
  followers: { type: Number },
  following: { type: Number },
  company: { type: String },
  created_at: { type: String },
  updated_at: { type: String }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
