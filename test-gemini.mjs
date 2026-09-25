import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

try {
  const response = await ai.models.generateContent({
    model: process.env.GEMINI_MODEL || "gemini-3.8-flash",
    contents: "Say hello in one sentence.",
  });

  console.log("GEMINI SUCCESS:");
  console.log(response.text);
} catch (error) {
  console.error("GEMINI FAILED:");
  console.error(error);
}