const Cart=require("../models/Cart");
const Product=require("../models/Product")

const CartPost = async (req, res) => {
    const { userId, name, price, quantity = 1, image, category } = req.body;
    try {
      const product = await Product.findOne({ name, category });
      if (!product || product.quantity < quantity) {
        return res.status(400).json({ error: 'Insufficient product quantity available' });
      }
  
      const existingCartItem = await Cart.findOne({ name, category, userId });
      if (existingCartItem) {
        if (existingCartItem.quantity + quantity > product.quantity) {
          return res.status(400).json({ error: 'Cannot add more than available stock' });
        }
        existingCartItem.quantity += quantity;
        await existingCartItem.save();
      } else {
        const newCartProduct = new Cart({ userId, name, price, quantity, image, category });
        await newCartProduct.save();
      }
  
      product.quantity -= quantity;
      await product.save();
      res.status(201).json({ message: 'Product added to cart and inventory updated' });
    } catch (err) {
      res.status(400).send({ error: 'Error adding product to cart', message: err.message });
    }
  };
  

   
    const CartGet = async (req, res) => {
        const { userId } = req.query; 
        try {
            const cartItems = await Cart.find({ userId }); 
            res.json(cartItems);
        } catch (err) {
            res.status(500).send({ error: 'Error retrieving cart items', message: err.message });
        }
    };
    
    const CartPut=async(req,res)=>
    {
            const { id } = req.params;
            const { quantity } = req.body;
        
            try {
                const updatedProduct = await Cart.findByIdAndUpdate(id, { quantity }, { new: true });
                res.json(updatedProduct);
            } catch (err) {
                res.status(400).send({ error: 'Error updating cart item', message: err.message });
            }
        };
    const CartDelete=async(req,res)=>
    {

    const { id } = req.params; 
  
  
        try {
            const cartItem = await Cart.findById(id);
            if (!cartItem) {
                return res.status(404).json({ error: 'Cart item not found' });
            }
    
            const product = await Product.findOne({ name: cartItem.name, category: cartItem.category });
            if (product) {
                product.quantity += cartItem.quantity;
                await product.save();
            }
    
            
            await Cart.findByIdAndDelete(id);
    
            res.status(200).json({ message: 'Product removed from cart and inventory updated' });
        } catch (err) {
            res.status(400).json({ error: 'Error removing product from cart', message: err.message });
        }
    };
    



    module.exports = {
    CartPost,CartGet,CartPut,CartDelete
    
}
