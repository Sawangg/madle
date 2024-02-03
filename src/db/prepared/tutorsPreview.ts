import { eq } from "drizzle-orm";
import { tutorReviews } from "@db/schema";
import { db } from "@src/db";

export const getAllTutorsPreview = db.select().from(tutorReviews).prepare("getAllTutorsPreview");

export const getTutorPreviewById = (id: number) =>
  db.select().from(tutorReviews).where(eq(tutorReviews.internshipId, id)).prepare("getTutorPreviewById");
