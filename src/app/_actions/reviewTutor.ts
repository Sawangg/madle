"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { tutorReviews } from "@db/schema";
import { db } from "@src/db";

const UpdateSchema = z.object({
  internshipId: z.string(),
  observation: z.string(),
  punctuality: z.boolean(),
});

export const insertTutorReview = async (data: { internshipId: string; observation: string; punctuality: boolean }) => {
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
