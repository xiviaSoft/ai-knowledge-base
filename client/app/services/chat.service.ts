import { removeToken } from "../utils/token";

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

export interface ChatMessageResponse {
    id: string;
    role: "USER" | "ASSISTANT";
    content: string;
    created_at?: string;
    sources?: ChatSource[];
}

export interface Conversation {
    id: string;
    title: string;
    created_at?: string;
    updated_at?: string;
}

export interface StreamDoneData {
    conversationId: string;
    sources?: ChatSource[];
    metadata?: {
        sourceCount?: number;
        retrievedChunks?: number;
        [key: string]: any;
    };
}

type StreamMessageOptions = {
    workspaceId: string;
    conversationId?: string | null;
    question: string;
    onStart?: (data: {
        conversationId: string;
    }) => void;
    onToken?: (token: string) => void;
    onDone?: (data: StreamDoneData) => void;
    onError?: (error: Error) => void;
};

class ChatService {
    private handleUnauthorized() {
        removeToken();

        if (typeof window !== "undefined") {
            window.location.href = "/auth/login";
        }
    }

    private getToken(): string | null {
        if (typeof window === "undefined") {
            return null;
        }
        return localStorage.getItem("token");
    }

    private getApiUrl(): string {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        if (!apiUrl) {
            throw new Error("NEXT_PUBLIC_API_URL is not configured.");
        }
        return apiUrl;
    }

