import { MAX_FREE_COUNTS } from "@/constants";
import connectToDB from "@/database";
import UserApiLimit from "@/models/userApiLimit.model";

export const checkApiLimit = async (userId: string) => {
  try {
    await connectToDB();

    console.log("userId inside check limit music route", userId);

    const userApiLimit = await UserApiLimit.findOne({ userId });
    console.log("userapilimit inside check limit music route ", userApiLimit);

    if (
      userApiLimit &&
      userApiLimit.userId &&
      userApiLimit.count >= MAX_FREE_COUNTS
    ) {
      console.log("inside if condition check limit music route");
      return false;
    } else {
      console.log("inside else condition check limit music route");
      return true;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const increaseApiLimit = async (userId: string) => {
  try {
    await connectToDB();

    let userApiLimit = await UserApiLimit.findOne({ userId });
    // const userApiLimit = await res.json();
    //if that userapilimit exists, then update the count by incrementing by 1
    if (userApiLimit && userApiLimit.userId) {
      console.log("inside if increaseapilimit of music route");
      userApiLimit.count = userApiLimit.count + 1;
      const updatedUserApiLimit = await userApiLimit.save();
      if (updatedUserApiLimit) {
        console.log("inside if, successfull increaseapilimit of music route");
        return true;
      } else {
        console.log(
          "inside else, unsuccessfull increaseapilimit of music route"
        );
        return false;
      }
    }
    // if userapilimit doesn't exist, create a new one with count=1 and userId = current logged in userId
    else {
      console.log("inside else increaseapilimit of music route");
      const newUserApiLimit = await UserApiLimit.create({
        userId,
        count: 1,
      });
      if (newUserApiLimit) {
        console.log(
          "inside if, successfull increaseapilimit new object creation of music route"
        );
        return true;
      } else {
        console.log(
          "inside else, unsuccessfull increaseapilimit new object creation of music route"
        );
        return false;
      }
    }
  } catch (err) {
    console.log(err);
  }
};
