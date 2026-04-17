import User from "../models/User.js";
import jwt from "jsonwebtoken";

// generate token
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET || "NATHASHA",
    { expiresIn: "1d" }
  );
};

//login
export const loginUser = async (req, res) => {
  try {
    const email = req.body.email?.toLowerCase().trim();
    const password = req.body.password;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({
      id: user._id,
      email: user.email,
      role: user.role,
      token: generateToken(user),
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//register-admin can 
export const registerUser = async (req, res) => {
  try {
    const email = req.body.email?.toLowerCase().trim();
    const password = req.body.password;
    const role = req.body.role;

    console.log("REGISTER REQUEST:", req.body); 

    if (!email || !password || !role) {
      return res.status(400).json({ message: "Email, password, and role are required" });
    }

    const exists = await User.findOne({ email });

    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      email,
      password,
      role,
    });

    res.status(201).json({
      id: user._id,
      email: user.email,
      role: user.role,
      token: generateToken(user),
    });

  } catch (err) {
    console.error("REGISTER ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};


//all users 
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); 
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


//delete user (admin)
export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//upodate user (admin)
export const updateUser = async (req, res) => {
  try {
    const { email, role } = req.body;

    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    user.email = email || user.email;
    user.role = role || user.role;

    await user.save();

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


//get user by id (admin)
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};