    async streamMessage({
        workspaceId,
        conversationId,
        question,
        onStart,
        onToken,
        onDone,
        onError
    }: StreamMessageOptions): Promise<void> {
        try {
            if (!workspaceId) {
                throw new Error("Workspace ID is required.");
            }

            if (!question.trim()) {
                throw new Error("Question is required.");
            }

            const token = this.getToken();

            if (!token) {
                throw new Error("Authentication token is missing.");
            }

            const response = await fetch(
                `${this.getApiUrl()}/chat/ask`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "text/event-stream",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        workspaceId,
                        conversationId: conversationId || null,
                        question: question.trim()
                    })
                }
            );

            if (!response.ok) {
                if (response.status === 401) {
                    this.handleUnauthorized();
                }

                const errorData = await response.json().catch(() => null);
                throw new Error(
                    errorData?.message ||
                    `Chat request failed with status ${response.status}.`
                );
            }

            if (!response.body) {
                throw new Error(
                    "The server did not return a streaming response."
                );
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let buffer = "";

            const processEvent = (event: string) => {
                const lines = event.split(/\r?\n/);
                let eventType = "";
                const dataLines: string[] = [];

                for (const line of lines) {
                    if (line.startsWith("event:")) {
                        eventType = line
                            .slice("event:".length)
                            .trim();
                    } else if (line.startsWith("data:")) {
                        dataLines.push(
                            line
                                .slice("data:".length)
                                .trim()
                        );
                    }
                }

                if (!eventType || dataLines.length === 0) {
                    return;
                }

                const data = dataLines.join("\n");

                let parsed: any;

                try {
                    parsed = JSON.parse(data);
                } catch {
                    parsed = {
                        data
                    };
                }

                switch (eventType) {
                    case "start":
                    case "conversation":
                        if (parsed?.conversationId) {
                            onStart?.({
                                conversationId:
                                    parsed.conversationId
                            });
                        }
                        break;

                    case "token":
                        if (typeof parsed?.token === "string") {
                            onToken?.(parsed.token);
                        } else if (typeof parsed?.text === "string") {
                            onToken?.(parsed.text);
                        }
                        break;

                    case "done":
                        onDone?.({
                            conversationId:
                                parsed?.conversationId || "",
                            sources:
                                Array.isArray(parsed?.sources)
                                    ? parsed.sources
                                    : [],
                            metadata:
                                parsed?.metadata || {}
                        });
                        break;

                    case "error":
                        throw new Error(
                            parsed?.message ||
                            parsed?.error ||
                            "Streaming failed."
                        );

                    default:
                        break;
                }
            };

            while (true) {
                const { done, value } = await reader.read();

                if (done) {
                    break;
                }

                buffer += decoder.decode(value, {
                    stream: true
                });

                const events = buffer.split(/\r?\n\r?\n/);

                buffer = events.pop() || "";

                for (const event of events) {
                    if (!event.trim()) {
                        continue;
                    }

                    processEvent(event);
                }
            }

            buffer += decoder.decode();

            if (buffer.trim()) {
                processEvent(buffer);
            }

            reader.releaseLock();
        } catch (error) {
            const normalizedError =
                error instanceof Error
                    ? error
                    : new Error("Streaming failed.");

            console.error(
                "Chat streaming error:",
                normalizedError
            );

            onError?.(normalizedError);

            throw normalizedError;
        }
    }

    async streamQuestion(
        options: StreamMessageOptions
    ): Promise<void> {
        return this.streamMessage(options);
    }

    async askQuestion(
        options: StreamMessageOptions
    ): Promise<void> {
        return this.streamMessage(options);
    }

    async getMessages(
        conversationId: string
    ): Promise<ChatMessageResponse[]> {
        if (!conversationId) {
            throw new Error("Conversation ID is required.");
        }

        const token = this.getToken();

        if (!token) {
            throw new Error("Authentication token is missing.");
        }

        const response = await fetch(
            `${this.getApiUrl()}/chat/conversations/${conversationId}`,
            {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
        );

        if (!response.ok) {
            if (response.status === 401) {
                this.handleUnauthorized();
            }

            const errorData =
                await response.json().catch(() => null);

            throw new Error(
                errorData?.message ||
                "Failed to load conversation."
            );
        }

        const result = await response.json();

        return Array.isArray(result?.data)
            ? result.data
            : [];
    }

    async getConversations(
        workspaceId: string
    ): Promise<Conversation[]> {
        if (!workspaceId) {
            throw new Error("Workspace ID is required.");
        }

        const token = this.getToken();

        if (!token) {
            throw new Error("Authentication token is missing.");
        }

        const response = await fetch(
            `${this.getApiUrl()}/chat/conversations?workspaceId=${encodeURIComponent(
                workspaceId
            )}`,
            {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
        );

        if (!response.ok) {
            if (response.status === 401) {
                this.handleUnauthorized();
            }

            const errorData =
                await response.json().catch(() => null);

            throw new Error(
                errorData?.message ||
                "Failed to load conversations."
            );
        }

        const result = await response.json();

        if (Array.isArray(result?.data)) {
            return result.data;
        }

        if (Array.isArray(result?.data?.conversations)) {
            return result.data.conversations;
        }

        return [];
    }

    async deleteConversation(
        conversationId: string
    ) {
        if (!conversationId) {
            throw new Error("Conversation ID is required.");
        }

        const token = this.getToken();

        if (!token) {
            throw new Error("Authentication token is missing.");
        }

        const response = await fetch(
            `${this.getApiUrl()}/chat/conversations/${conversationId}`,
            {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
        );

        if (!response.ok) {
            const errorData =
                await response.json().catch(() => null);

            throw new Error(
                errorData?.message ||
                "Failed to delete conversation."
            );
        }

        return response.json();
    }

    async searchConversations(
        workspaceId: string,
        keyword: string
    ) {
        if (!workspaceId) {
            throw new Error("Workspace ID is required.");
        }

        const token = this.getToken();

        if (!token) {
            throw new Error("Authentication token is missing.");
        }

        const response = await fetch(
            `${this.getApiUrl()}/api/chat/search?workspaceId=${encodeURIComponent(
                workspaceId
            )}&q=${encodeURIComponent(keyword)}`,
            {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
        );

        if (!response.ok) {
            const errorData =
                await response.json().catch(() => null);

            throw new Error(
                errorData?.message ||
                "Failed to search conversations."
            );
        }

        const result = await response.json();

        return result?.data || [];
    }
}

export default new ChatService();
