import { eq } from "drizzle-orm";
import { internships, users } from "@db/schema";
import { db } from "@src/db";

export const getAllInternshipsWithStudentName = db
  .select({
    id: internships.id,
    title: internships.title,
    dateStart: internships.dateStart,
    dateEnd: internships.dateEnd,
    company: internships.company,
    status: internships.status,
    studentFirstName: users.firstName,
    studentLastName: users.lastName,
  })
  .from(internships)
  .innerJoin(users, eq(internships.studentId, users.id))
  .prepare("getAllInternships");

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
    studentFirstName: users.firstName,
    studentLastName: users.lastName,
  })
  .from(internships)
  .leftJoin(users, eq(internships.studentId, users.id))
  .prepare("getInternshipTutorTable");
