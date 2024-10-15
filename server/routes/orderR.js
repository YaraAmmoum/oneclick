const express = require("express");
const router = express.Router();
const { createOrder, count, orderget } = require("../controllers/OrderC");
router.post("/orders", createOrder);
router.get("/ordercount", count);
router.get("/orderget", orderget);

module.exports = router;
