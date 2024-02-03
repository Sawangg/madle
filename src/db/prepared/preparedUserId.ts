import { and, eq, sql } from "drizzle-orm";
import { users } from "@db/schema";
import { db } from "@src/db";

export const preparedUserId = db
  .select({
    userId: users.id,
  })
  .from(users)
  .where(and(eq(users.email, sql.placeholder("email"))))
  .prepare("preparedUserId");
