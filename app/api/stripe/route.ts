import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";
import connectToDB from "@/database";
import UserSubscription from "@/models/userSubscription.model";

const settingsUrl = absoluteUrl("/settings");

export async function GET() {
  try {
    await connectToDB();
    const { userId } = auth();
    const user = await currentUser();

    // if no logged in user
    if (!userId || !user) {
      return new NextResponse("UnAuthorized", { status: 401 });
    }

    // this means a user is logged in
    const userSubscription = await UserSubscription.findOne({ userId });

    if (userSubscription && userSubscription.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: userSubscription.stripeCustomerId,
        return_url: settingsUrl,
      });

      return new NextResponse(JSON.stringify({ url: stripeSession.url }));
    }

    const stripeSession = await stripe.checkout.sessions.create({
      success_url: settingsUrl,
      cancel_url: settingsUrl,
      payment_method_types: ["card"],
      mode: "subscription",
      billing_address_collection: "auto",
      customer_email: user.emailAddresses[0].emailAddress,
      line_items: [
        {
          price_data: {
            currency: "USD",
            product_data: {
              name: "AI Helper Pro",
              description: "Unlimited AI Generations",
            },
            unit_amount: 2000,
            recurring: {
              interval: "month",
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId,
      },
    });

    return new NextResponse(JSON.stringify({ url: stripeSession.url }));
  } catch (err) {
    console.log("[STRIPE_ERROR]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
