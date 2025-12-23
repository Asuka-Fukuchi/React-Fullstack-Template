import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dob?: Date;
  isAdmin: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}