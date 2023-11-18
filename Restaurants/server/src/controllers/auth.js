import User from "../models/auth.js";
import { env } from "../utils/env.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      email,
      hashedPassword,
    });

    if (!env.JWT_SECRET) {
      throw new Error(
        "JWT_SECRET is not defined in your environment variables",
      );
    }

    const token = jwt.sign({ userId: user.displayId }, env.JWT_SECRET, {
      expiresIn: "24h",
    });

    return res.status(200).json({
      user: {
        id: user.displayId,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    if (!env.JWT_SECRET) {
      throw new Error(
        "JWT_SECRET is not defined in your environment variables",
      );
    }

    const token = jwt.sign({ userId: user.displayId }, env.JWT_SECRET, {
      expiresIn: "24h",
    });

    return res.status(200).json({
      user: {
        id: user.displayId,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
