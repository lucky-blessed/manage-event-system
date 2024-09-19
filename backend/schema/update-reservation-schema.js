const  { z } = require("zod");
const isValidObjectId = require("../utils/is-valid-id");

const UpdateReservationSchema = z.object({
    eventId: z.string().refine((id) => isValidObjectId(id), {
        message: "Invalid eventId. ID must be a valid MongoDB objectID",
    }),
});

module.exports = UpdateReservationSchema;