import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Replicate from "replicate";
import { checkApiLimit, increaseApiLimit } from "../constants";
import { checkSubscription } from "@/lib/subscription";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt } = body;
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!prompt) {
      return new NextResponse("Prompt is required", { status: 400 });
    }

    console.log("before freetrial in route music");
    // TODO:- updating the code inside part of checkApiLimit as other alternatives are not working, refactor if this workks
    const freeTrial = await checkApiLimit(userId);
    const isPro = await checkSubscription();

    if (!freeTrial && !isPro) {
      return new NextResponse(
        "Free Trial has expired! Please upgrade to pro.",
        { status: 403 }
      );
    }

    const response = await replicate.run(
      "riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05",
      {
        input: {
          prompt_a: prompt,
        },
      }
    );

    if (!isPro) {
      const successfulIncApiLimit = await increaseApiLimit(userId);
      if (!successfulIncApiLimit) {
        return new NextResponse(
          "Something went wrong while increasing api limit",
          { status: 500 }
        );
      }
    }

    return NextResponse.json(response, { status: 200 });
  } catch (err) {
    console.log("[MUSIC_ERROR]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
