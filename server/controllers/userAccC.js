const User = require("../models/userAcc");

const UserAccPost = async (req, res) => {
  const { email, firstName, lastName, phone, country, city } = req.body;
  const userId = req.userId; 

  try {
    let user = await User.findOne({ userId });

    if (user) {
      user.email = email;
      user.firstName = firstName;
      user.lastName = lastName;
      user.phone = phone;
      user.country = country;
      user.city = city;
      await user.save();
      res.status(200).json({ message: "User data updated successfully" });
    } else {
      user = new User({ userId, email, firstName, lastName, phone, country, city });
      await user.save();
      res.status(201).json({ message: "User data saved successfully" });
    }
  } catch (error) {
    console.error();
    res.status(400).json("Error saving user data");
  }
};

const UserAccGet = async (req, res) => {
  const userId = req.userId; 

  try {
    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error", message: err.message });
  }
};

module.exports = { UserAccPost, UserAccGet };
