import crypto from "crypto";
import { randomUUID } from "crypto";
import apiKeyRepository from "../repositories/apiKey.repository.js";
import workspaceRepository from "../repositories/workspace.repository.js";

class ApiKeyService {

    async createApiKey(workspaceId, name) {

        const workspace = await workspaceRepository.findById(workspaceId);

        if (!workspace) {

            throw new Error("Workspace not found.");

        }

        const apiKey =
            "rag_sk_" + crypto.randomBytes(32).toString("hex");

        const created =
            await apiKeyRepository.create({

                id: randomUUID(),

                workspace_id: workspaceId,

                name,

                key: apiKey

            });

        return {

            id: created.id,

            name: created.name,

            key: created.key,

            created_at: created.created_at

        };

    }

    async getApiKeys(workspaceId) {

        return await apiKeyRepository.findAll(

            workspaceId

        );

    }

    async deleteApiKey(keyId) {

        const apiKey =
            await apiKeyRepository.findById(

                keyId

            );

        if (!apiKey) {

            throw new Error("API Key not found.");

        }

        await apiKeyRepository.delete(

            keyId

        );

        return {

            message: "API Key deleted successfully."

        };

    }

}

export default new ApiKeyService();