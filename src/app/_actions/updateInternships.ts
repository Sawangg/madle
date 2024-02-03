"use server";

import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { internships } from "@db/schema";
import { db } from "@src/db";

const UpdateSchema = z.object({
  id: z.number(),
  status: z.enum(["pending", "inprogress", "ended"]),
});

export const updateInternshipStatus = async (data: { id: number; status: string }) => {
  const result = UpdateSchema.safeParse(data);
  if (!result.success) return { message: result.error };

  const { id, status } = result.data;
  await db
    .update(internships)
    .set({ status })
    .where(eq(internships.id, id))
    .prepare("updateInternshipStatus")
    .execute();
  return redirect("/admin");
};
