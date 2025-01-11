const User = require("../models/user");
const { fetchGitHubUser } = require("../services/githubServices");

/**
 * Save user details from GitHub API
 */
const saveUser = async (req, res, next) => {
  try {
    const { username } = req.body;
    let user = await User.findOne({ username, deleted: false });

    if (user) return res.status(200).json(user);

    const gitHubData = await fetchGitHubUser(username);

    user = new User({
      username: gitHubData.login,
      avatar_url: gitHubData.avatar_url,
      name: gitHubData.name,
      company: gitHubData.company,
      blog: gitHubData.blog,
      location: gitHubData.location,
      email: gitHubData.email,
      bio: gitHubData.bio,
      public_repos: gitHubData.public_repos,
      public_gists: gitHubData.public_gists,
      followers: gitHubData.followers,
      following: gitHubData.following,
      created_at: gitHubData.created_at,
      updated_at: gitHubData.updated_at,
    });

    await user.save();
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

/**
 * Find mutual friends for a given user
 */
const findMutualFriends = async (req, res, next) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username, deleted: false });
    if (!user) return res.status(404).json({ message: "User not found" });

    const friends = await User.find({
      username: { $in: user.following },
      followers: username,
      deleted: false,
    });

    user.friends = friends.map((friend) => friend.username);
    await user.save();

    res.status(200).json(user.friends);
  } catch (err) {
    next(err);
  }
};

/**
 * Search users based on query parameters
 */
const searchUsers = async (req, res, next) => {
  try {
    const { username, location, company } = req.query;
    const query = { deleted: false };

    if (username) query.username = new RegExp(username, "i");
    if (location) query.location = new RegExp(location, "i");
    if (company) query.company = new RegExp(company, "i");

    const users = await User.find(query);
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

/**
 * Soft delete user by marking as deleted
 */
const deleteUser = async (req, res, next) => {
  try {
    const { username } = req.params;

    const user = await User.findOneAndUpdate(
      { username, deleted: false },
      { deleted: true },
      { new: true }
    );

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: `User ${username} deleted successfully` });
  } catch (err) {
    next(err);
  }
};

/**
 * Update user information
 */
const updateUser = async (req, res, next) => {
  try {
    const { username } = req.params;
    const updates = req.body;

    const user = await User.findOneAndUpdate(
      { username, deleted: false },
      updates,
      { new: true }
    );

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

/**
 * List users sorted by given field
 */
const listUsers = async (req, res, next) => {
  try {
    const { sortBy } = req.query;
    const sortFields = ["public_repos", "public_gists", "followers", "following", "created_at"];

    const users = await User.find({ deleted: false });

    if (sortBy && sortFields.includes(sortBy)) {
      users.sort((a, b) => (b[sortBy] || 0) - (a[sortBy] || 0));
    }

    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  saveUser,
  findMutualFriends,
  searchUsers,
  deleteUser,
  updateUser,
  listUsers,
};
