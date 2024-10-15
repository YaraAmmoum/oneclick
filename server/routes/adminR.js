const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminC");
router.post("/adminlogin", adminController.LogIn);
router.get('/admincount', adminController.count)

module.exports = router;

