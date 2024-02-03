"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { getUserId } from "@actions/getUserId";
import { companies, internships } from "@db/schema";
import { db } from "@src/db";

const AddInternshipSchema = z.object({
  companyName: z.string(),
  companyAddress: z.string(),
  companyCity: z.string(),
  companyPostalCode: z.number(),
  contactName: z.string(),
  contactEmail: z.string(),
  dateStart: z.string(),
  dateEnd: z.string(),
  title: z.string(),
  studentId: z.string(),
});

export const addInternship = async (data: {
  companyName: string;
  companyAddress: string;
  companyCity: string;
  companyPostalCode: number;
  contactName: string;
  contactEmail: string;
  dateStart: string;
  dateEnd: string;
  title: string;
  studentId: string;
}) => {
  const result = AddInternshipSchema.safeParse(data);
  if (!result.success) return { message: result.error };

  const insertCompanyResult = await db
    .insert(companies)
    .values({
      name: result.data.companyName,
      address: result.data.companyAddress,
      city: result.data.companyCity,
      postalCode: Number(result.data.companyPostalCode),
    })
    .returning({ insertedId: companies.id });
  const insertedCompanyId = insertCompanyResult[0].insertedId;

  const tutorId = await getUserId(result.data.contactEmail);

  await db.insert(internships).values({
    companyId: insertedCompanyId,
    dateStart: new Date(result.data.dateStart),
    dateEnd: new Date(result.data.dateEnd),
    status: "pending",
    title: result.data.title,
    studentId: result.data.studentId,
    tutorId: tutorId,
  });

  return redirect("/student");
};
