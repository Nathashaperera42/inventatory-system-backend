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

// ================= LOGIN =================
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

// ================= REGISTER (ADMIN ONLY) =================
export const registerUser = async (req, res) => {
  try {
    const email = req.body.email?.toLowerCase().trim();
    const password = req.body.password;
    const role = req.body.role;

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
    res.status(500).json({ error: err.message });
  }
};