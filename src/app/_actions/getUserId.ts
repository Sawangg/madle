"use server";

import { preparedUserId } from "@db/prepared/preparedUserId";

export const getUserId = async (email: string) => {
  const userIdResult = await preparedUserId.execute({
    email,
  });
  return userIdResult[0].userId;
};
