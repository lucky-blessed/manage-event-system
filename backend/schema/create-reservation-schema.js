const { z } = require("zod");
const isValidObjectId = require("../utils/is-valid-id");

const CreateReservationSchema = z.object({
    eventId: z.string().refine((Id) => isValidObjectId(id), {
        message: "Invalid eventId. Must be a valid MongoDB ObjectId",
    }),
});

module.exports = CreateReservationSchema;