const fs = require('fs');
const path = require('path');

const cacheFilePath = path.join(__dirname, '../data/cache.json');

const loadCache = () => {
  if (fs.existsSync(cacheFilePath)) {
    const cacheData = fs.readFileSync(cacheFilePath);
    return JSON.parse(cacheData);
  }
  return [];
};

const saveCache = (data) => {
  fs.writeFileSync(cacheFilePath, JSON.stringify(data, null, 2));
};

const syncCacheWithDB = (products) => {
  const cacheData = products.map(product => ({
    _id: product._id,
    name: product.name,
    quantity: product.quantity,
    price: product.price,
    category: product.category,
    reviews: product.reviews,
    image: product.image,
  }));
  saveCache(cacheData);
};

const updateCacheQuantity = (productId, quantity) => {
  setCart((prevCart) => 
      prevCart.map((item) => 
          item._id === productId 
          ? { ...item, quantity: item.quantity - quantity }
          : item
      )
  );
};

const revertCacheQuantity = (productId, quantity) => {
  const cache = loadCache();
  const productIndex = cache.findIndex(p => p._id === productId);
  if (productIndex !== -1) {
    cache[productIndex].quantity += quantity;  
    saveCache(cache);
  }
};
module.exports = {
  loadCache,
  saveCache,
  syncCacheWithDB,
  updateCacheQuantity,
  revertCacheQuantity,
};
