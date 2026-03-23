
import { NextResponse } from "next/server";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage } from "@langchain/core/messages";

export async function POST(req: Request) {
    try {
        const { prompt, language } = await req.json();

        const model = new ChatGoogleGenerativeAI({
            model: "gemini-3-flash-preview",
            apiKey: process.env.GOOGLE_API_KEY,
            temperature: 0.7,
        });

        const response = await model.invoke([
            new HumanMessage(`Generate a ${language} code snippet for: ${prompt}`)
        ]);

        return NextResponse.json({
            code: response.content,
            language,
            source: "AI"
        });
    } catch (error) {
        console.error("Error generating code:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
