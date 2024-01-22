const express = require("express");
const {
  createUser,
  loginUser,
  getAllUser,
  getAUser,
  deleteAUser,
} = require("../controller/userController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/all-users", authMiddleware, getAllUser);
router.get("/:id", getAUser);
router.delete("/:id", deleteAUser);

module.exports = router;
