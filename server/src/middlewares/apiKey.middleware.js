import apiKeyRepository from "../repositories/apiKey.repository.js";

const apiKeyAuth = async (req, res, next) => {

    try {

        const apiKey = req.headers["x-api-key"];

        if (!apiKey) {

            return res.status(401).json({

                success: false,

                message: "API Key is required."

            });

        }

        const key = await apiKeyRepository.findByKey(apiKey);

        if (!key) {

            return res.status(401).json({

                success: false,

                message: "Invalid API Key."

            });

        }

        req.apiKey = key;

        next();

    }

    catch (error) {

        next(error);

    }

};

export default apiKeyAuth;