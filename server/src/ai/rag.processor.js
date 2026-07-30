import chunkRepository from "../repositories/chunk.repository.js";
import chunkService from "./chunk.service.js";
import pdfService from "./pdf.service.js";
import { v4 as uuid } from "uuid";

class RagProcessor {

    async process(document) {

        let text = "";

        if (document.file_type === "PDF") {

            text = await pdfService.extractText(
                document.storage_path
            );

        }

        const chunks =
            await chunkService.split(text);

        console.log(chunks.length);
        console.log(text);

        await chunkRepository.createMany(

            chunks.map((chunk, index) => ({

                id: uuid(),

                document_id: document.id,

                chunk_index: index,

                content: chunk.pageContent

            }))

        );

    }

}

export default new RagProcessor();