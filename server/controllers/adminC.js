const Admin = require("../models/admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const count=async(req,res)=>
    {
    try {
      const adminCount = await Admin.countDocuments(); 
      res.json({ count: adminCount });
    } catch (error) {
      console.error('Error fetching admin count:', error);
      res.status(500).json({ message: 'Error fetching admin count', error });
    }}
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
    module.exports={
        count,LogIn
    }
  