import Joi from "joi";

export const searchCitySchema = Joi.object({
    q: Joi.string()
        .trim()
        .min(2)
        .max(50)
        .pattern(/^[A-Za-z\s]+$/)
        .required()
        .messages({
            "any.required": "City name is required",
            "string.empty": "City name cannot be empty",
            "string.min": "City name must be at least 2 characters",
            "string.max": "City name cannot exceed 50 characters",
            "string.pattern.base": "City name must contain only alphabets (A–Z) and spaces",
        }),
});
