import { boolean, integer, pgTable, primaryKey, text, timestamp, uuid } from "drizzle-orm/pg-core";

// Auth tables
export const users = pgTable("user", {
  id: uuid("id").notNull().primaryKey(),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("email_verified", { mode: "date" }),
  image: text("image"),
  password: text("password"),
  admin: boolean("admin").default(false).notNull(),
});

export const accounts = pgTable(
  "account",
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
  "verification_token",
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
});

export const documents = pgTable("documents", {
  id: uuid("id").notNull().primaryKey(),
  name: text("name").notNull(),
  url: text("url").notNull(),
  internshipId: uuid("internship_id")
    .notNull()
    .references(() => internships.id, { onDelete: "cascade" }),
});
