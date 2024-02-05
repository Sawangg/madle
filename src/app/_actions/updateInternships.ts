"use server";

import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { deleteTutorReview, getTutorReviews } from "@actions/reviewTutor";
import { companies, internships } from "@db/schema";
import { db } from "@src/db";

const UpdateSchema = z.object({
  id: z.number(),
  status: z.enum(["pending", "inprogress", "ended"]),
});

export const updateInternshipStatus = async (data: { id: number; status: string }) => {
  const result = UpdateSchema.safeParse(data);
  if (!result.success) return { message: result.error };

  const { id, status } = result.data;
  await db
    .update(internships)
    .set({ status })
    .where(eq(internships.id, id))
    .prepare("updateInternshipStatus")
    .execute();
  return redirect("/admin");
};

export const deleteInternshipById = async (internshipId: number) => {
  const companyId = await getInternshipCompanyId(internshipId);
  if (typeof companyId[0].id !== "undefined") {
    const tutorReviews = await getTutorReviews(internshipId);
    if (tutorReviews.length > 0) {
      await deleteTutorReview(internshipId);
    }
    await db.delete(companies).where(eq(companies.id, companyId[0].id)).prepare("deleteCompany").execute();
    await db.delete(internships).where(eq(internships.id, internshipId)).prepare("deleteInternship").execute();
  }
  return redirect("/admin");
};

export const getInternshipCompanyId = (id: number) =>
  db
    .select({ id: internships.companyId })
    .from(internships)
    .where(eq(internships.id, id))
    .prepare("getInternshipCompanyId")
    .execute();
