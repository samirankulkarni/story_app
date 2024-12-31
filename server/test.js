import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();
const PORT = 7000;

// Initialize Google Generative AI
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
    console.error("GEMINI_API_KEY environment variable is not set!");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

// Endpoint to handle requests
app.get("/", async (req, res) => {
    const { gender, topic } = req.query;

    // Validate query parameters
    if (!gender || !topic) {
        return res.status(400).send("Please provide both 'gender' and 'topic' parameters.");
    }

    try {
        // Set system instruction dynamically based on gender
        const systemInstructionString = `You are a grandmother of a ${gender === "son" ? "son" : "daughter"}. You are from India. You need to tell a bedtime story.`;

        // Get the generative model with the updated system instruction
        const model = genAI.getGenerativeModel({
            model: "gemini-2.0-flash-exp",
            systemInstruction: systemInstructionString
        });

        // Generate the story using the provided topic
        const prompt = `Tell a fun story on the topic: ${topic}`;
        const result = await model.generateContent(prompt);

        // Send the generated story as a response
        res.status(200).send(result.response.text());
    } catch (error) {
        console.error("Error generating story:", error);
        res.status(500).send("An error occurred while generating the story.");
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
