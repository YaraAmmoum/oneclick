const express = require("express");
const router = express.Router();
const productController = require("../controllers/productC");
const authenticateUser = require("../middleware/authMiddleware");

router.post("/products/:id/rate", productController.ProductRate); 
router.get('/products/:id', productController.ProductGetId); 
router.get('/products/:id/reviews',productController.ProductReviewGet);
router.post('/products/:id/review',productController.ProductReviewPost);
router.post('/products', authenticateUser, productController.ProductPost);
router.get("/products", authenticateUser, productController.ProductGet);
router.get("/product",  productController.ProductGetnoauth);
router.put('/products/:id', authenticateUser, productController.ProductPutImage); 
router.delete('/products/:id', authenticateUser, productController.ProductDelete); 
router.get('/products/category/:category', productController.ProductCategory); 
router.get('/count', productController.count)
module.exports = router;
