import recursiveChunker
from "../chunkers/recursive.chunker.js";

class ChunkStage {

    async execute(context) {

        context.chunks =
            await recursiveChunker.chunk(
                context.text
            );

    }

}

export default new ChunkStage();