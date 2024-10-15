const express = require("express");
const router = express.Router();
const registerController = require("../controllers/registerC")

router.post("/register" , registerController.Register);

module.exports = router;
