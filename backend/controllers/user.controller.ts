import { Request, Response } from "express";
import {
  updateUserService,
  deleteUserService,
  getUsers
} from "../services/userService";
import bcrypt from 'bcrypt';

export async function updateUser(req: Request, res: Response) {
  try {
    const userId = req.params.id;
    const updates = { ...req.body };

    if (!updates.password) {
      delete updates.password;
    } else {
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(updates.password, salt);
    }

    const updatedUser = await updateUserService(
      userId,
      { $set: updates }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully!", data: updatedUser });
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
}

export async function deleteUser(req: Request, res: Response) {
  try {
    const userId = req.params.id;
    const deletedUser = await deleteUserService(userId);

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
}


export async function getAllUser(req: Request, res: Response) {
  const user = await getUsers();
  return res.status(200).json({ message: "success", data: user });
}