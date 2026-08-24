import api from "./api.service";

export interface SearchDocument {
    id: string;
    original_name: string;
    file_type?: string;
    status?: string;
    created_at?: string;
}

export interface SearchConversation {
    id: string;
    title: string | null;
    created_at?: string;
}

export interface SearchMemberUser {
    id: string;
    first_name: string;
    last_name?: string | null;
    email: string;
    avatar?: string | null;
}

export interface SearchMember {
    id: string;
    role: "OWNER" | "ADMIN" | "EDITOR" | "VIEWER";
    users: SearchMemberUser;
}

export interface SearchResults {
    documents: SearchDocument[];
    conversations: SearchConversation[];
    members: SearchMember[];
}

class SearchService {

    async search(
        workspaceId: string,
        keyword: string
    ): Promise<SearchResults> {
        const { data } = await api.get("/search",
            {
                params: {
                    workspaceId,
                    q: keyword
                }
            }
        );

        return data?.data || {
            documents: [],
            conversations: [],
            members: []
        };
    }
}

export default new SearchService();
