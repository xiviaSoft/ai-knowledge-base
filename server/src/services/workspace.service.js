import workspaceRepository from "../repositories/workspace.repository.js";
import { generateSlug } from "../utils/slug.js";
import chatRepository from "../repositories/chat.repository.js";
import documentRepository from "../repositories/document.repository.js";
import workspaceMemberRepository from "../repositories/workspaceMember.repository.js";
import documentService from "./document.service.js";
import prisma from "../config/prisma.js";
import { v4 as uuid } from "uuid";

class WorkspaceService {
    async createWorkspace(userId, data) {
        const { name } = data;

        let slug = generateSlug(name);

        const existingWorkspace =
            await workspaceRepository.findBySlug(slug);

        if (existingWorkspace) {
            slug = `${slug}-${Date.now()}`;
        }

        const workspaceId = uuid();

        const workspace = await prisma.$transaction(
            async (tx) => {
                const newWorkspace =
                    await tx.workspaces.create({
                        data: {
                            id: workspaceId,
                            name,
                            slug,
                            owner_id: userId
                        }
                    });

                await tx.workspace_members.create({
                    data: {
                        id: uuid(),
                        workspace_id: workspaceId,
                        user_id: userId,
                        role: "OWNER"
                    }
                });

                return newWorkspace;
            }
        );

        return {
            message: "Workspace created successfully.",
            workspace
        };
    }

    async getUserWorkspaces(userId) {
        const workspaces =
            await workspaceRepository.findByOwner(userId);

        return {
            count: workspaces.length,
            workspaces
        };
    }

    async getWorkspace(workspaceId, userId) {
        const workspace =
            await workspaceRepository.findById(
                workspaceId
            );

        if (!workspace) {
            throw new Error("Workspace not found.");
        }

        const member =
            await workspaceRepository.findMember(
                workspaceId,
                userId
            );

        if (!member) {
            throw new Error(
                "You are not authorized to access this workspace."
            );
        }

        return workspace;
    }

    async updateWorkspace(workspaceId, userId, data) {
        const workspace =
            await workspaceRepository.findById(
                workspaceId
            );

        if (!workspace) {
            throw new Error("Workspace not found.");
        }

        if (workspace.owner_id !== userId) {
            throw new Error("Unauthorized.");
        }

        if (!data.name?.trim()) {
            throw new Error(
                "Workspace name is required."
            );
        }

        const name =
            data.name.trim();

        const duplicate =
            await workspaceRepository.findByNameAndOwner(
                name,
                userId
            );

        if (
            duplicate &&
            duplicate.id !== workspaceId
        ) {
            throw new Error(
                "Workspace name already exists."
            );
        }

        const slug =
            generateSlug(name);

        const updatedWorkspace =
            await workspaceRepository.update(
                workspaceId,
                {
                    name,
                    slug
                }
            );

        return {
            message:
                "Workspace updated successfully.",
            workspace: updatedWorkspace
        };
    }

    async deleteWorkspace(
        workspaceId,
        userId
    ) {
        const workspace =
            await workspaceRepository.findById(
                workspaceId
            );

        if (!workspace) {
            throw new Error("Workspace not found.");
        }

        if (workspace.owner_id !== userId) {
            throw new Error("Unauthorized.");
        }

        const documents =
            await documentRepository.findAll(
                workspaceId
            );

        for (const document of documents) {
            await documentService.deleteDocument(
                document.id
            );
        }

        await chatRepository.deleteMessagesByWorkspace(
            workspaceId
        );

        await chatRepository.deleteConversationsByWorkspace(
            workspaceId
        );

        await workspaceMemberRepository.deleteByWorkspace(
            workspaceId
        );

        await workspaceRepository.delete(
            workspaceId
        );

        return {
            message:
                "Workspace deleted successfully."
        };
    }

    async getRecentActivity(workspaceId) {
        const [
            documents,
            conversations,
            members
        ] = await Promise.all([
            documentRepository.getRecentDocuments(
                workspaceId
            ),
            chatRepository.getRecentConversations(
                workspaceId
            ),
            workspaceMemberRepository.getRecentMembers(
                workspaceId
            )
        ]);

        const activities = [];

        documents.forEach((document) => {
            activities.push({
                type: "DOCUMENT_UPLOAD",
                title: `${document.original_name} uploaded`,
                time: document.created_at
            });
        });

        conversations.forEach((conversation) => {
            activities.push({
                type: "CHAT",
                title:
                    conversation.title ||
                    "New Conversation",
                time: conversation.created_at
            });
        });

        members.forEach((member) => {
            activities.push({
                type: "MEMBER",
                title: `${member.users.first_name} ${member.users.last_name ?? ""} joined workspace`.trim(),
                time: member.joined_at
            });
        });

        activities.sort(
            (a, b) =>
                new Date(b.time) -
                new Date(a.time)
        );

        return activities.slice(0, 20);
    }

    async getDashboard(
        workspaceId,
        userId
    ) {
        const workspace =
            await workspaceRepository.findById(
                workspaceId
            );

        if (!workspace) {
            throw new Error("Workspace not found.");
        }

        if (workspace.owner_id !== userId) {
            throw new Error(
                "You are not authorized to access this workspace."
            );
        }

        const [
            totalDocuments,
            readyDocuments,
            processingDocuments,
            failedDocuments,
            totalConversations,
            totalMembers
        ] = await Promise.all([
            documentRepository.countDocuments(
                workspaceId
            ),
            documentRepository.countDocumentsByStatus(
                workspaceId,
                "READY"
            ),
            documentRepository.countDocumentsByStatus(
                workspaceId,
                "PROCESSING"
            ),
            documentRepository.countDocumentsByStatus(
                workspaceId,
                "FAILED"
            ),
            chatRepository.countByWorkspace(
                workspaceId
            ),
            workspaceMemberRepository.countByWorkspace(
                workspaceId
            )
        ]);

        return {
            workspace: {
                id: workspace.id,
                name: workspace.name,
                plan: workspace.plan
            },
            documents: {
                total: totalDocuments,
                ready: readyDocuments,
                processing: processingDocuments,
                failed: failedDocuments
            },
            conversations: totalConversations,
            members: totalMembers
        };
    }
}

export default new WorkspaceService();