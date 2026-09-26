import chatService from "../services/chat.service.js";
class ChatController {
    async streamMessage(req, res, next) {
        try {
            res.setHeader(
                "Content-Type",
                "text/event-stream"
            );
            res.setHeader(
                "Cache-Control",
                "no-cache, no-transform"
            );
            res.setHeader(
                "Connection",
                "keep-alive"
            );
            res.flushHeaders();
            await chatService.streamQuestion({
                workspaceId: req.body.workspaceId,
                conversationId: req.body.conversationId,
                question: req.body.question,
                userId: req.user.id
            }, res);
        } catch (error) {
            console.error(
                "Chat streaming error:",
                error
            );
            if (!res.headersSent) {
                return next(error);
            }
            res.write(
                `event: error\ndata: ${JSON.stringify({
                    message:
                        error.message ||
                        "Chat streaming failed."
                })}\n\n`
            );
            res.end();
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
                message:
                    "Conversation deleted successfully."
            });
        } catch (error) {
            next(error);
        }
    }
    async search(req, res, next) {
        try {
            const data =
                await chatService.searchConversations(
                    req.query.workspaceId,
                    req.query.q
                );
            res.json({
                success: true,
                data
            });
        } catch (error) {
            next(error);
        }
    }
    async globalSearch(req, res, next) {
        try {
            const data =
                await chatService.globalSearch(
                    req.query.workspaceId,
                    req.query.q
                );
            res.status(200).json({
                success: true,
                data
            });
        } catch (error) {
            next(error);
        }
    }
}
export default new ChatController();