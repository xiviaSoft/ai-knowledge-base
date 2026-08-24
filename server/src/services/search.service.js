import workspaceMemberRepository from "../repositories/workspaceMember.repository.js";
import documentRepository from "../repositories/document.repository.js";
import chatRepository from "../repositories/chat.repository.js";

class SearchService {

    async search(workspaceId, keyword) {
        const searchTerm = keyword?.trim();

        if (!searchTerm) {
            return {
                documents: [],
                conversations: [],
                members: []
            };
        }

        const [
            documents,
            conversations,
            members
        ] = await Promise.all([
            documentRepository.search(
                workspaceId,
                searchTerm
            ),
            chatRepository.search(
                workspaceId,
                searchTerm
            ),
            workspaceMemberRepository.search(
                workspaceId,
                searchTerm
            )
        ]);

        return {
            documents,
            conversations,
            members
        };
    }
}

export default new SearchService();