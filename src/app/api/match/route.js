import { index } from "../../../../lib/utils/pinecone/pinecone";

export default async function POST(req, res) {

    const { resumeEmbedding } = req.body;
  
    // Optional: Trigger reprocessing of jobs (run less frequently)
    await fetch('/api/process-jobs', { method: 'POST' });
  
    const result = await index.query({
        topK: 5,
        vector: resumeEmbedding,
    });
  
    const matches = result.matches.map((match) => ({
        id: match.id,
        score: (match.score * 100).toFixed(2),
    }));
  
    res.status(200).json({ matches });
  }