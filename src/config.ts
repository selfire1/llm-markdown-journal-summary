export const CONFIG = {
  prompt: {
    system: `You are an AI trained in creating high-quality, succinct summaries of journal entries that give context at a single glance. You will be given a text along with a prompt and a schema. You will have to extract the information requested in the prompt from the text and generate output in JSON observing the schema provided. A string should always be a valid string. Each field must have a value. Output the JSON with extra spaces to ensure that it pretty prints.`,
    text: `The source text is a journal entry. Respond with data according to the schema. Be concise and specific. The title must not exceed 30 characters. The summary must not be longer than two sentences. Write in the first person.`,
  },
};
