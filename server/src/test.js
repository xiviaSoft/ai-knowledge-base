import dotenv from "dotenv";
import { Pinecone } from "@pinecone-database/pinecone";

dotenv.config();

async function testPinecone() {

    const pinecone = new Pinecone({
        apiKey: process.env.PINECONE_API_KEY
    });
console.log(pinecone)
    try {

        const index = pinecone.index(
            process.env.PINECONE_INDEX
        );

        console.log(
            "Index:",
            process.env.PINECONE_INDEX
        );

        const stats =
            await index.describeIndexStats();

        console.log(
            "Index stats:",
            JSON.stringify(stats, null, 2)
        );

    } catch (error) {

        console.error(
            "Index request failed:"
        );

        console.error(error);

    }

}

testPinecone();