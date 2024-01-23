import { and, eq, sql } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
import { tutorReviews } from "@db/schema";
import { db } from "@src/db";

export const getTutorReviewsByInternshipId = db
  .select()
  .from(tutorReviews)
  .where(and(eq(tutorReviews.internshipId, sql.placeholder("internshipId"))))
  .prepare("getTutorReviewsByInternship");

export const insertTutorReview = (internshipId: string, observation: string, punctuality: boolean) => {
  const id: string = uuidv4();
  return db
    .insert(tutorReviews)
    .values({
      id: id,
      internshipId: internshipId,
      observation: observation,
      punctuality: punctuality,
    })
    .returning()
    .prepare("insertTutorReview");
};
