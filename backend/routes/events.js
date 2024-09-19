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

router.put("/events/:id", verifyToken, validIdParam, async (req, res) => {
    const eventId = req.params.id;
    const userId = req.user;

    try {
        const event = await EventModel.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        // Check if the user is the owner of the event
        if (event.userId.toString() !== userId) {
            return res.status(403).json({ message: "You are not authorized to update this event" });
        }

        const validation = UpdateEventSchema.safeParse(req.body);

        if (!validation.success) {
            return res.status(400).json({ error: fromError(validation.error).toString() });
        }
        const { title, description, datetime, isPublic, cover } = req.body;
        // Update the event details
        event.title = title || event.title;
        event.description = description || event.description;
        event.datetime = datetime || event.datetime;
        event.isPublic = isPublic !== undefined ? isPublic : event.isPublic;
        event.cover = cover || event.cover;

        await event.save();
        res.status(200).json({ event });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});








outer.delete("/event/:reservationId", verifyToken, async (req, res) => {
	const reservationId = req.params.reservationId;
	const userId = req.user;

	try {
		const reservation = await Reservation.findById(reservationId);
		if (!reservation) {
			return res.status(404).json({ message: "Reservation not found" });
		}

		const event = await EventModel.findById(reservation.eventId);
		if (!event) {
			return res.status(404).json({ message: "Event not found" });
		}

		// Check if the user is the owner of the event
		if (event.userId.toString() !== userId) {
			return res.status(403).json({ message: "You are not authorized to delete this reservation" });
		}

		await Reservation.deleteOne({ _id: reservationId });
		res.status(200).json({ message: "Reservation deleted successfully" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
});