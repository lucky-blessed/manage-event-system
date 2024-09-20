const Event = require('../models/event');

// Get all events with user population
const getEvents = async (req, res, next) => {
    try {
        const events = await Event.find().populate('userId');
        res.json(events);
    } catch (err) {
        next(err);
    }
};

// Create a new event
const createEvent = async (req, res, next) => {
    const { title, description, datetime, cover, isPublic, userId } = req.body;

    try {
        const newEvent = new Event({
            title,
            description,
            datetime,
            cover,
            isPublic,
            userId
        });
        const savedEvent = await newEvent.save();
        res.status(201).json(savedEvent);
    } catch (err) {
        next(err);
    }
};

// Get a specific event by ID with user population
const getEventById = async (req, res, next) => {
    try {
        const event = await Event.findById(req.params.id).populate('userId');
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.json(event);
    } catch (err) {
        next(err);
    }
};

// Update an event by ID
const updateEvent = async (req, res, next) => {
    try {
        const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('userId');
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.json(event);
    } catch (err) {
        next(err);
    }
};

// Delete an event by ID
const deleteEvent = async (req, res, next) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(204).send();
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getEvents,
    createEvent,
    getEventById,
    updateEvent,
    deleteEvent
};