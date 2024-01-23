import { eq, sql } from "drizzle-orm";
import { users } from "@db/schema";
import { db } from "@src/db";

export const preparedUserEmail = db
  .select()
  .from(users)
  .where(eq(users.email, sql.placeholder("email")))
  .prepare("preparedUserEmail");
