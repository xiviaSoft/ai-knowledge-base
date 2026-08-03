import chatService from "../services/chat.service.js";

class ChatController {

    async ask(req, res, next) {

        try {

            const response = await chatService.askQuestion({

                workspaceId: req.body.workspaceId,

                conversationId: req.body.conversationId,

                question: req.body.question,

                userId: req.user.id

            });

            res.status(200).json({

                success: true,

                data: response

            });

        } catch (error) {

            next(error);

        }

    }

    async getConversations(req, res, next) {

        try {

            const data = await chatService.getConversations(
                req.query.workspaceId
            );

            res.status(200).json({

                success: true,

                data

            });

        } catch (error) {

            next(error);

        }

    }

    async getConversation(req, res, next) {

        try {

            const data = await chatService.getConversation(
                req.params.id
            );

            res.status(200).json({

                success: true,

                data

            });

        } catch (error) {

            next(error);

        }

    }

    async deleteConversation(req, res, next) {

        try {

            await chatService.deleteConversation(
                req.params.id
            );

            res.status(200).json({

                success: true,

                message: "Conversation deleted successfully."

            });

        } catch (error) {

            next(error);

        }

    }

}

export default new ChatController();