import { eq } from "drizzle-orm";
import { users } from "@db/schema";
import { db } from "@src/db";

export const preparedTutorsList = db
  .select({
    userId: users.id,
    username: users.username,
    email: users.email,
  })
  .from(users)
  .where(eq(users.role, "tutor"))
  .prepare("preparedTutorsList");
