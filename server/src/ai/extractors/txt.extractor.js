import fs from "fs/promises";

class TXTExtractor {

    async extract(filePath) {

        return fs.readFile(
            filePath,
            "utf8"
        );

    }

}

export default new TXTExtractor();