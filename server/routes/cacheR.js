const express = require('express');
const { updateCacheQuantity} = require('../controllers/cacheC');
const Product = require('../models/Product'); 
const { loadCache } = require('../controllers/cacheC');

const router = express.Router();

router.post('/add-to-cart', (req, res) => {
  const { productId, quantity } = req.body;
  try {
    updateCacheQuantity(productId, quantity);
    res.status(200).json({ message: 'Cache updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating cache' });
  }
});

router.post('/checkout', async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    const product = await Product.findById(productId);
    
    if (product.quantity >= quantity) {
      product.quantity -= quantity;
      await product.save();

      updateCacheQuantity(productId, quantity);
      
      res.status(200).json({ message: 'Product purchased successfully, cache and database updated' });
    } else {
      res.status(400).json({ message: 'Not enough stock in database' });
    }
  } catch (error) {
    revertCacheQuantity(productId, quantity);
    res.status(500).json({ message: 'Error during checkout, cache reverted' });
  }
});

router.get('/cache', (req, res) => {
  try {
    const cacheData = loadCache();
    res.status(200).json(cacheData); 
  } catch (error) {
    res.status(500).json({ message: 'Error loading cache' });
  }
});

module.exports = router;
