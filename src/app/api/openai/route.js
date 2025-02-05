import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from 'ai'
import { NextResponse } from "next/server";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || '',
});

export async function POST(req) {

    const { message } = await req.json();
    console.log("message: ", message);

    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: "You are a helpful assistant." },
            {
                role: "user",
                content: "Say Hello",
            },
        ],
    });
    
    console.log("Open AI response from API route: ", completion.choices[0].message);

    return NextResponse.json({ok: true, message: completion.choices[0].message});

}
