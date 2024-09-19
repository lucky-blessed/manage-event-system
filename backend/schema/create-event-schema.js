const { z } = require("zod");

const CreateEventSchema = z.object({
    title: z.string(),
    description: z.string(),
    datetime: z.string().datetime({ local: true }),
    isPublic: z.boolean(),
    cover: z.string().url(),
});

module.exports = CreateEventSchema;