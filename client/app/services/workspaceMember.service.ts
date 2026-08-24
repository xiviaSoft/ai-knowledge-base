import api from "./api.service";

export type WorkspaceMemberRole =
    | "OWNER"
    | "ADMIN"
    | "EDITOR"
    | "VIEWER";

export interface WorkspaceMemberUser {
    id: string;
    first_name: string;
    last_name?: string | null;
    email: string;
    avatar?: string | null;
}

export interface WorkspaceMember {
    id: string;
    workspace_id: string;
    user_id: string;
    role: WorkspaceMemberRole;
    joined_at?: string;
    users: WorkspaceMemberUser;
}

export interface InviteMemberPayload {
    email: string;
    role: Exclude<WorkspaceMemberRole, "OWNER">;
}

class WorkspaceMemberService {
    async getMembers(
        workspaceId: string
    ): Promise<WorkspaceMember[]> {
        const { data: response } = await api.get(
            `/workspaces/${workspaceId}/members`
        );
        return Array.isArray(response?.data)
            ? response.data
            : [];
    }

    async inviteMember(
        workspaceId: string,
        payload: InviteMemberPayload
    ): Promise<WorkspaceMember> {
        const { data: response } = await api.post(
            `/workspaces/${workspaceId}/members`,
            payload
        );
        return response?.data;
    }

    async updateRole(
        workspaceId: string,
        memberId: string,
        role: Exclude<WorkspaceMemberRole, "OWNER">
    ): Promise<WorkspaceMember> {
        const { data: response } = await api.patch(
            `/workspaces/${workspaceId}/members/${memberId}`,
            { role }
        );
        return response?.data;
    }

    async removeMember(
        workspaceId: string,
        memberId: string
    ): Promise<void> {
        await api.delete(
            `/workspaces/${workspaceId}/members/${memberId}`
        );
    }
}

export default new WorkspaceMemberService();
