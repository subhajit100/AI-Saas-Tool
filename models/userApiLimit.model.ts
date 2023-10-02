import { Schema, model, models } from "mongoose";

const userApiLimitSchema = new Schema(
  {
    userId: { type: String, unique: true, required: true },
    count: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const UserApiLimit =
  models.UserApiLimit || model("UserApiLimit", userApiLimitSchema);

export default UserApiLimit;
