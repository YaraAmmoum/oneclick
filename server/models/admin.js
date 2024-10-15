const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    email: String,
    password: String,
  });
  
  const Admin = mongoose.model("Admin", userSchema);
  module.exports = Admin;
