const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const LogIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.status(200).json({ message: "Login successful", token });
    } else {
      res.status(401).send("Invalid email or password");
    }
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).send("server error");
  }
};
const count=async(req,res)=>
  {
  try {
    const userCount = await User.countDocuments(); 
    res.json({ count: userCount });
  } catch (error) {
    console.error('Error fetching user count:', error);
    res.status(500).json({ message: 'Error fetching user count', error });
  }}

  const userget=async(req,res)=>
  {
    try{
    const users=await User.find();
    res.json(users);
    }
    catch{
      res.status(500).send({ error: "Server error", message: err.message });
    }
  }
module.exports = {
  LogIn,
  count,
  userget,
};
