import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import OpenAI from "openai";

import { increaseApiLimit,checkApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

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
            messages: messages,
        });

        if(!isPro){
            await increaseApiLimit();
        }

        const completion = response.choices[0]?.message?.content || "No response";

        return NextResponse.json({ response: completion });
    } catch (error) {
        console.log("[CONVERSATIONAL_ERROR]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
