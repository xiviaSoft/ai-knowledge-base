import fs from "fs";
import mammoth from "mammoth";

class DOCXExtractor {

    async extract(filePath) {

        const result =
            await mammoth.extractRawText({

                buffer:
                    fs.readFileSync(filePath)

            });

        return result.value;

    }

}

export default new DOCXExtractor();