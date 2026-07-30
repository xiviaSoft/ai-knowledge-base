import { v4 as uuid } from "uuid";
import prisma from "../config/prisma.js";
import workspaceRepository from "../repositories/workspace.repository.js";
import { generateSlug } from "../utils/slug.js";

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

        const workspace = await prisma.$transaction(async (tx) => {

            const newWorkspace = await tx.workspaces.create({
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

        });

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

    async getWorkspaceById(workspaceId, userId) {

        const workspace =
            await workspaceRepository.findById(workspaceId);

        if (!workspace) {
            throw new Error("Workspace not found.");
        }

        if (workspace.owner_id !== userId) {
            throw new Error("You are not authorized to access this workspace.");
        }

        return workspace;

    }

    async updateWorkspace(workspaceId, userId, data) {

        const workspace =
            await workspaceRepository.findById(workspaceId);

        if (!workspace) {
            throw new Error("Workspace not found.");
        }

        if (workspace.owner_id !== userId) {
            throw new Error("Unauthorized.");
        }

        const duplicate =
            await workspaceRepository.findByNameAndOwner(
                data.name,
                userId
            );

        if (duplicate && duplicate.id !== workspaceId) {
            throw new Error("Workspace name already exists.");
        }

        const slug = generateSlug(data.name);

        const updatedWorkspace =
            await workspaceRepository.update(
                workspaceId,
                {
                    name: data.name,
                    slug
                }
            );

        return {
            message: "Workspace updated successfully.",
            workspace: updatedWorkspace
        };

    }
    
    async deleteWorkspace(workspaceId, userId) {

        const workspace =
            await workspaceRepository.findById(workspaceId);

        if (!workspace) {
            throw new Error("Workspace not found.");
        }

        if (workspace.owner_id !== userId) {
            throw new Error("Unauthorized.");
        }

        await workspaceRepository.delete(workspaceId);

        return {
            message: "Workspace deleted successfully."
        };

    }
}

export default new WorkspaceService();