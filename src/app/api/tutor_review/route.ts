import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { insertTutorReview } from "@db/prepared/reviewTutor";

const tutorReviewSchema = z.object({
  internshipId: z.string(),
  punctuality: z.boolean(),
  observation: z.string().min(1, { message: "observation is required" }),
});

export async function POST(request: NextRequest) {
  const data = tutorReviewSchema.safeParse(await request.json());
  if (!data.success) return NextResponse.json(data.error, { status: 400 });
  try {
    await insertTutorReview(data.data.internshipId, data.data.observation, data.data.punctuality).execute();
  } catch (error) {
    return NextResponse.json({ message: "Tutor review could not be inserted" }, { status: 500 });
  }
  return NextResponse.json({ message: "Data saved successfully" }, { status: 200 });
}
