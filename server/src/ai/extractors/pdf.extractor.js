import fs from "fs";
import pdf from "pdf-parse";

class PDFExtractor {

    async extract(filePath) {

        const buffer = fs.readFileSync(filePath);

        const data = await pdf(buffer);

        return data.text;

    }

}

export default new PDFExtractor();