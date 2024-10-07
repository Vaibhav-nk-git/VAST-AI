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
        const { prompt, amount = 1, resolution = "512x512" } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        if (!openai.apiKey) {
            return new NextResponse("OpenAI Key configuration error", { status: 500 });
        }
        if (!prompt) {
            return new NextResponse("Prompt is required", { status: 400 });
        }
        if (!amount) {
            return new NextResponse("Amount is required", { status: 400 });
        }
        if (!resolution) {
            return new NextResponse("Resolution is required", { status: 400 });
        }
        const freeTrial = await checkApiLimit();
        const isPro = await checkSubscription();
        if(!freeTrial && !isPro){
            return new NextResponse("Free Trial exceeded", { status: 403 });
        }

        const response = await openai.images.generate({
            model: "dall-e-2",
            prompt,
            n: parseInt(amount, 10),
            size: resolution,
        });
        if(!isPro){
            await increaseApiLimit();
        }
            
        // Create an array of image URLs
        const imageUrls = response.data.map((image) => image.url);

        // Return an array of URLs
        return NextResponse.json({ images: imageUrls });
    } catch (error) {
        console.log("[IMAGE_ERROR]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
