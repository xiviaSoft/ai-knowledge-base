import documentService from "../services/document.service.js";
import { serializeBigInt } from "../utils/slug.js";

class DocumentController {

    async upload(req, res, next) {

        try {

            console.log(
                "========== DOCUMENT UPLOAD =========="
            );

            console.log(
                "User:",
                req.user?.id
            );

            console.log(
                "Body:",
                req.body
            );

            console.log(
                "Workspace:",
                req.body?.workspaceId
            );

            console.log(
                "File:",
                req.file
            );


            /*
             * Multer parses multipart/form-data.
             *
             * Therefore:
             *
             * req.file
             *      -> uploaded file
             *
             * req.body.workspaceId
             *      -> workspace ID
             */

            if (!req.file) {

                return res.status(400).json({

                    success: false,

                    message: "No file was uploaded."

                });

            }


            const workspaceId =
                req.body?.workspaceId;


            if (!workspaceId) {

                return res.status(400).json({

                    success: false,

                    message: "Workspace ID is required."

                });

            }


            /*
             * Upload document
             */

            const result =
                await documentService.uploadDocument(

                    req.user.id,

                    workspaceId,

                    req.file

                );


            return res.status(201).json({

                success: true,

                ...result

            });

        }

        catch (error) {

            console.error(
                "Document upload controller error:",
                error
            );

            next(error);

        }

    }


    async getDocuments(req, res, next) {

        try {

            const documents =
                await documentService.getDocuments(
                    req.query.workspaceId
                );


            return res.status(200).json({

                success: true,

                data: serializeBigInt(
                    documents
                )

            });

        }

        catch (error) {

            next(error);

        }

    }


    async getDocumentsByWorkspace(
        req,
        res,
        next
    ) {

        try {

            const documents =
                await documentService.getDocumentsByWorkspace(
                    req.params.workspaceId
                );


            return res.status(200).json({

                success: true,

                documents: serializeBigInt(
                    documents
                )

            });

        }

        catch (error) {

            next(error);

        }

    }


    async deleteDocument(req, res, next) {
        try {
            const response = await documentService.deleteDocument(
                req.params.id,
                req.user.id
            );
            return res.status(200).json({
                success: true,
                data: serializeBigInt(response)
            });
        } catch (error) {
            next(error);
        }
    }
    
    async retryDocument(req, res, next) {
        try {
            const response = await documentService.retryDocument(
                req.params.id,
                req.user.id
            );
            return res.status(200).json({
                success: true,
                data: serializeBigInt(response)
            });
        } catch (error) {
            next(error);
        }
    }
}

export default new DocumentController();