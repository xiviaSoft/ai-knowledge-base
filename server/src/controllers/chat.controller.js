import { getWikipediaData } from "../services/wikipedia.service.js";
import { generateAnswer } from "../services/gemini.service.js";

export const chatController = async (req, res) => {
    try {
        const { question } = req.body;

        if (!question || question.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Question is required."
            });
        }

        const start = Date.now();

        // Fetch Wikipedia data
        const wiki = await getWikipediaData(question);

        if (!wiki.success) {
            return res.status(404).json({
                success: false,
                message: wiki.message
            });
        }

        // Generate AI response
        const answer = await generateAnswer(
            question,
            wiki.summary
        );

        const end = Date.now();

        return res.status(200).json({
            success: true,
            question,
            title: wiki.title,
            description: wiki.description,
            image: wiki.image,
            source: wiki.url,
            sourceType: "Wikipedia",
            answer,
            processingTime: `${end - start} ms`
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};