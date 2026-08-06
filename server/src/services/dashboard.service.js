import workspaceRepository from "../repositories/workspace.repository.js";
import documentRepository from "../repositories/document.repository.js";
import conversationRepository from "../repositories/conversation.repository.js";
import workspaceMemberRepository from "../repositories/workspaceMember.repository.js";
import { serializeBigInt } from "../utils/slug.js";

class DashboardService {

    async getDashboard(workspaceId) {

        const [

            workspace,

            documents,

            conversations,

            members,

            storage,

            recentDocuments,

            recentConversations

        ] = await Promise.all([

            workspaceRepository.findById(workspaceId),

            documentRepository.countByWorkspace(workspaceId),

            conversationRepository.countByWorkspace(workspaceId),

            workspaceMemberRepository.countByWorkspace(workspaceId),

            documentRepository.sumStorage(workspaceId),

            documentRepository.getRecent(workspaceId),

            conversationRepository.getRecent(workspaceId)

        ]);

        if (!workspace) {

            throw new Error("Workspace not found.");

        }

        return serializeBigInt({

            workspace,

            stats: {

                documents,

                members,

                chats: conversations,

                storageUsed: storage,

                apiKeys: 0 

            },

            recentDocuments,

            recentConversations

        });

    }

}

export default new DashboardService();