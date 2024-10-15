const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Register = async (req,res)=> {
    const { email,name, password } = req.body;
    if (!email || !name || !password) {
      return res.status(400).send("All fields are required");
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, name, password: hashedPassword });
  
    try {
      
      if(password.length>8)
      {
      await newUser.save();
      res.status(201).send("User registered successfully");}
      else{
        res.status(400).send("The password must be more than 8 digit")
      }
    } catch (err) {
      res.status(400).send("Error registering user");
    }
  };

  module.exports = {
      Register
  }
  
   