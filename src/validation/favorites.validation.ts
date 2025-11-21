import Joi from "joi";

export const addFavoriteSchema = Joi.object({
    name: Joi.string().required().messages({
        "string.base": "City name must be text",
        "any.required": "City name is required",
    }),

    country: Joi.string().required().messages({
        "string.base": "Country must be text",
        "any.required": "Country is required",
    }),

    forecast: Joi.array().min(1).required().messages({
        "array.base": "Forecast must be an array",
        "array.min": "Forecast cannot be empty",
        "any.required": "Forecast is required",
    }),
});
