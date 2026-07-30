import documentRepository from "../repositories/document.repository.js";
import { serializeBigInt } from "../utils/slug.js";
import ragProcessor from "../ai/rag.processor.js";
import { v4 as uuid } from "uuid";

class DocumentService {

    async uploadDocument(userId, workspaceId, file) {

        const extension =
            file.originalname.split(".").pop().toUpperCase();

        const document = await documentRepository.create({
            id: uuid(),
            workspace_id: workspaceId,
            uploaded_by: userId,
            original_name: file.originalname,
            stored_name: file.filename,
            file_type: extension,
            file_size: BigInt(file.size),
            storage_path: file.path,
            status: "UPLOADING"
        });
        await ragProcessor.process(document);
        return {
            message: "Document uploaded successfully.",
            document: serializeBigInt(document)
        };

    }

}

export default new DocumentService();