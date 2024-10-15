const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartC"); 

router.post("/cart", cartController.CartPost);
router.get("/cart", cartController.CartGet);
router.put('/cart/:id', cartController.CartPut);
router.delete('/cart/:id', cartController.CartDelete);

module.exports = router;
