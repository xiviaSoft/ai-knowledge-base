"use client";
import chatService from "../services/chat.service";
import { useCallback, useState } from "react";

export type ChatMessage = {
    id: string;
    role: "USER" | "ASSISTANT";
    content: string;
    sources?: any[];
    isStreaming?: boolean;
};

export type Conversation = {
    id: string;
    title: string;
    created_at?: string;
    updated_at?: string;
};

type UseChatOptions = {
    onConversationCreated?: (conversationId: string) => void;
};

export default function useChat(
    workspaceId?: string,
    options?: UseChatOptions
) {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [conversationId, setConversationId] = useState<string | null>(null);
    const [conversationTitle, setConversationTitle] = useState("New Conversation");

    const sendMessage = useCallback(
        async (question: string) => {
            const text = question.trim();

            if (!workspaceId || !text || loading) {
                return;
            }

            setError(null);
            setLoading(true);

            const userMessage: ChatMessage = {
                id: `user-${Date.now()}`,
                role: "USER",
                content: text
            };

            const assistantMessageId = `assistant-${Date.now()}`;

            const assistantMessage: ChatMessage = {
                id: assistantMessageId,
                role: "ASSISTANT",
                content: "",
                sources: [],
                isStreaming: true
            };

            setMessages((previous) => [
                ...previous,
                userMessage,
                assistantMessage
            ]);

            if (!conversationId) {
                setConversationTitle(text.substring(0, 50));
            }

            try {
                await chatService.streamMessage({
                    workspaceId,
                    conversationId: conversationId || undefined,
                    question: text,
                    onStart: (data) => {
                        if (!data?.conversationId) {
                            return;
                        }

                        setConversationId((currentId) => {
                            if (!currentId) {
                                options?.onConversationCreated?.(
                                    data.conversationId
                                );
                                return data.conversationId;
                            }

                            return currentId;
                        });
                    },
                    onToken: (token) => {
                        if (!token) {
                            return;
                        }

                        setMessages((previous) =>
                            previous.map((message) =>
                                message.id === assistantMessageId
                                    ? {
                                        ...message,
                                        content: message.content + token
                                    }
                                    : message
                            )
                        );
                    },
                    onDone: (data) => {
                        if (data?.conversationId) {
                            setConversationId(data.conversationId);
                        }

                        setMessages((previous) =>
                            previous.map((message) =>
                                message.id === assistantMessageId
                                    ? {
                                        ...message,
                                        sources: data?.sources || [],
                                        isStreaming: false
                                    }
                                    : message
                            )
                        );
                    },
                    onError: (streamError) => {
                        throw streamError;
                    }
                });
            } catch (error) {
                const message =
                    error instanceof Error
                        ? error.message
                        : "Something went wrong while processing your question.";

                console.error("Chat streaming error:", error);

                setError(message);

                setMessages((previous) =>
                    previous.map((item) =>
                        item.id === assistantMessageId
                            ? {
                                ...item,
                                content: message,
                                isStreaming: false
                            }
                            : item
                    )
                );
            } finally {
                setLoading(false);
            }
        },
        [workspaceId, conversationId, loading, options]
    );

    const newConversation = useCallback(() => {
        setMessages([]);
        setConversationId(null);
        setConversationTitle("New Conversation");
        setError(null);
        setLoading(false);
    }, []);

    const resetChat = useCallback(() => {
        newConversation();
    }, [newConversation]);

    const loadConversation = useCallback(
        async (conversation: Conversation) => {
            if (!conversation?.id) {
                return;
            }

            setError(null);
            setLoading(true);

            try {
                const history = await chatService.getMessages(conversation.id);
                const mapped: ChatMessage[] = history.map((message) => ({
                    id: message.id,
                    role: message.role === "USER" ? "USER" : "ASSISTANT",
                    content: message.content || "",
                    sources: Array.isArray(message.sources) ? message.sources : []
                }));

                setConversationId(conversation.id);
                setConversationTitle(conversation.title || "Conversation");
                setMessages(mapped);
            } catch (error) {
                const message =
                    error instanceof Error
                        ? error.message
                        : "Failed to load conversation.";

                console.error("Load conversation error:", error);
                setError(message);
                setMessages([]);
            } finally {
                setLoading(false);
            }
        },
        []
    );

    return {
        messages,
        loading,
        error,
        conversationId,
        conversationTitle,
        sendMessage,
        newConversation,
        loadConversation,
        resetChat
    };
}
