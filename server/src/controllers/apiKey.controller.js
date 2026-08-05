import apiKeyService from "../services/apiKey.service.js";

class ApiKeyController {

    async create(req, res, next) {

        try {

            const data = await apiKeyService.createApiKey(

                req.params.id,

                req.body.name

            );

            res.status(201).json({

                success: true,

                message: "API Key created successfully.",

                data

            });

        }

        catch (error) {

            next(error);

        }

    }

    async getAll(req, res, next) {

        try {

            const data = await apiKeyService.getApiKeys(

                req.params.id

            );

            res.status(200).json({

                success: true,

                data

            });

        }

        catch (error) {

            next(error);

        }

    }

    async delete(req, res, next) {

        try {

            const data = await apiKeyService.deleteApiKey(

                req.params.keyId

            );

            res.status(200).json({

                success: true,

                data

            });

        }

        catch (error) {

            next(error);

        }

    }

}

export default new ApiKeyController();