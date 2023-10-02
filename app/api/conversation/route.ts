import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { checkApiLimit, increaseApiLimit } from "../constants";
import { checkSubscription } from "@/lib/subscription";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_APIKEY,
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages } = body;
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!messages) {
      return new NextResponse("Messages are required", { status: 400 });
    }

    const freeTrial = await checkApiLimit(userId);
    const isPro = await checkSubscription();
    if (!freeTrial && !isPro) {
      return new NextResponse(
        "Free Trial has expired! Please upgrade to pro.",
        { status: 403 }
      );
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
    });

    if (!isPro) {
      const successfulIncApiLimit = await increaseApiLimit(userId);
      if (!successfulIncApiLimit) {
        return new NextResponse(
          "Something went wrong while increasing api limit",
          { status: 500 }
        );
      }
    }
    return NextResponse.json(response.choices[0].message, { status: 200 });
  } catch (err) {
    console.log("[CONVERSATION_ERROR]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
