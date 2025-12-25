import { Request, Response } from "express";
import {
    createModelService,
    getMyModelsService,
    getModelServiceById,
    updateModelService,
    deleteModelService,
} from "../services/baseCRUD.service";

export async function createModel(req: Request, res: Response) {
    try {
        const userId = req.user!.id;
        const { title, description } = req.body;

        if (!title) {
            return res.status(400).json({ message: "Title is required" });
        }

        const newItem = await createModelService(
            userId,
            title,
            description
        );
        return res.status(201).json({
            message: "Item Created Successfully",
            data: newItem
        });
    } catch (err) {
        res.status(500).json({ message: err });
    }
}

export async function getMyModel(req: Request, res: Response) {
    try {
        const items = await getMyModelsService(req.user!.id);
        return res.status(200).json({ message: "Items found Successfully", data: items });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}

export async function getModelById(req: Request, res: Response) {
    try {
        const item = await getModelServiceById(req.params.id);
        if (!item) return res.status(404).json({ message: "Not found" });

        if (!item.userId.equals(req.user!.id)) {
            return res.status(403).json({ message: "Access denied" });
        }

        return res.status(200).json({ message: "Item found Successfully", data: item });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}

export async function updateModel(req: Request, res: Response) {
    try {
        const item = await getModelServiceById(req.params.id);
        if (!item) return res.status(404).json({ message: "Not found" });

        if (!item.userId.equals(req.user!.id)) {
            return res.status(403).json({ message: "Access denied" });
        }

        const { title, description } = req.body;

        const updated = await updateModelService(req.params.id, {
            title,
            description,
        });
        
        return res.status(200).json({ message: "Item updated Successfully", data: updated });
    } catch (err) {
        return res.status(500).json({ message: "Update failed" });
    }
}

export async function deleteModel(req: Request, res: Response) {
    try {
        const item = await getModelServiceById(req.params.id);
        if (!item) return res.status(404).json({ message: "Not found" });

        if (!item.userId.equals(req.user!.id)) {
            return res.status(403).json({ message: "Access denied" });
        }

        await deleteModelService(req.params.id);
        return res.status(204).send();
    } catch (err) {
        res.status(500).json({ message: "Delete failed" });
    }
}