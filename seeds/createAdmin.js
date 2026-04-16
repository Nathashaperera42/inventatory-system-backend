import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    const adminEmail = "admin@gmail.com";

    // delete old broken user (IMPORTANT)
    await User.deleteMany({ email: adminEmail });

    const admin = new User({
      email: adminEmail,
      password: "admin123",
      role: "admin",
    });

    await admin.save();

    console.log("✅ Admin created successfully");

    process.exit();
  } catch (err) {
    console.log("Admin error:", err.message);
    process.exit(1);
  }
};

createAdmin();