const userMod = require("../models/user");
const argon = require("argon2");
const jwt = require("jsonwebtoken");
const env = require("dotenv");

env.config();

const registerUser= async (req, res) => {
  try {
    const { firstName, lastName, phone, password, email } = req.body
    if (
      !firstName ||
      !lastName ||
      !phone ||
      !password ||
      !email
    ) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    // Check if user already exists
    const existingUser = await userMod.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists with this email" });
    }
    //hashing the password
    const hashedPassword = await argon.hash(password);

    // const userReg = await userMod.create(req.body);
    const userReg = await userMod.create({
      firstName,
      lastName,
      phone,
      password: hashedPassword,
      email
    });

    //generate a token
    const secret = process.env.JWT_secret;

    const token = jwt.sign({ id: userReg._id }, secret, { expiresIn: "1h" });
    res
      .status(201)
      .json({ message: "User created successfully", User: userReg, token });
  } catch (error) {
    res.status(400).json({ message: "Error creating user" });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await userMod.find({}, { password: 0 }); // Exclude password field
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
};

module.exports = {
    registerUser,
    getUsers,
};
