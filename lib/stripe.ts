import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPT_API_KEY!, {
  apiVersion: "2023-08-16",
  typescript: true,
});
