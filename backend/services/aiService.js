import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const analyzeIncident = async ({ title, description, location, severity }) => {
    try {
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

        const response = await ai.models.generateContent({
            model: "gemini-3.5-flash",
            contents: prompt,
        });

        const cleanJsonText = response.text.replace(/```json|```/g, "").trim();
        return JSON.parse(cleanJsonText);
    } catch (error) {
        console.error("AI Service Error:", error.message);

        return {
            riskLevel: severity || "Medium",
            aiSummary: description,
            tacticalRecommendations: ["Inspect site immediately and confirm status with dispatch."]
        };
    }
};