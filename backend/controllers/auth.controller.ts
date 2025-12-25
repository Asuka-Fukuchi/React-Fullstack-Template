import { Request, Response } from "express";
import bcrypt from 'bcrypt';
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
import {
  createUserService,
  getUserByEmail,
  getAuthUserService
} from "../services/authService";
import { User } from "../models/user.model";

// register
export async function createUser(req: Request, res: Response) {
  try {
    const { firstName, lastName, email, password, dob, isAdmin } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(409).json({ message: "Email already in use" });
    }

    const newUser = await createUserService(
      firstName, 
      lastName, 
      email, 
      password, 
      dob, 
      isAdmin
    );

    const token = jwt.sign(
      {
        id: newUser._id,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
      },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    const safeUser = newUser.toObject();
    delete (safeUser as any).password;

    return res.status(201).json({ 
      message: "User Created Successfully", 
      user: safeUser,
      token: token 
    });
  } catch (err) {
    res.status(500).json({ message: err });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Missing email or password" });
    }

    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized user!" });
    }

    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      return res.status(401).json({ message: "Unauthorized user!" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email,
        isAdmin: user.isAdmin,
      },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    const safeUser = user.toObject();
    delete (safeUser as any).password;

    return res.status(200).json({ user: safeUser, token: token });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
}

// auth me
export async function authMe(req: Request, res: Response) {
  try {
    const userId = req.user!.id;
    const user = await getAuthUserService(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.status(200).json({ user: user });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
}