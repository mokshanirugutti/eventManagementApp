import { Router } from 'express';
import { getAllEvents, getEventById, createEvent, joinEvent, deleteEvent, updateEvent } from '../controllers/events';
import { authMiddleware } from '../middleware/auth';
import { validateEvent } from '../middleware/validateEvent';

const router = Router();

// Public routes
router.get('/', getAllEvents);
router.get('/:id', getEventById);

// Protected routes
router.post('/', authMiddleware, validateEvent, createEvent);
router.post('/join/:id', authMiddleware, joinEvent);
router.delete('/delete/:id',authMiddleware, deleteEvent)
router.put('/:id', authMiddleware, validateEvent, updateEvent);

export default router;