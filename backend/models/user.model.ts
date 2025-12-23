import mongoose, { Schema } from "mongoose";
import type { IUser } from "../types/user.type";

const userSchema = new Schema<IUser>({
    firstName: { 
        type: String, 
        required: [true, "First name is required"] 
    },
    lastName: { 
        type: String, 
        required: [true, "Last name is required"] 
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, "Invalid email"]
    },
    password: { 
        type: String, 
        required: [true, "Password is required"], 
        select: false 
    },
    dob: { type: Date },
    isAdmin: { type: Boolean, default: false }
},
    { timestamps: true }
);

// For security
userSchema.set("toJSON", {
    transform: (_doc, ret: any) => {
        const { password, __v, ...clean } = ret;
        return clean;
    }
});

export const User = mongoose.model<IUser>("User", userSchema);