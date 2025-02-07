import { Request, Response } from 'express';
import { Event } from '../models/Event';
import { io } from '../index';
// Get all events with filter
export const getAllEvents = async (req: Request, res: Response): Promise<void> => {
    try {
        const { filter } = req.query;
        const currentDate = new Date();
        
        let query = {};
        if (filter === 'upcoming') {
            query = { date: { $gte: currentDate } };
        } else if (filter === 'past') {
            query = { date: { $lt: currentDate } };
        }

        const events = await Event.find(query)
            .populate('creator', 'username')
            .sort({ date: 1 });

        res.json(events);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching events' });
    }
};

// Get single event
export const getEventById = async (req: Request, res: Response): Promise<void> => {
    try {
        const event = await Event.findById(req.params.id)
            .populate('creator', 'username')
            .populate('attendees', 'username');

        if (!event) {
            res.status(404).json({ error: 'Event not found' });
            return;
        }

                // status of event
                const currentDate = new Date();
                let status = '';
        
                if (event.date > currentDate) {
                    status = 'upcoming'; // Event is in the future
                } else if (event.date.toDateString() === currentDate.toDateString()) {
                    status = 'ongoing'; // Event is today
                } else {
                    status = 'completed'; // Event is in the past
                }

        
        const finalEventData = {
            ...event.toObject(), 
            status 
        };

        res.json({"event":finalEventData});
    } catch (error) {
        res.status(500).json({ error: 'Error fetching event' });
    }
};

// Create event (protected route)
export const createEvent = async (req: Request, res: Response): Promise<void> => {
    try {
        const event = new Event({
            ...req.body,
            creator: req.userId // From auth middleware
        });

        await event.save();
        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({ error: `Error creating event - ${error} ` });
    }
};

// Join event (protected route)
export const joinEvent = async (req: Request, res: Response): Promise<void> => {
    try {
        const event = await Event.findById(req.params.id);
        
        if (!event) {
            res.status(404).json({ error: 'Event not found' });
            return;
        }

        if (event.attendees.includes(req.userId as any)) {
            res.status(400).json({ error: 'Already joined this event' });
            return;
        }

        event.attendees.push(req.userId as any);
        await event.save();

          // Emit a Socket.IO event to notify attendees
        io.to(req.params.id.toString()).emit('joinEventRoom', {
            eventId: req.params.id,
            userId: req.userId,
            message: `A new user has joined the event: ${event.title}`,
          });

        res.json({ message: 'Successfully joined event' });
    } catch (error) {
        res.status(500).json({ error: 'Error joining event' });
    }
}; 

export const updateEvent = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        // Find the event by ID
        const event = await Event.findById(id);

        if (!event) {
            res.status(404).json({ error: 'Event not found' });
            return;
        }

        // check if the user is the creator of the event
        if (event.creator.toString() !== req.userId) {
            res.status(403).json({ error: 'You are not authorized to update this event' });
            return;
        }

        // update event
        Object.assign(event, updatedData);
        await event.save();

        res.json(event);
    } catch (error) {
        res.status(500).json({ error: `Error updating event - ${error}` });
    }
};

// Delete event (protected route)
export const deleteEvent = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        // Find the event by ID
        const event = await Event.findById(id);

        if (!event) {
            res.status(404).json({ error: 'Event not found' });
            return;
        }

        //  check if the user is the creator of the event
        if (event.creator.toString() !== req.userId) {
            res.status(403).json({ error: 'You are not authorized to delete this event' });
            return;
        }

        // Delete event
        await Event.findByIdAndDelete(id);

        res.json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: `Error deleting event - ${error}` });
    }
};
