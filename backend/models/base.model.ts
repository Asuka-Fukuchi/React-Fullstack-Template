import mongoose, { Schema } from "mongoose";
import type { IBase } from "../types/base.type";

const baseSchema = new Schema<IBase>({
    userId: { 
        type: Schema.Types.ObjectId, 
        ref: "User",
        required: true,
        immutable: true
    },
    title: { 
        type: String, 
        required: [true, "Title is required"] 
    },
    description: {
        type: String
    }
},
    { timestamps: true }
);

export const BaseModel = mongoose.model<IBase>("BaseModel", baseSchema);