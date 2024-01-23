import { and, eq, sql } from "drizzle-orm";
import { tutorReviews } from "@db/schema";
import { db } from "@src/db";

export const getTutorReviewsByInternship = db
  .select()
  .from(tutorReviews)
  .where(and(eq(tutorReviews.internshipId, sql.placeholder("internshipId"))))
  .prepare("getTutorReviewsByInternship");
