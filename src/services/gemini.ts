import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function analyzeFraudPattern(text: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze the following text for potential fraud patterns (scams, MLM, investment fraud). 
      Provide a risk score from 0 to 100, a summary of findings, and specific red flags detected.
      Text: "${text}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            riskScore: { type: Type.NUMBER, description: "Risk score from 0 to 100" },
            summary: { type: Type.STRING, description: "Summary of the analysis" },
            redFlags: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "List of red flags detected"
            },
            fraudType: { type: Type.STRING, description: "Type of fraud suspected (e.g., Ponzi, Phishing, MLM)" }
          },
          required: ["riskScore", "summary", "redFlags", "fraudType"]
        }
      }
    });

    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return {
      riskScore: 0,
      summary: "Analysis failed due to an error.",
      redFlags: [],
      fraudType: "Unknown"
    };
  }
}
