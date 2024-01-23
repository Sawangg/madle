import { integer, pgEnum, pgTable, primaryKey, text, timestamp, uuid } from "drizzle-orm/pg-core";

// Auth tables
export const userRoles = pgEnum("role", ["student", "tutor", "admin"]);
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  username: text("username"),
  first_name: text("first_name"),
  last_name: text("last_name"),
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

export const internships = pgTable("internships", {
  id: uuid("id").notNull().primaryKey(),
  title: text("title").notNull(),
  dateStart: timestamp("date_start", { mode: "date" }).notNull(),
  dateEnd: timestamp("date_end", { mode: "date" }).notNull(),
  company: text("company").notNull(),
  status: text("status").$type<"In progress" | "Pending" | "Ended">().notNull(),
  studentId: uuid("student_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  tutorId: uuid("tutor_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});

export const documentTypes = pgEnum("type", ["report", "cdc", "other"]);

export const documents = pgTable("documents", {
  id: uuid("id").notNull().primaryKey(),
  name: text("name").notNull(),
  content: text("content").notNull(),
  type: documentTypes("type"),
  internshipId: uuid("internship_id")
    .notNull()
    .references(() => internships.id, { onDelete: "cascade" }),
});

export const evaluations = pgTable("evaluations", {
  id: uuid("id").notNull().primaryKey(),
  submission_date: timestamp("date", { mode: "date" }).notNull(),
  factor: text("factor").notNull(),
  content: text("content").notNull(),
  internshipId: uuid("internship_id")
    .notNull()
    .references(() => internships.id, { onDelete: "cascade" }),
});
