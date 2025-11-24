import Joi from "joi";

export const addFavoriteSchema = Joi.object({
    name: Joi.string().required().messages({
        "string.base": "City name must be text",
        "any.required": "City name is required",
    }),

    country: Joi.string().required().messages({
        "string.base": "Country must be text",
        "any.required": "Country is required",
    })
});
