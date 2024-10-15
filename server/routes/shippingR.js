const express=require("express");
const router=express.Router();
const shippingController=require("../controllers/shippingC");
router.post("/api/shipping",shippingController.ShippingPost);
router.get("/api/shipping/:phone",shippingController.ShippingGet);
router.post('/api/create-payment-intent',shippingController.PaymentPost);

module.exports=router;