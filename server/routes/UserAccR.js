const express = require("express");
const router = express.Router();
const userAccountController = require("../controllers/userAccC");
const authenticateUser = require("../middleware/authMiddleware");

router.post("/api/user", authenticateUser, userAccountController.UserAccPost);
router.get("/api/user", authenticateUser, userAccountController.UserAccGet);

module.exports = router;
