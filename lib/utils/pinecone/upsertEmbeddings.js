import { index } from "./pinecone";

export async function upsertEmbedding(id, embedding) {
    await index.upsert([{ id, values: embedding }]);
  }