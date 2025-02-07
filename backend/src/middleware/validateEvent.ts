import { Request, Response, NextFunction } from 'express';
import { eventCreationSchema } from '../schemas/eventSchemas';
import { ZodError } from 'zod';

export const validateEvent = (req: Request, res: Response, next: NextFunction): void => {
    try {
        eventCreationSchema.parse(req.body);
        next();
    } catch (error) {
        if (error instanceof ZodError) {
            const firstError = error.errors[0];
            res.status(400).json({ error: firstError.message });
            return;
        }
        res.status(400).json({ error: 'Invalid request data' });
    }
}; 