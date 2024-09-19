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
















router.delete("/user/:id", verifyToken, validIdParam, async (req, res) => {
	const reservationId = req.params.id;
	const userId = req.user;

	try {
		const reservation = await Reservation.findById(reservationId);
		if (!reservation) {
			return res.status(404).json({ message: "Reservation not found" });
		}

		// Check if the user is the owner of the reservation
		if (reservation.userId.toString() !== userId) {
			return res.status(403).json({ message: "You are not authorized to delete this reservation" });
		}

		await Reservation.deleteOne({ _id: reservationId });
		res.status(200).json({ message: "Reservation deleted successfully" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
});