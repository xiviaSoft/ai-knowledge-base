export const validate = (schema) => {
    return async (req, res, next) => {
        try {
            const value = await schema.validateAsync(req.body, {
                abortEarly: false,
                stripUnknown: true,
            });

            req.body = value;

            next();

        } catch (error) {

            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: error.details.map((err) => ({
                    field: err.path.join("."),
                    message: err.message,
                })),
            });

        }
    };
};