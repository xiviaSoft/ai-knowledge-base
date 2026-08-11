import api from "./api.service";


export interface AskQuestionPayload {
    workspaceId: string;
    conversationId?: string | null;
    question: string;
}


export interface ChatSource {
    documentId: string | null;
    chunkIndex: number | null;
    score: number;
    text: string;
}


export interface ChatResponse {
    conversationId: string;
    answer: string;
    sources: ChatSource[];

    metadata: {
        sourceCount: number;
        retrievedChunks: number;
    };
}


export interface Conversation {
    id: string;
    title: string;
    created_at?: string;
    updated_at?: string;
}


class ChatService {

    /*
     * Ask AI question.
     */
    async ask(
        data: AskQuestionPayload
    ): Promise<ChatResponse> {

        const { data: response } =
            await api.post<ChatResponse>(
                "/chat/ask",
                data
            );

        return response;
    }


    /*
     * Get workspace conversations.
     */
    async getConversations(
        workspaceId: string
    ): Promise<Conversation[]> {

        const { data } =
            await api.get(
                `/chat/conversations/${workspaceId}`
            );

        return Array.isArray(data)
            ? data
            : data?.conversations || [];
    }


    /*
     * Get messages for conversation.
     */
    async getMessages(
        conversationId: string
    ) {

        const { data } =
            await api.get(
                `/chat/conversations/${conversationId}/messages`
            );

        return data;
    }


    /*
     * Delete conversation.
     */
    async deleteConversation(
        conversationId: string
    ) {

        const { data } =
            await api.delete(
                `/chat/conversations/${conversationId}`
            );

        return data;
    }


    /*
     * Search conversations.
     */
    async searchConversations(
        workspaceId: string,
        keyword: string
    ) {

        const { data } =
            await api.get(
                `/chat/conversations/${workspaceId}/search`,
                {
                    params: {
                        keyword
                    }
                }
            );

        return data;
    }
}


export default new ChatService();