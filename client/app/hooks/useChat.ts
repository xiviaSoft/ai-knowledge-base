"use client";

import { useState } from "react";
import chatService from "@/app/services/chat.service";

export interface ChatMessage {
    id: string;
    role: "USER" | "ASSISTANT";
    content: string;
    sources?: any[];
}

export interface Conversation {
    id: string;
    title: string;
    created_at?: string;
    updated_at?: string;
}

interface UseChatOptions {
    onConversationCreated?: (
        conversationId: string
    ) => void;
}

export default function useChat(
    workspaceId: string,
    options?: UseChatOptions
) {
    const [messages, setMessages] =
        useState<ChatMessage[]>([]);

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    const [conversationId, setConversationId] =
        useState<string | null>(null);

    const [conversationTitle, setConversationTitle] =
        useState("New Conversation");


    /*
     * Send message
     */
    const sendMessage = async (
        question: string
    ) => {
        if (
            !question.trim() ||
            loading
        ) {
            return;
        }

        const trimmedQuestion =
            question.trim();

        setError("");

        /*
         * Show user message immediately.
         */
        const userMessage: ChatMessage = {
            id: `user-${Date.now()}`,
            role: "USER",
            content: trimmedQuestion
        };

        setMessages((prev) => [
            ...prev,
            userMessage
        ]);

        /*
         * If this is a new conversation,
         * use the question as the temporary title.
         */
        if (!conversationId) {
            setConversationTitle(
                trimmedQuestion.substring(0, 50)
            );
        }

        setLoading(true);

        try {
            const response =
                await chatService.ask({
                    workspaceId,
                    conversationId,
                    question: trimmedQuestion
                });

            /*
             * Backend creates a conversation
             * when conversationId is null.
             */
            if (
                response.conversationId &&
                !conversationId
            ) {
                const newConversationId =
                    response.conversationId;

                setConversationId(
                    newConversationId
                );

                options?.onConversationCreated?.(
                    newConversationId
                );
            }

            /*
             * Add assistant response.
             */
            const assistantMessage: ChatMessage = {
                id: `assistant-${Date.now()}`,
                role: "ASSISTANT",
                content:
                    response.answer ||
                    "I couldn't generate an answer.",
                sources:
                    response.sources || []
            };

            setMessages((prev) => [
                ...prev,
                assistantMessage
            ]);

            return response;

        } catch (err: any) {
            console.error(
                "Chat error:",
                err
            );

            const message =
                err?.response?.data?.message ||
                "Something went wrong while processing your question.";

            setError(message);

            setMessages((prev) => [
                ...prev,
                {
                    id: `error-${Date.now()}`,
                    role: "ASSISTANT",
                    content: message
                }
            ]);

        } finally {
            setLoading(false);
        }
    };


    /*
     * Load existing conversation.
     */
    const loadConversation = async (
        conversation: Conversation
    ) => {
        try {
            setError("");
            setLoading(true);

            const response =
                await chatService.getMessages(
                    conversation.id
                );

            const data =
                Array.isArray(response)
                    ? response
                    : response?.messages || [];

            setConversationId(
                conversation.id
            );

            setConversationTitle(
                conversation.title ||
                "Conversation"
            );

            setMessages(
                data.map(
                    (message: any) => ({
                        id: message.id,
                        role: message.role,
                        content: message.content,
                        sources:
                            message.sources || []
                    })
                )
            );

        } catch (error) {
            console.error(
                "Failed to load conversation:",
                error
            );

            setError(
                "Failed to load conversation."
            );

        } finally {
            setLoading(false);
        }
    };


    /*
     * Start new conversation.
     */
    const newConversation = () => {
        setConversationId(null);

        setConversationTitle(
            "New Conversation"
        );

        setMessages([]);

        setError("");
    };


    /*
     * Clear messages.
     */
    const clearMessages = () => {
        setMessages([]);

        setError("");
    };


    return {
        messages,
        loading,
        error,

        conversationId,
        conversationTitle,

        sendMessage,
        newConversation,
        loadConversation,
        clearMessages
    };
}