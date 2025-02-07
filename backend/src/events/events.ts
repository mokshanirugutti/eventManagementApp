import { Request, Response } from 'express';

export const getEvents = (req: Request, res: Response) => {
    // Handle login logic
    res.send('here are the events');
};

export const createEvent = (req: Request, res: Response) => {
    // Handle registration logic
    res.send('Event created');
};