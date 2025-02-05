import supabase from '../../../../lib/config/supabaseClient';
import { openai } from '../../utils/openai';
import { upsertEmbedding } from '../../../../lib/utils/pinecone/upsertEmbeddings';

export default async function handler(req, res) {
  try {
    // 1. Fetch job descriptions from PostgreSQL
    const {data: jobs, error} = await supabase
        .from('job')
        .select('*');

    // 2. Generate embeddings for each job
    const jobEmbeddings = await Promise.all(jobs.map(async (job) => {
        const response = await openai.createEmbedding({
            model: 'text-embedding-ada-002',
            input: `${job.title} ${job.description}`,
        });

        return {
            id: job.id,
            embedding: response.data.data[0].embedding,
        };
    }));

    // 3. Upsert embeddings into Pinecone
    for (const job of jobEmbeddings) {
        await upsertEmbedding(job.id, job.embedding);
    }

    res.status(200).json({ message: 'Job embeddings processed and stored' });
    
  } catch (error) {
        console.error('Error processing jobs:', error);
        res.status(500).json({ error: 'Internal server error' });
  }
}
