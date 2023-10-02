import connectToDB from "@/database";
import UserApiLimit from "@/models/userApiLimit.model";
import { auth } from "@clerk/nextjs";

export const getApiLimtCount = async () => {
  await connectToDB();
  const { userId } = auth();
  if (!userId) {
    return 0;
  }
  const userApiLimit = await UserApiLimit.findOne({ userId });
  if (userApiLimit && userApiLimit.count) {
    return userApiLimit.count;
  } else {
    return 0;
  }
};
