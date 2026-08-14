import "dotenv/config"
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const analyzeIncident = async ({ title, description, location, severity }) => {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        console.error("❌ CRITICAL: GEMINI_API_KEY is missing from process.env!");
        return {
            riskLevel: severity || "Medium",
            aiSummary: description,
            tacticalRecommendations: ["Inspect site immediately and confirm status with dispatch."]
        };
    }

    // Instantiate ON CALL time to ensure process.env.GEMINI_API_KEY is present
    const ai = new GoogleGenAI({ apiKey });

    // List of primary and backup models in order of preference
    const candidateModels = [
        "gemini-3.5-flash",
        "gemini-3.1-flash-lite",
        "gemini-3.7-flash-video-understanding-eap"
    ];

    const prompt = `
        You are an automated Security Operations Center (SOC) threat evaluation engine.
         Analyze this security incident report:
      - Title: ${title}
      - Severity (Reported): ${severity}
      - Description: ${description}
      - Location: ${location}

      Return STRICTLY a JSON object with no markdown formatting or extra text:
      {
        "riskLevel": "<Low | Medium | High | Critical>",
        "aiSummary": "<1-2 sentence executive summary of the threat>",
        "tacticalRecommendations": ["<action item 1>", "<action item 2>", "<action item 3>"]
      }
        `;
    //Try each candidate model in sequence
    for (const modelName of candidateModels) {
        try {
            const response = await ai.models.generateContent({
                model: modelName,
                contents: prompt,
            });

            const cleanJsonText = response.text.replace(/```json|```/g, "").trim();
            return JSON.parse(cleanJsonText);
        } catch (error) {
            console.warn(`⚠️ Model "${modelName}" unavailable (${error.message}). Trying backup...`);
        }
    }

    console.error("❌ All AI models failed or were overloaded. Returning standard operational fallback.");
    return getFallbackResponse(description, severity);
};

// Standard operational fallback if all network requests fail
function getFallbackResponse(description, severity) {
    return {
        riskLevel: severity || "Medium",
        aiSummary: description,
        tacticalRecommendations: ["Inspect site immediately and confirm status with dispatch."]
    };
}
