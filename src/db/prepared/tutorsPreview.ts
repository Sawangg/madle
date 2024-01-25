import { tutorReviews } from "@db/schema";
import { db } from "@src/db";
import { eq } from "drizzle-orm";

export const getAllTutorsPreview = db.select().from(tutorReviews).prepare("getAllTutorsPreview");

export const getTutorPreviewById = (id: string) =>
  db
    .select()
    .from(tutorReviews)
    .where(eq(tutorReviews.internshipId, id))
    .prepare("getTutorPreviewById");
