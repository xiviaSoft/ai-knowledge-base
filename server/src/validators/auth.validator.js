import Joi from "joi";

export const registerSchema = Joi.object({
    firstName: Joi.string().trim().min(2).max(100).required(),

    lastName: Joi.string().trim().max(100).allow("", null),

    email: Joi.string().email().lowercase().required(),

    password: Joi.string()
        .min(8)
        .max(30)
        .pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/
        )
        .required()
        .messages({
            "string.pattern.base":
                "Password must contain uppercase, lowercase, number and special character."
        }),

    workspaceName: Joi.string()
        .trim()
        .min(3)
        .max(100)
        .required()
});