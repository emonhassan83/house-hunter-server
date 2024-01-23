const express = require("express");
const {
  getHousesByOwner,
  addHouse,
  deleteHouse,
  updateHouse,
  getAHouseByOwner,
} = require("../controller/ownerHouseController");
const { authMiddleware } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/add-house",authMiddleware, addHouse);
router.get("/houses", authMiddleware, getHousesByOwner);
router.get("/house/:id", authMiddleware, getAHouseByOwner);
router.delete("/delete-house/:houseId",authMiddleware, deleteHouse);
router.put("/edit-house/:houseId",authMiddleware, updateHouse);

module.exports = router;
