const express = require("express");
const {
  createUser,
  loginUser,
  getAllUser,
  getAUser,
} = require("../controller/userController");

const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/all-users", getAllUser);
router.get("/:id", getAUser);

module.exports = router;
