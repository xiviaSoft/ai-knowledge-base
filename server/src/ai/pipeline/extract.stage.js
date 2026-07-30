import pdfExtractor from "../extractors/pdf.extractor.js";
import docxExtractor from "../extractors/docx.extractor.js";
import txtExtractor from "../extractors/txt.extractor.js";

class ExtractStage {

    async execute(context) {

        switch (context.document.file_type) {

            case "PDF":
                context.text =
                    await pdfExtractor.extract(
                        context.document.storage_path
                    );
                break;

            case "DOCX":
                context.text =
                    await docxExtractor.extract(
                        context.document.storage_path
                    );
                break;

            case "TXT":
                context.text =
                    await txtExtractor.extract(
                        context.document.storage_path
                    );
                break;

            default:
                throw new Error("Unsupported document type.");
        }

    }

}

export default new ExtractStage();