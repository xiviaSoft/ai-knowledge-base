import documentService from "../services/document.service.js";

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

}

export default new DocumentController();