const { z } = require("zod");

const UpdateEventSchema = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    datetime: z.string().datetime({ local: true }).optional(),
    isPublic: z.boolean().optional(),
    cover: z.string().url().optional(),
});

module.exports = UpdateEventSchema;