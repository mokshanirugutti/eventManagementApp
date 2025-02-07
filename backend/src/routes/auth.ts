import { Router } from 'express';
import { login, register } from '../users/auth';
import { userLoginSchema, userRegistrationSchema } from '../schemas/userSchemas';
import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

const router = Router();

// Middleware to validate registration
const validateRegistration = (req: Request, res: Response, next: NextFunction) => {
    try {
        userRegistrationSchema.parse(req.body);
        next();
    } catch (error) {
        if (error instanceof ZodError) {
            const firstError = error.errors[0];
            res.status(400).json({ error: firstError.message });
        }
    }
};

// Middleware to validate login
const validateLogin = (req: Request, res: Response, next: NextFunction) => {
    try {
        userLoginSchema.parse(req.body);
        next();
    } catch (error) {
        if (error instanceof ZodError) {
            const firstError = error.errors[0];
            res.status(400).json({ error: firstError.message});
        }
    }
};

//routes
router.post('/login', validateLogin, login);
router.post('/register', validateRegistration, register);

export default router;