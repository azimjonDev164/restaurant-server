const express = require("express");
const {
  createUser,
  findByEmail,
  findById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const router = express.Router();

router.post("/", createUser);
router.get("/email", findByEmail);
router.get("/:id", findById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
