import { redirect } from "next/navigation";
import { and, eq, sql } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import { tutorReviews } from "@db/schema";
import { db } from "@src/db";

const UpdateSchema = z.object({
  internshipId: z.string().uuid(),
  observation: z.string(),
  punctuality: z.boolean(),
});

export const getTutorReviewsByInternshipId = db
  .select()
  .from(tutorReviews)
  .where(and(eq(tutorReviews.internshipId, sql.placeholder("internshipId"))))
  .prepare("getTutorReviewsByInternship");

export const insertTutorReview = async (data: { internshipId: string; observation: string; punctuality: boolean }) => {
  const result = UpdateSchema.safeParse(data);
  if (!result.success) return { message: result.error };

  const id: string = uuidv4();
  await db
    .insert(tutorReviews)
    .values({
      id: id,
      internshipId: data.internshipId,
      observation: data.observation,
      punctuality: data.punctuality,
    })
    .prepare("insertTutorReview")
    .execute();
  return redirect("/tutor");
};
