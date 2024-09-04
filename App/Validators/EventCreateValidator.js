const Joi = require("joi");

const createEventSchema = Joi.object({
  title: Joi.string().trim().min(6).max(15).required().messages({
    "string.empty": "Title is required",
    "any.required": "Title is required",
    "string.min": "Title must be at least 6 characters long",
    "string.max": "Title must be at most 15 characters long",
  }),

  description: Joi.string().trim().min(15).max(100).required().messages({
    "string.empty": "Description is required",
    "any.required": "Description is required",
    "string.min": "Description must be at least 15 characters long",
    "string.max": "Description must be at most 100 characters long",
  }),
  location: Joi.string().min(6).max(50).required().messages({
    "string.min": "Location must be at least 6 characters long",
    "string.max": "Location must be at most 50 characters long",
    "string.empty": "Location is required",
    "any.required": "Location is required",
  }),
  time: Joi.string()
    .trim()
    .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .required(),
  attendees: Joi.array()
    .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/))
    .optional(),
  organizer: Joi.array()
    .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/))
    .optional(),
});

const validateCreateEvent = (eeventData) => {
  return createEventSchema.validate(eeventData, { abortEarly: false });
};

module.exports = validateCreateEvent;
