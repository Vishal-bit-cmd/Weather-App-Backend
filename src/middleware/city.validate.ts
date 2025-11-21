import type { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";

export const validateQuery = (schema: ObjectSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.query);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        next();
    };
};