import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { updateInternshipStatus } from "@db/prepared/internships";

const UpdateSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(["Pending", "In progress", "Ended"]),
});

type RequestBody = {
  id: string;
  status: "Pending" | "In progress" | "Ended";
};

export async function POST(request: NextRequest) {
  const requestBody = (await request.json()) as RequestBody;
  const result = UpdateSchema.safeParse(requestBody);
  if (!result.success) return NextResponse.json(result.error, { status: 400 });

  const { id, status } = result.data;
  try {
    await updateInternshipStatus(status, id).execute();
  } catch (error) {
    return NextResponse.json({ message: "Internship status could not be updated" }, { status: 500 });
  }
  return NextResponse.json({ message: "Internship status updated" }, { status: 200 });
}
