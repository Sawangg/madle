import { and, eq, sql } from "drizzle-orm";
import { users } from "@db/schema";
import { db } from "@src/db";

export const preparedUserPassword = db
  .select()
  .from(users)
  .where(and(eq(users.email, sql.placeholder("email")), eq(users.password, sql.placeholder("password"))))
  .prepare("preparedUserPassword");
