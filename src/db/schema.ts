import { boolean, integer, pgEnum, pgTable, primaryKey, serial, text, timestamp, uuid } from "drizzle-orm/pg-core";

// Auth tables
export const userRoles = pgEnum("role", ["student", "tutor", "admin"]);
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  username: text("username"),
  firstName: text("first_name"),
  lastName: text("last_name"),
  email: text("email").notNull(),
  emailVerified: timestamp("email_verified", { mode: "date" }),
  image: text("image"),
  password: text("password"),
  role: userRoles("role"),
});

export const accounts = pgTable(
  "accounts",
  {
    userId: uuid("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<"oauth" | "oidc" | "email">().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("provider_account_id").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({ columns: [account.provider, account.providerAccountId] }),
  }),
);

export const verificationTokens = pgTable(
  "verification_tokens",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
);

export const companies = pgTable("companies", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  address: text("address").notNull(),
  city: text("city").notNull(),
  postalCode: integer("postal_code"),
});

export const internships = pgTable("internships", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  dateStart: timestamp("date_start", { mode: "date" }).notNull(),
  dateEnd: timestamp("date_end", { mode: "date" }).notNull(),
  status: text("status").$type<"inprogress" | "pending" | "ended">().notNull(),
  contactName: text("contact_name").notNull(),
  contactEmail: text("contact_email").notNull(),
  companyId: serial("company_id")
    .notNull()
    .references(() => companies.id, { onDelete: "cascade" }),
  studentId: uuid("student_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  tutorId: uuid("tutor_id").references(() => users.id, { onDelete: "cascade" }),
});

export const documentTypes = pgEnum("type", ["report", "cdc", "other"]);

export const documents = pgTable("documents", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  content: text("content").notNull(),
  type: documentTypes("type"),
  internshipId: serial("internship_id")
    .notNull()
    .references(() => internships.id, { onDelete: "cascade" }),
});

export const evaluations = pgTable("evaluations", {
  id: serial("id").primaryKey(),
  submission_date: timestamp("date", { mode: "date" }).notNull(),
  factor: text("factor").notNull(),
  content: text("content").notNull(),
  internshipId: serial("internship_id")
    .notNull()
    .references(() => internships.id, { onDelete: "cascade" }),
});

export const tutorReviews = pgTable("tutor_reviews", {
  id: serial("id").primaryKey(),
  internshipId: serial("internship_id")
    .notNull()
    .references(() => internships.id, { onDelete: "cascade" }),
  punctuality: boolean("punctuality").notNull(),
  observation: text("observation").notNull(),
});
