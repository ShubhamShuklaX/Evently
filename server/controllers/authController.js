import "dotenv/config";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../config/prisma.js";

export const signup = async (req, res) => {
  try {
    let { name, email, password } = req.body;

    if (!name?.trim() || !email?.trim() || !password) {
      return res.status(400).json({
        error: "Name, email, and password are required",
      });
    }

    email = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ error: "Please provide a valid email address" });
    }

    // Strengthened password requirement: minimum 8 characters with letters and numbers
    if (
      password.length < 8 ||
      !/[A-Za-z]/.test(password) ||
      !/\d/.test(password)
    ) {
      return res.status(400).json({
        error:
          "Password must be at least 8 characters long and contain both letters and numbers",
      });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { name: name.trim(), email, password: hashPassword },
    });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res
      .status(201)
      .json({ token, user: { id: user.id, name: user.name, role: user.role } });
  } catch (error) {
    console.error(error);
    if (error.code === "P2002") {
      return res.status(409).json({ error: "Email already registered" });
    }

    res.status(500).json({ error: "Failed to signup" });
  }
};

export const login = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }
    email = email.trim().toLowerCase();

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res
      .status(200)
      .json({ token, user: { id: user.id, name: user.name, role: user.role } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to login" });
  }
};
