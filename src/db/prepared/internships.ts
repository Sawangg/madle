import { eq } from "drizzle-orm";
import { internships } from "@db/schema";
import { db } from "@src/db";

export const getAllInternships = db.select().from(internships).prepare("getAllInternships");

export const updateInternshipStatus = (status: "In progress" | "Pending" | "Ended", id: string) =>
  db.update(internships).set({ status }).where(eq(internships.id, id)).prepare("updateInternshipStatus");
