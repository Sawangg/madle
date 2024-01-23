"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { users } from "@db/schema";
import { db } from "@src/db";

const SignupSchema = z
  .object({
    email: z.string().email({ message: "invalid email" }).min(1, { message: "email is required" }),
    firstName: z.string().min(1, { message: "first name is required" }),
    lastName: z.string().min(1, { message: "last name is required" }),
    password: z.string().min(1, { message: "password is required" }),
    passwordConfirm: z.string().min(1, { message: "password is required" }),
    userType: z.enum(["student", "tutor", "admin"]),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords do not match",
  });

export const signup = async (formData: FormData) => {
  const result = SignupSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!result.success) {
    console.log("Error parsing form data", result.error);
    return { message: result.error };
  }
  // TODO: salt password
  const username = `${result.data.firstName} .${result.data.lastName[0]}`;
  const user = await db
    .insert(users)
    .values({
      email: result.data.email,
      username: username,
      first_name: result.data.firstName,
      last_name: result.data.lastName,
      password: result.data.password,
      role: result.data.userType,
    })
    .returning();
  if (!user) return { message: "error" };
  if (result.data.userType === "student") return redirect("/student");
  if (result.data.userType === "tutor") return redirect("/tutor");
  if (result.data.userType === "admin") return redirect("/admin");
  return "/";
};
