import mongoose from "mongoose";
import { BaseModel } from "../models/base.model";

export async function createModelService(
    userId: string,
    title: string,
    description?: string
) {
    const item = await BaseModel.create({
        userId: new mongoose.Types.ObjectId(userId),
        title,
        description
    });
    return item;
}

export async function getMyModelsService(userId: string) {
    const items = await BaseModel.find({
        userId: new mongoose.Types.ObjectId(userId)
    });
    return items;
}

export async function getModelServiceById(id: string) {
    const item = await BaseModel.findById(id);
    return item;
}

export async function updateModelService(
    id: string,
    updateData: Partial<{ title: string; description: string }>
) {
    const item = await BaseModel.findByIdAndUpdate(
        id, 
        updateData, 
        {
        new: true,
        runValidators: true,
    });
    return item;
}

export async function deleteModelService(id: string) {
    const item = await BaseModel.findByIdAndDelete(id);
    return item;
}