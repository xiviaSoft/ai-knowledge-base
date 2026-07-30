import extractStage from "../pipeline/extract.stage.js";
import chunkStage from "../pipeline/chunk.stage.js";
import embeddingStage from "../pipeline/embedding.stage.js";
import vectorStage from "../pipeline/vector.stage.js";
import statusStage from "../pipeline/status.stage.js";

class DocumentProcessor {

    async process(document) {

        const context = {
            document,
            text: "",
            chunks: [],
            vectors: []
        };

        try {

            await extractStage.execute(context);
            await chunkStage.execute(context);
            await embeddingStage.execute(context);
            await vectorStage.execute(context);

            await documentRepository.updateStatus(
                document.id,
                "READY"
            );

        } catch (error) {

            await documentRepository.updateStatus(
                document.id,
                "FAILED"
            );

            throw error;
        }
    }

}

export default new DocumentProcessor();