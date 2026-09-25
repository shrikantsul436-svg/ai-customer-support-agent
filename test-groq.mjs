import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

import { ChatGroq } from "@langchain/groq";

const model = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY,
  model: process.env.GROQ_MODEL || "openai/gpt-oss-20b",
  temperature: 0,
});

try {
  const response = await model.invoke(
    "Say hello in one short sentence."
  );

  console.log("GROQ SUCCESS:");
  console.log(response.content);
} catch (error) {
  console.error("GROQ FAILED:");
  console.error(error);
}