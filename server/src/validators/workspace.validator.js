import Joi from "joi";

export const createWorkspaceSchema = Joi.object({
    name: Joi.string()
        .trim()
        .min(3)
        .max(150)
        .required()
});

export const updateWorkspaceSchema = Joi.object({
    name: Joi.string()
        .trim()
        .min(3)
        .max(150)
        .required()
});