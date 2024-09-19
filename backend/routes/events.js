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

