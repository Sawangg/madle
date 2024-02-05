"use server";

import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { tutorReviews } from "@db/schema";
import { db } from "@src/db";

const UpdateSchema = z.object({
  internshipId: z.number(),
  observation: z.string(),
  punctuality: z.boolean(),
});

export const insertTutorReview = async (data: { internshipId: number; observation: string; punctuality: boolean }) => {
  const result = UpdateSchema.safeParse(data);
  if (!result.success) return { message: result.error };

  await db
    .insert(tutorReviews)
    .values({
      internshipId: data.internshipId,
      observation: data.observation,
      punctuality: data.punctuality,
    })
    .prepare("insertTutorReview")
    .execute();

  return redirect("/tutor");
};

export const getTutorReviews = (id: number) =>
  db
    .select({
      id: tutorReviews.id,
      internshipId: tutorReviews.internshipId,
      observation: tutorReviews.observation,
      punctuality: tutorReviews.punctuality,
    })
    .from(tutorReviews)
    .where(eq(tutorReviews.internshipId, id))
    .prepare("getTutorReviews")
    .execute();

export const deleteTutorReview = async (id: number) => {
  await db.delete(tutorReviews).where(eq(tutorReviews.internshipId, id)).prepare("deleteTutorReview").execute();
};
