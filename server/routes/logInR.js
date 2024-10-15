const express = require("express");
const router = express.Router();
const logInController = require("../controllers/LogInC");

router.post("/login", logInController.LogIn);
router.get('/logincount', logInController.count)
router.get('/login', logInController.userget)

module.exports = router;

