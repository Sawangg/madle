import { eq, sql } from "drizzle-orm";
import { internships, users } from "@db/schema";
import { db } from "@src/db";

export const getAllInternships = db.select().from(internships).prepare("getAllInternships");

export const updateInternshipStatus = db
  .update(internships)
  .set({ status: sql`?` })
  .where(eq(internships.id, sql`?`))
  .prepare("updateInternshipStatus");

export const getInternshipTutorTable = db
  .select({
    id: internships.id,
    title: internships.title,
    dateStart: internships.dateStart,
    dateEnd: internships.dateEnd,
    company: internships.company,
    status: internships.status,
    studentId: internships.studentId,
    studentName: users.name,
  })
  .from(internships)
  .leftJoin(users, eq(internships.studentId, users.id))
  .prepare("getInternshipTutorTable");
