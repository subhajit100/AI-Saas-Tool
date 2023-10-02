import connectToDB from "@/database";
import UserSubscription from "@/models/userSubscription.model";
import { auth } from "@clerk/nextjs";

const DAY_IN_MS = 86_400_000;

export const checkSubscription = async () => {
  await connectToDB();
  const { userId } = auth();

  if (!userId) {
    return false;
  }

  const userSubscription = await UserSubscription.findOne({ userId }).select({
    stripeCustomerId: 1,
    stripeSubscriptionId: 1,
    stripePriceId: 1,
    stripeCurrentPeriodEnd: 1,
  });

  if (!userSubscription) {
    return false;
  }

  const isValid =
    userSubscription.stripePriceId &&
    userSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS >
      Date.now();

  return !!isValid; // returns always a boolean value
};
