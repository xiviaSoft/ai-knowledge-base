import OpenAI from "openai";
import { env } from "./env.js";

const openai = new OpenAI({
    apiKey: env.OPENAI_API_KEY,
});
const options = {
    definition: {
        openapi: "3.0.0",
    },
    info: {

        title: "AI Knowledge Base API",

        version: "1.0.0",

        description: "Backend API for AI Knowledge Base"

    }
}

export default openai;