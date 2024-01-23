import { NextResponse, type NextRequest } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import { tutorReviews } from "@db/schema";
import { db } from "@src/db";

const tutorReviewSchema = z.object({
  internshipId: z.string(),
  punctuality: z.boolean(),
  observation: z.string().min(1, { message: "observation is required" }),
});

export async function POST(request: NextRequest) {
  const data = tutorReviewSchema.safeParse(await request.json());
  console.log(data);
  if (!data.success) return NextResponse.json(data.error, { status: 400 });
  // generate uuid
  console.log(data.data);
  const id: string = uuidv4();
  await db
    .insert(tutorReviews)
    .values({
      id: id,
      internshipId: data.data.internshipId,
      observation: data.data.observation,
      punctuality: data.data.punctuality,
    })
    .returning();
  return NextResponse.json({ message: "Données enregistrées avec succès" });
}
