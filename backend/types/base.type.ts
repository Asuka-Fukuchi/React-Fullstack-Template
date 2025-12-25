import mongoose, { Document } from "mongoose";

export interface IBase extends Document {
    userId: mongoose.Types.ObjectId;
    title: string;
    description?: string;
    createdAt?: Date;
    updatedAt?: Date;
}