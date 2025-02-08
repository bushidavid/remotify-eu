import { openai } from "../../../../lib/utils/openai/openai";

export default async function handler(req, res) {
    const { text } = req.body;
  
    try {
      const embeddingResponse = await openai.createEmbedding({
        model: 'text-embedding-ada-002',
        input: text,
      });
  
      const embedding = embeddingResponse.data.data[0].embedding;
      res.status(200).json({ embedding });
    } catch (error) {
      res.status(500).json({ error: 'Failed to generate embedding' });
    }
  }