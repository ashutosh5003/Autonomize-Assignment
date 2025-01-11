require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require("axios");
const User = require("./models/user");

const app = express();
app.use(express.json());


// CORS configuration
const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:3001'], // List allowed origins
  methods: ['GET', 'POST', 'DELETE'], // Allow specific methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
};

// Enable CORS with the defined options
app.use(cors(corsOptions));

  

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));
  
app.delete("/api/users/:username", async (req, res) => {
  const { username } = req.params;
  console.log(username);
  try {
    const deletedUser = await User.findOneAndDelete({ username });

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User data deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete", details: err.message });
  }
});


app.post("/api/users", async (req, res) => {
  const { username } = req.body;
  try {
    const existingUser = await User.findOne({ username });

    // If user exists, return without fetching from GitHub
    if (existingUser) {
      return res.status(200).json(existingUser);
    }

    // Fetch user data from GitHub if not found in DB
    const response = await axios.get(`https://api.github.com/api/users/${username}`);
    const userData = response.data;

    const user = new User({
      username: userData.login,
      name: userData.name,
      bio: userData.bio,
      avatar_url: userData.avatar_url,
      profile_url: userData.html_url,
      location: userData.location,
      public_repos: userData.public_repos,
      followers: userData.followers,
      following: userData.following,
      company: userData.company,
      created_at: userData.created_at,
      updated_at: userData.updated_at,
    });

    const savedUser = await user.save();
    res.status(201).json(savedUser);

  } catch (err) {
    res.status(400).json({ error: "Error fetching or saving user data", details: err.message });
  }
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
