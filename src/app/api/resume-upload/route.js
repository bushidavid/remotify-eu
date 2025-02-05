import PDFParser from "pdf2json"; 
import mammoth from 'mammoth';
import { upsertEmbedding } from '../../../../lib/utils/pinecone/upsertEmbeddings';
import { openai } from '../../../../lib/utils/openai/openai';
import { v4 as uuidv4 } from 'uuid';  // Generate unique IDs for each resume

export async function POST(req, res) {

    console.log("inside API upload resume");

    const file = await req.json(); 

    console.log("loggin file", file);

    if (!file) {
        console.log("no file uploaded");
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const pdfParser = new PDFParser;

    pdfParser.on('pdfParser_dataError', (errData) =>
        console.log(errData.parserError)
        );

    pdfParser.on('pdfParser_dataReady', () => {
        console.log(pdfParser.getRawTextContent());
        parsedText = pdfParser.getRawTextContent();
    });

    pdfParser.loadPDF(file);

    console.log("parsed Text", parsedText);

    

    // 2. Generate an embedding for the extracted text
//     const embeddingResponse = await openai.createEmbedding({
//             model: 'text-embedding-ada-002',
//             input: parsedText,
//     });

    const embedding = embeddingResponse.data.data[0].embedding;

    // 3. Upsert the embedding into Pinecone with a unique ID
    const resumeId = uuidv4();  // Unique ID for the resume
    await upsertEmbedding(resumeId, embedding);

    res.status(200).json({ resumeId, embedding, text });
}
