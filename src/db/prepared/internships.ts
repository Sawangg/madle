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

export const getInternshipByIdWithStudentName = (id: string) =>
  db
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
    .where(eq(internships.id, id))
    .prepare("getInternshipById");

export const getInternshipTutorTableByTutorId = (id: string) =>
  db
    .select({
      id: internships.id,
      title: internships.title,
      dateStart: internships.dateStart,
      dateEnd: internships.dateEnd,
      company: internships.company,
      status: internships.status,
      studentId: internships.studentId,
      tutorId: internships.tutorId,
      studentFirstName: users.firstName,
      studentLastName: users.lastName,
    })
    .from(internships)
    .innerJoin(users, eq(internships.studentId, users.id))
    .where(eq(internships.tutorId, id))
    .prepare("getInternshipTutorTableByTutorId");
