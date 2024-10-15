const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = express();
const login = require("./routes/logInR");
const register = require("./routes/registerR");
const cart = require("./routes/cartR");
const userAcc = require("./routes/UserAccR");
const shipping = require("./routes/shippingR");
const order = require("./routes/orderR");
const product = require("./routes/productR");
const cache = require("./routes/cacheR");
// const admin=require("./routes/adminR")
dotenv.config({ path: ".env" });
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
app.use(login);
app.use(register);
app.use("/api", cart);
app.use(userAcc);
app.use(order);
app.use(shipping);
app.use(product);
app.use('/api/products', product);
app.use('/api', product);
app.use('/api', login);
app.use('/api/login', login);
app.use('/api/order', order);
app.use('/api', order);
// app.use('/api/admin',admin)
app.use('/api', cache);
const port = process.env.PORT;
const mongoUri = process.env.CONNECTION;

mongoose
  .connect(mongoUri, {})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.listen(port, () => {
  console.log(`The app is running on http://localhost:${port}`);
});
