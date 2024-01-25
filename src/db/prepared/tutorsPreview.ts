import { tutorReviews } from "@db/schema";
import { db } from "@src/db";

export const getAllTutorsPreview = db.select().from(tutorReviews).prepare("getAllTutorsPreview");
