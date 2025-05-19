const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const candidate = await User.findOne({ where: { email } });
    if (candidate)
      return res.status(400).json({ message: "This email is already in use!" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    res.status(201).json({
      message: "User has been successfully created!",
      userId: user.id,
    });
  } catch (e) {
    res.status(500).json({ message: "Server error!" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user)
      return res.status(400).json({
        message: "User with this email does not exist!",
      });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Wrong credentials!" });

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (e) {
    res.status(500).json({ message: "Server error!" });
  }
};

module.exports = { register, login };
