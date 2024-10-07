import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

import { increaseApiLimit,checkApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const instructionMessage:ChatCompletionMessageParam={
    role:"assistant",
    content:"You are a code generator and explainer. You must first provide basic context about the answer for the codeing question prompt and then print code only in markdown code snippets when you are asked questions regarding code. Use code comments for explanations, then explain the code normally by text."
}

export async function POST(req: Request) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { messages } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        if (!openai.apiKey) {
            return new NextResponse("OpenAI Key configuration error", { status: 500 });
        }
        if (!messages || messages.length === 0) {
            return new NextResponse("Messages are required", { status: 400 });
        }
        
        const freeTrial = await checkApiLimit();
        const isPro = await checkSubscription();
        if(!freeTrial && !isPro){
            return new NextResponse("Free Trial exceeded", { status: 403 });
        }

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages:[instructionMessage,...messages]
        });
        
        if(!isPro){
            await increaseApiLimit();
        }

        const completion = response.choices[0]?.message?.content || "No response";

        return NextResponse.json({ response: completion });
    } catch (error) {
        console.log("[CODE_ERROR]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
