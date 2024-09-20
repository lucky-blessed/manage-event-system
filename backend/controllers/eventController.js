const Event = require('../models/event');

// Get all events
const getEvents = async (req, res, next) => {
    try {
        const events = await Event.find().populate('userId');
        res.json(events);
    } catch (err) {
        next(err);
    }
};

// Create an event
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

module.exports = {
    getEvents,
    createEvent
};