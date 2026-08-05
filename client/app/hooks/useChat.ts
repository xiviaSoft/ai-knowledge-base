"use client";

import { useState } from "react";
import { askQuestion } from '../services/chat.service';
export default function useChat() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    const sendMessage = async (question) => {
        if (!question.trim()) return;
        const userMessage = {
            role: "user",
            message: question,
        };
        setMessages((prev) => [...prev, userMessage]);
        setLoading(true);
        try {
            const data = await askQuestion(question);
            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    data,
                },
            ]);
        } catch (error) {

            setMessages(prev => [
                ...prev,
                {
                    role: "assistant",
                    data: {
                        title: "Error",
                        description: "",
                        answer: "Something went wrong.",
                        image: "",
                        source: "",
                        processingTime: ""
                    }
                }
            ]);

        } finally {
            setLoading(false);
        }
    };
    return {
        messages,
        loading,
        sendMessage,
    };

}