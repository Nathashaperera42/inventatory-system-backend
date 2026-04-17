import express from "express";
import { loginUser, registerUser,getUsers,deleteUser,updateUser,getUserById } from "../controllers/authController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", protect,admin, registerUser);
router.get("/users", protect,admin, getUsers);
router.delete("/users/:id", protect, admin, deleteUser);
router.put("/users/:id", protect, admin, updateUser);
router.get("/users/:id", protect, admin, getUserById);

export default router;