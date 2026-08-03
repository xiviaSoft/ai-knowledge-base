import documentService from "../services/document.service.js";
import { serializeBigInt } from "../utils/slug.js";
class DocumentController {

    async upload(req, res, next) {

        try {

            const result =
                await documentService.uploadDocument(

                    req.user.id,

                    req.body.workspaceId,

                    req.file

                );

            return res.status(201).json({

                success: true,

                ...result

            });

        }

        catch (error) {

            next(error);

        }

    }
    async getDocuments(req, res, next) {

        try {

            const documents = await documentService.getDocuments(

                req.query.workspaceId

            );

            res.status(200).json({

                success: true,

                data: serializeBigInt(documents)

            });

        } catch (error) {

            next(error);

        }

    }

    async getDocument(req, res, next) {

        try {

            const document = await documentService.getDocument(

                req.params.id

            );

            res.status(200).json({

                success: true,

                data: serializeBigInt(document)

            });

        } catch (error) {

            next(error);

        }

    }

    async deleteDocument(req, res, next) {

        try {

            const response = await documentService.deleteDocument(req.params.id);

            res.status(200).json({
                success: true,
                data: response
            });

        } catch (error) {

            next(error);

        }

    }

}

export default new DocumentController();