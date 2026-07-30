import chatService from "../services/chat.service.js";

class ChatController {

    async ask(req, res, next) {

        try {

            const response =
                await chatService.askQuestion({

                    workspaceId: req.body.workspaceId,

                    conversationId: req.body.conversationId,

                    question: req.body.question,

                    userId: req.user.id

                });

            res.status(200).json({

                success: true,

                data: response

            });

        }

        catch(error){

            next(error);

        }

    }

}

export default new ChatController();