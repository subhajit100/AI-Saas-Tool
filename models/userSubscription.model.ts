
import { Schema, models, model } from "mongoose";

const userSubscriptionSchema = new Schema({
  userId: { type: String, unique: true, required: true },
  stripeCustomerId: { type: String, unique: true },
  stripeSubscriptionId: { type: String, unique: true },
  stripePriceId: { type: String },
  stripeCurrentPeriodEnd: { type: Date },
});

const UserSubscription =
  models.UserSubscription || model("UserSubscription", userSubscriptionSchema);

export default UserSubscription;
