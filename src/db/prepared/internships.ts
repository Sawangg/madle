
import { eq, sql } from "drizzle-orm";
import { internships, users } from "@db/schema";

import { db } from "@src/db";

export const getAllInternships = db.select().from(internships).prepare("getAllInternships");

export const updateInternshipStatus = (status: "In progress" | "Pending" | "Ended", id: string) =>
  db.update(internships).set({ status }).where(eq(internships.id, id)).prepare("updateInternshipStatus");

export const getInternshipTutorTable = db
  .select({
    id: internships.id,
    title: internships.title,
    dateStart: internships.dateStart,
    dateEnd: internships.dateEnd,
    company: internships.company,
    status: internships.status,
    studentId: internships.studentId,
    studentFirstName: users.first_name,
    studentLastName: users.last_name,
  })
  .from(internships)
  .leftJoin(users, eq(internships.studentId, users.id))
  .prepare("getInternshipTutorTable");