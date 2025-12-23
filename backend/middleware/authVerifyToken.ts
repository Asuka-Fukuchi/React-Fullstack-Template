import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: string;
  email: string;
}

// for typescript
declare module "express-serve-static-core" {
  interface Request {
    user?: { id: string; email: string; isAdmin: boolean; };
  }
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get authorization in header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized user" });
    }

    // Extract token
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // Verify token
    const secret = process.env["JWT_SECRET"];

    if (!secret) {
      return res.status(401).json({ message: "Invalid user" });
    }

    const decoded = jwt.verify(token, secret) as JwtPayload  & { isAdmin: boolean };

    // Set User info into req.user
    req.user = { id: decoded.id, email: decoded.email, isAdmin: decoded.isAdmin };

    return next();
  } catch (err: any) {
    return res.status(500).json({ message: err });
  }
};