import api from "./api.service";

const invitationService = {
    async createInvitation(
        workspaceId: string,
        email: string,
        role: string
    ) {
        const response = await api.post(
            `/workspaces/${workspaceId}/invitations`,
            {
                email,
                role
            }
        );


        return response.data.data;
    },

    async getWorkspaceInvitations(
        workspaceId: string
    ) {
        const response = await api.get(
            `/workspaces/${workspaceId}/invitations`
        );

        return response.data.data;
    },

    async acceptInvitation(
        invitationId: string
    ) {
        const response = await api.patch(
            `/invitations/${invitationId}/accept`
        );

        return response.data.data;
    },

    async rejectInvitation(
        invitationId: string
    ) {
        const response = await api.patch(
            `/invitations/${invitationId}/reject`
        );

        return response.data;
    },

    async cancelInvitation(
        workspaceId: string,
        invitationId: string
    ) {
        const response = await api.delete(
            `/workspaces/${workspaceId}/invitations/${invitationId}`
        );

        return response.data;
    }

};

export default invitationService;
