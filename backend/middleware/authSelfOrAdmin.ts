import { Request, Response, NextFunction } from "express";

export function authorizeSelfOrAdmin(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const loggedInUser = req.user;
    const targetUserId = req.params.id;

    if (!loggedInUser) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const isSelf = loggedInUser.id.toString() === targetUserId;
    const isAdmin = loggedInUser.isAdmin === true;

    if (!isSelf && !isAdmin) {
        return res.status(403).json({ message: "Forbidden" });
    }

    next();
}