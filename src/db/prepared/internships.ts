import { eq } from "drizzle-orm";
import { companies, internships, users } from "@db/schema";
import { db } from "@src/db";

export const getAllInternshipsWithStudentName = db
  .select({
    id: internships.id,
    title: internships.title,
    dateStart: internships.dateStart,
    dateEnd: internships.dateEnd,
    company: companies.name,
    status: internships.status,
    studentFirstName: users.firstName,
    studentLastName: users.lastName,
  })
  .from(internships)
  .innerJoin(users, eq(internships.studentId, users.id))
  .innerJoin(companies, eq(internships.companyId, companies.id))
  .prepare("getAllInternships");

export const getInternshipByIdWithStudentName = (id: string) =>
  db
    .select({
      id: internships.id,
      title: internships.title,
      dateStart: internships.dateStart,
      dateEnd: internships.dateEnd,
      company: companies.name,
      status: internships.status,
      studentFirstName: users.firstName,
      studentLastName: users.lastName,
    })
    .from(internships)
    .innerJoin(users, eq(internships.studentId, users.id))
    .innerJoin(companies, eq(internships.companyId, companies.id))
    .where(eq(internships.id, id))
    .prepare("getInternshipById");

export const getInternshipTutorTable = db
  .select({
    id: internships.id,
    title: internships.title,
    dateStart: internships.dateStart,
    dateEnd: internships.dateEnd,
    company: companies.name,
    status: internships.status,
    studentId: internships.studentId,
    studentFirstName: users.firstName,
    studentLastName: users.lastName,
  })
  .from(internships)
  .leftJoin(users, eq(internships.studentId, users.id))
  .innerJoin(companies, eq(internships.companyId, companies.id))
  .prepare("getInternshipTutorTable");

export const getInternshipTutorTableByTutorId = (id: string) =>
  db
    .select({
      id: internships.id,
      title: internships.title,
      dateStart: internships.dateStart,
      dateEnd: internships.dateEnd,
      company: companies.name,
      status: internships.status,
      studentId: internships.studentId,
      tutorId: internships.tutorId,
      studentFirstName: users.firstName,
      studentLastName: users.lastName,
    })
    .from(internships)
    .innerJoin(users, eq(internships.studentId, users.id))
    .innerJoin(companies, eq(internships.companyId, companies.id))
    .where(eq(internships.tutorId, id))
    .prepare("getInternshipTutorTableByTutorId");

export const getInternshipStudentTableByStudentId = (id: string) =>
  db
    .select({
      title: internships.title,
      dateStart: internships.dateStart,
      dateEnd: internships.dateEnd,
      company: companies.name,
      contactEmail: users.email,
    })
    .from(internships)
    .innerJoin(users, eq(internships.tutorId, users.id))
    .innerJoin(companies, eq(internships.companyId, companies.id))
    .where(eq(internships.studentId, id))
    .prepare("getInternshipStudentTableByStudentId");
