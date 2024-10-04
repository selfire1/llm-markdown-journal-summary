import ollama from "ollama";
import { CONFIG } from "./config";

export async function summariseEntry(input: string) {
  const schema = {
    title: {
      type: "string",
      description:
        "A succinct and descriptive title that captures the key points of the entry",
    },
    summary: {
      type: "string",
      description:
        "A three sentence overview of the main theme and key details of the diary entry, highlighting the significant aspects of the entry in a concise manner.",
    },
  };

  const system = CONFIG.prompt.system;

  const promptText = CONFIG.prompt.text;

  const prompt = `${promptText}. Output should be in JSON.

Entry: ${input}

Schema: ${JSON.stringify(schema, null, 2)}
`;

  const newResponse = await ollama.chat({
    model: "llama3.1",
    messages: [
      { role: "system", content: system },
      { role: "user", content: prompt },
    ],
    format: "json",
    stream: false,
  });
  return newResponse.message.content;
}
