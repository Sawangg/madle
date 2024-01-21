import { eq, sql } from "drizzle-orm";
import { internships } from "@db/schema";
import { db } from "@src/db";

export const getAllInternships = db.select().from(internships).prepare("getAllInternships");

export const updateInternshipStatus = db
  .update(internships)
  .set({ status: sql`?` })
  .where(eq(internships.id, sql`?`))
  .prepare("updateInternshipStatus");
