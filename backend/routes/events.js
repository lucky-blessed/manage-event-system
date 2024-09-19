const express = require('express');
const EventModel = require("../models/event");
const Reservaation = require("../models/reservations");
const verifyToken = require("../middleware/verify-token");
const router = express.Router();
const { fromError } = require("zod-validation-error");
const CreateReservationSchema = require("../schema/create-event-schema");
const UpdateEventSchema = require("../schema/update-event-schema");
const convertDateTimeToIso = require("../middleware/convert-date-to-iso");
const validIdParam = require('../middleware/valid-id-param');


router.post("/events", verifyToken, convertDateTimeToIso, async (req, res) => {
    const userId = req.user;

    try {
        const validation = CreateEventSchema.safeParse(req.body);

        if (!validation.success) {
            return res.status(400).json({ error: fromError(validation.error).toString() });
        }

        const { title, description, datetime, isPublic, cover } = req.body;

        const newEvent = new EventModel({
            title,
            description,
            datetime,
            isPublic,
            cover,
            userId
        });

        await newEvent.save();
        res.status(201).json({ event: newEvent });
    } catch (error) {
        console.error(error);
        res.status(500).json({ Message: "Server erre"})
    }
});


router.get("/events/public", async (req, res) => {
    try {
        const publicEvent = await EventModel.find({ isPublic: true });
        res.status(200).json(publicEvent);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

router.get('/events/user', verifyToken, async (req, res) => {
    const userId = req.user;

    try {
        const userEvents = await EventModel.find({ userId });
        res.status(200).json({ event: userEvents });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error"});
    }
});


router.get("/events/:id", verifyToken, validIdParam, async (req, res) => {
    const eventId = req.params.id;

    try {
        const event = await EventModel.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.status(200).json({ event });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});