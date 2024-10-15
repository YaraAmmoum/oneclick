const Orders = require("../models/Orders");

const createOrder = async (req, res) => {
  const { userId, username, products, shippingMethod, totalAmount } = req.body;

  try {
    const newOrder = new Orders({
      userId,
      username,
      products,
      shippingMethod,
      totalAmount,
    });

    await newOrder.save();
    res
      .status(201)
      .json({ message: "Order created successfully", order: newOrder });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to create order", message: error.message });
  }
};
const count = async (req, res) => {
  try {
    const userCount = await Orders.countDocuments();
    res.json({ count: userCount });
  } catch (error) {
    console.error("Error fetching order count:", error);
    res.status(500).json({ message: "Error fetching order count", error });
  }
};
const orderget = async (req, res) => {
  try {
    const ordersget = await Orders.find();
    res.json(ordersget);
  } catch {
    res.status(500).send({ error: "Server error", message: err.message });
  }
};
module.exports = {
  createOrder,
  count,
  orderget,
};
