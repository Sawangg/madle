"use server";

import { preparedUserEmail } from "@db/prepared/preparedUserEmail";

export const isAdmin = async (email: string) => {
  const user = await preparedUserEmail.execute({ email });
  if (!user[0]) return false;
  return user[0].role === "admin";
};
