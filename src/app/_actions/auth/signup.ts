"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { db } from "@db/index";
import { users } from "@db/schema";

const SignupSchema = z
  .object({
    email: z.string().email({ message: "invalid email" }).min(1, { message: "email is required" }),
    password: z.string().min(1, { message: "password is required" }),
    passwordConfirm: z.string().min(1, { message: "password is required" }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords do not match",
  });

export const signup = async (formData: FormData) => {
  const result = SignupSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!result.success) return { message: result.error };
  // TODO: salt password
  const user = await db.insert(users).values({ email: result.data.email, password: result.data.password }).returning();
  if (!user) return { message: "error" };
  redirect("/student");
};
