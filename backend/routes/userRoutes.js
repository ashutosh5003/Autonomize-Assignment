const express = require("express");
const {
  saveUser,
  findMutualFriends,
  searchUsers,
  deleteUser,
  updateUser,
  listUsers,
} = require("../controllers/userController");

const router = express.Router();

router.post("/save", saveUser);
router.get("/:username/mutual-friends", findMutualFriends);
router.get("/search", searchUsers);
router.delete("/delete/:username", deleteUser);
router.put("/update/:username", updateUser);
router.get("/list", listUsers);

module.exports = router;
